import axios, { CancelToken } from 'axios';
import { urls, apiErrorCodes, OS, deviceType } from '../constants';
import { getErrorMessageFromApi } from './utils';
import { I18n } from '../../config';

const HTTP_REQUEST_TIMEOUT = 20000;
const axiosInstance = axios.create({ baseURL: urls.API_BASE_URL, timeout: HTTP_REQUEST_TIMEOUT });

/* Throttle HTTP requests to avoid infinite calls in bundlers */
let currentMin = 0;
let apiRequestsInCurrentMin = 0;
let otherRequestsInCurrentMin = 0;
const MAX_API_REQUESTS_PER_MIN = 100;
const MAX_OTHER_REQUESTS_PER_MIN = 1000; // Specifically for autosave

// eslint-disable-next-line import/prefer-default-export
export function executeHttpRequest(
  url,
  method,
  queryParams,
  data,
  responseType,
  authToken,
  additionalHeaders,
  timeout,
  store,
  lastFetchId
) {
  return new Promise((resolve, reject) => {
    /* Throttle HTTP requests to protect from infinite loops in bundle */
    const epochMinute = Math.round(new Date().getTime() / 1000 / 60);
    if (epochMinute === currentMin) {
      if (url.indexOf(urls.API_BASE_URL) >= 0) {
        apiRequestsInCurrentMin++;
      } else {
        otherRequestsInCurrentMin++;
      }
    } else {
      currentMin = epochMinute;
      apiRequestsInCurrentMin = 0;
      otherRequestsInCurrentMin = 0;
    }

    if (
      apiRequestsInCurrentMin >= MAX_API_REQUESTS_PER_MIN ||
      otherRequestsInCurrentMin >= MAX_OTHER_REQUESTS_PER_MIN
    ) {
      console.log(
        'Too many HTTP requests per min . Dropping HTTP request !!!!!!!!!',
        apiRequestsInCurrentMin,
        ':',
        otherRequestsInCurrentMin
      );
      const errorObj = {
        errorCode: apiErrorCodes.THROTTLED,
        errorMessage: I18n.t('too_many_http_requests'),
      };
      const responseError = { error: errorObj };
      reject(responseError);
      return;
    }

    const cancelSource = CancelToken.source();

    const modifiedQueryParams = queryParams || {};
    if (typeof modifiedQueryParams === 'object') {
      modifiedQueryParams.device_type = OS;
    }

    let modifiedData = data || {};
    if (typeof modifiedData === 'object') {
      modifiedData.device_type = OS;
    }

    if (method === 'head' || method === 'get') {
      modifiedData = undefined;
    }

    const timer = setTimeout(
      () => {
        cancelSource.cancel('Cancelled on timeout by executeHttpRequest');
      },
      timeout ? timeout + 2000 : HTTP_REQUEST_TIMEOUT + 2000
    );

    console.log('Http request -> ', method, ':', url);

    const cacheControlHeader = url.includes(urls.API_BASE_URL) ? { 'Cache-Control': 'no-store' } : {};
    let extraHeaders = additionalHeaders || {};
    extraHeaders = {
      ...extraHeaders,
      ...cacheControlHeader,
    }
    axiosInstance({
      method,
      url,
      params: modifiedQueryParams,
      data: modifiedData,
      responseType: responseType || 'json',
      headers: authToken
        ? {
          Authorization: `Bearer ${authToken}`,
          ...extraHeaders,
        }
        : { ...extraHeaders },
      cancelToken: cancelSource.token,
      timeout: timeout || HTTP_REQUEST_TIMEOUT,
    })
      .then(response => {
        clearTimeout(timer);
        console.log('Http response -> ', response);
        if (
          method === 'get' &&
          ((url.indexOf(urls.API_BASE_URL) >= 0 && !response.data) ||
            (url.indexOf('learner/v7/orders') >= 0 && (!response.data || !response.data.course)) ||
            (url.indexOf('/learner/v8/comparison_stat') >= 0 &&
              (!response.data || !response.data.section_topper)))
        ) {
          const errorObj = {
            errorCode: apiErrorCodes.UNKNOWN_ERROR,
            errorMessage: I18n.t('errorHead.error_404'),
          };
          const responseError = { error: errorObj, lastFetchId };
          global.bugsnag.notify(
            new Error(`
        Got Null Response in
        url::${url}
        params:: ${queryParams ? JSON.stringify(queryParams) : null}
        response:: ${JSON.stringify(response)}
        `)
          );
          reject(responseError);
        } else {
          resolve({ response: response.data, lastFetchId });
        }
      })
      .catch(error => {
        clearTimeout(timer);
        console.log('Http error -> ', error);
        console.log('Http error.response -> ', error.response);
        // not correct way. Need to analyse
        if (
          error.response &&
          error.response.status === apiErrorCodes.UNAUTHORIZED &&
          OS === deviceType.DEVICE_WEB && store
        ) {
          store.doSetAutTokenExpired();
        }

        if (axios.isCancel(error)) {
          const errorObj = {
            errorCode: apiErrorCodes.API_TIMEOUT,
            errorMessage: I18n.t('Network_error'),
          };
          const responseError = { error: errorObj, lastFetchId };
          reject(responseError);
        } else if (error.response) {
          const errorObj = getErrorMessageFromApi(error.response);
          const responseError = { error: errorObj, lastFetchId };
          reject(responseError);
        } else if (error.request) {
          const errorObj = {
            errorCode: apiErrorCodes.API_TIMEOUT,
            errorMessage: I18n.t('Network_error'),
          };
          const responseError = { error: errorObj, lastFetchId };
          reject(responseError);
        } else {
          const errorObj = {
            errorCode: apiErrorCodes.UNKNOWN_ERROR,
            errorMessage: I18n.t('errorHead.error_404'),
          };
          const responseError = { error: errorObj, lastFetchId };
          reject(responseError);
        }
      });
  });
}
