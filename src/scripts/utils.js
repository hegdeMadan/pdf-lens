/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import moment from 'moment';
import { I18n, customerConfig } from '../../config';
import { textType, apiErrorCodes } from '../constants';
import { Colors } from '../../styles';

export const getTimeRemaining = (endtime) => {
  const endDate = new Date(endtime);
  var remainingTotalTime = Date.parse(endDate) - Date.parse(new Date());
  var seconds = Math.floor((remainingTotalTime / 1000) % 60);
  var minutes = Math.floor((remainingTotalTime / 1000 / 60) % 60);
  var hours = Math.floor((remainingTotalTime / (1000 * 60 * 60)) % 24);
  var days = Math.floor(remainingTotalTime / (1000 * 60 * 60 * 24));
  return {
    remainingTotalTime,
    days,
    hours,
    minutes,
    seconds,
  };
}

export const getQueryParamsValue = (paramKey, url) => {
  if (!url || !paramKey) {
    return null;
  }

  const reg = new RegExp('[?&]' + paramKey + '=([^&#]*)', 'i');
  const queryString = reg.exec(url);
  return queryString ? queryString[1] : null;
};

export function getYoutubeVideoId(url) {
  const urlParts = url.split('?');
  let queryParams = '';
  let videoId = '';

  if (urlParts.length > 1) {
    queryParams = urlParts[1]; // eslint-disable-line prefer-destructuring
  }

  if (queryParams.trim().length > 0) {
    const queryParamList = queryParams.split('&');
    for (let i = 0; i < queryParamList.length; i += 1) {
      const keyVal = queryParamList[i].split('=');
      if (keyVal.length === 2) {
        if (keyVal[0].trim().toLowerCase() === 'v') {
          videoId = keyVal[1].trim();
        }
      }
    }
  }

  if (videoId.trim().length > 0) {
    return videoId;
  }

  videoId = urlParts[0]
    .split('/')
    .pop()
    .trim();
  return videoId;
}

export const getErrorMessageFromApi = response => {
  let errorCode;
  let errorMessage;

  try {
    if (typeof response !== 'object') {
      errorCode = apiErrorCodes.UNKNOWN_ERROR;
      errorMessage = 'Something Went Wrong!';
      return {
        errorCode,
        errorMessage,
      };
    }
    errorCode = response.status;
    errorMessage = null;
    if (errorCode === apiErrorCodes.UNAUTHORIZED) {
      return {
        errorCode,
        errorMessage: 'Your login session is expired. Please logout and relogin',
      };
    }
    if (response && response.data && 'message' in response.data)
      errorMessage = response.data.message;
    else if (response && response.data && 'msg' in response.data) errorMessage = response.data.msg;
    else errorMessage = 'Something Went Wrong!';
    const error = { errorCode, errorMessage };
    return error;
  } catch (error) {
    return { errorCode: apiErrorCodes.UNKNOWN_ERROR, errorMessage: 'Something Went Wrong!' };
  }
};

export function parseStringToFloat(text, size = 2) {
  if (typeof text === 'undefined' || text === null) {
    return null;
  }
  return parseFloat(parseFloat(text).toFixed(size));
}

export const getLocalisedCurrency = () => I18n.t(`CURRENCY.${customerConfig.CURRENCY}`);

export const byteToMbConverter = bytes => bytes / 1024 / 1000;

export const StripHTML = string => string.replace(/(&nbsp;|<([^>]+)>)/gi, '');

export const StripQuestions = string => {
  if (!string || typeof string !== 'string') {
    return '';
  }
  const removedStyleTag = string.replace(/((<style([\s\S]+?)<\/style>))/gi, ' ');
  const removedBreakTag = removedStyleTag.replace(/(<br>)/gi, ' ');
  const removedSpaceTag = removedBreakTag.replace(/(&nbsp;)/gi, ' ');
  const removedallTag = removedSpaceTag.replace(/(<([^>]+)>)/gi, '');
  let maxTextCountSubString = removedallTag.substring(0, 100);
  if (removedallTag.length > 100) {
    maxTextCountSubString += '...';
  }
  return maxTextCountSubString;
};

export const convertSecondsToDisplayFormat = seconds => {
  const secondsInNumberFormat = Number(seconds);
  if (Number.isNaN(secondsInNumberFormat)) {
    return '00:00';
  }
  const hour = Math.floor(secondsInNumberFormat / 3600);
  const minute = Math.floor((secondsInNumberFormat % 3600) / 60);
  const sec = Math.floor((secondsInNumberFormat % 3600) % 60);

  const minuteDisplay = minute > 9 ? `${minute}:` : `0${minute}:`;
  const hourDisplay = hour > 9 ? `${hour}:` : `0${hour}:`;
  const secDisplay = sec > 9 ? `${sec}` : `0${sec}`;
  return hourDisplay + minuteDisplay + secDisplay;
};

export function getStringType(string) {
  let type = textType.JUST_TEXTS;
  if (string.match(/\\\[.*?\\\]|\\\(.*?\\\)/i, '')) {
    type = textType.MATHJAX;
  } else if (string.match(/<table|href|<img|<iframe|<p|\/>|<div|<body/g)) {
    if (string.match(/style/g)) {
      type = textType.HTML_INTENSIVE;
    } else {
      type = textType.EASY_HTML;
    }
  }
  return type;
}

export function stripMath(string) {
  return string.replace(/\\\[.*?\\\]|\\\(.*?\\\)/i, '');
}

export function capitaliseText(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getUserFirstName(fullName) {
  const getSubNames = fullName.match(/(^[^\s]+)/);
  if (getSubNames) {
    return capitaliseText(getSubNames[0]);
  }
  return fullName;
}

export function getProfileImage(fileName, uid) {
  if (fileName && fileName.indexOf('/') === -1 && uid) {
    return `https://s3-ap-southeast-1.amazonaws.com/learnyst/schools/${
      customerConfig.SCHOOL_ID
      }/teachers/photoes/${uid}/${fileName}`;
  }
  if (fileName) {
    return fileName;
  }
  return null;
}

export function getFileNameFromUrl(url) {
  if (url) {
    const urlWithOutQueryParams = url.split('?')[0];
    const name = urlWithOutQueryParams.substring(urlWithOutQueryParams.lastIndexOf('/') + 1);
    return unescape(name);
  }

  return null;
}

export function getDisplayTimeInMinSec(timeInSec) {
  const milliSec = timeInSec * 1000;
  const hr = moment.duration(milliSec).hours();
  const min = moment.duration(milliSec).minutes();
  const sec = moment.duration(milliSec).seconds();
  const milSec = Math.round(moment.duration(milliSec).milliseconds() / 100);
  let displayTime = '';
  if (hr) {
    displayTime += `${hr}h `;
  }
  if (min) {
    displayTime += `${min}m `;
  }
  if (sec) {
    displayTime += `${sec}s `;
  }
  if (milSec) {
    displayTime += `${milSec}ms `;
  }
  if (!displayTime) {
    return '0s';
  }
  return displayTime;
}

export function convertTimeInSec(sec) {
  const timeInSec = parseStringToFloat(sec);
  const displayTime = getDisplayTimeInMinSec(sec);
  return {
    toMin: parseFloat(parseFloat(timeInSec / 60).toFixed(2)),
    toHour: parseFloat(parseFloat(timeInSec / 3600)),
    displayTime,
  };
}

export function encodeServerData(str) {
  return unescape(encodeURIComponent(str));
}

export function decodeServerData(str) {
  if (!str) {
    return null;
  }
  try {
    return decodeURIComponent(escape(str));
  } catch (e) {
    try {
      return decodeURIComponent(str);
    } catch (error) {
      global.LstLogger.warn('main.js', 'decodeServerData()', `Error:${error} Str: ${str}`);
      return str;
    }
  }
}

export function genericApiFailureMessage(err) {
  return I18n.t('errorMsg.unknown_error');
}

export const constructWebview = (html, css, script) => `
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    ${script}
    ${css}
  </head>
  <body>
    <div id='webDoc'>${html}</div>
  </body>
`;

export const getWebviewStyle = `
  <style>
  * {
    font-family: System;
  }
  ::-webkit-scrollbar {
    display: none !important;
  }
  p {
    font-size: 14px;
    line-height: 1.7;
    padding-top: 4;
    font-weight: 430;
    user-select: none;
  }
  body, html {
    background-color: '#fff !important';
    margin: 0 !important;
    padding: 0 !important;
    color: rgba(0, 0, 0, 0.84);
    user-select: none;
  }
  </style>
`;

export const convertHexToRGBA = (hexWithHash = '#ffffff', opacity) => {
  if (!hexWithHash) {
    hexWithHash = Colors.primaryColor;
  }
  const hex = hexWithHash.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const result = `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
  return result;
};

export const convertSecToTime = timeInSec => {
  const hours = Math.floor(timeInSec / 3600);
  const minutes = Math.floor((timeInSec - hours * 3600) / 60);
  const seconds = timeInSec - hours * 3600 - minutes * 60;
  return { hours, minutes, seconds };
};

export const getDateTimeFromTimestamp = timestamp => ({
  date: moment(timestamp).format('Do MMM YY'),
  time: moment(timestamp).format('h:mm a'),
});

export const getAppDisplayVersion = () =>
  `${customerConfig.APP_VERSION || 3}.${customerConfig.NATIVE_VERSION}.${
  customerConfig.SCHOOL_ID
  }-${global.codePushData ? global.codePushData.label : ''}-${customerConfig.TIME_STAMP || '0'}`;

export const getCodePushDetails = () => global.codePushData;

export const getSlideNumber = (link = '', slideData = {}) => {
  let defaultLink = link;
  let linkWithoutExtention = null;
  // lmpd umpd cencmpd m3u8
  if (defaultLink.endsWith('webTrack.mpd')) {
    defaultLink = defaultLink
      .split('/webTrack.mpd')
      .slice(0, -1)
      .join('');
  } else if (defaultLink.endsWith('/stream.mpd')) {
    defaultLink = defaultLink
      .split('/stream.mpd')
      .slice(0, -1)
      .join('');
  } else if (defaultLink.endsWith('/stream.m3u8')) {
    defaultLink = defaultLink
      .split('/stream.m3u8')
      .slice(0, -1)
      .join('');
  }

  const defaultLinkSplitArray = defaultLink.split('.');

  if (defaultLinkSplitArray.length > 1) {
    linkWithoutExtention = defaultLinkSplitArray.slice(0, -1).join('.');
  } else {
    // array destruction array[0] is taken
    [linkWithoutExtention] = defaultLinkSplitArray;
  }
  const fileNameIndex = linkWithoutExtention.lastIndexOf('/') + 1;
  const fileNameWithEncryptionExtension = linkWithoutExtention.substr(fileNameIndex);
  // const fileNameWithEncryptionExtension = linkWithoutExtention.replace(/^.*[/]/, '');
  let filename = fileNameWithEncryptionExtension.replace(/(_uenc|_lenc|_cenc|_dcf|_cencm4f)$/, '');

  if (defaultLink.includes('youtube.com') || defaultLink.includes('youtu.be')) {
    filename = getYoutubeVideoId(defaultLink);
  }

  const slideDataKeys = Object.keys(slideData);
  for (let i = 0; i < slideDataKeys.length; i += 1) {
    const slide = slideData[slideDataKeys[i]];
    const slideFileName = slide.fileName || '';
    let slideFileNameWithoutExtention = '';

    const slideFileNameSplitArray = slideFileName.split('.');
    if (slideFileNameSplitArray.length > 1) {
      slideFileNameWithoutExtention = slideFileNameSplitArray.slice(0, -1).join('.');
    } else {
      // array destruction array[0] is taken
      [slideFileNameWithoutExtention] = slideFileNameSplitArray;
    }

    if (slideFileName.includes('youtube.com') || slideFileName.includes('youtu.be')) {
      slideFileNameWithoutExtention = getYoutubeVideoId(slideFileName);
    }

    if (slideFileNameWithoutExtention.trim() === filename.trim()) {
      return i;
    }
  }

  return -1;
};

export const openQuizPlayer = (testId, callBackFunctionWhenClosed, currentCourseId) => {
  if (!testId) {
    return;
  }
  const url = `/learn/home/quiz/${testId}?mode=0`;
  const windowConfig = `channelmode=1,toolbar=no,scrollbars=no,resizable=no,top=0,left=0,fullscreen=yes,location=no,menubar=no,status=0,width=${
    window.screen.availWidth
    },height=${window.screen.availWidth}`;
  // const windowConfig = `channelmode=1,toolbar=no,scrollbars=no,top=0,left=0,location=no,menubar=no,status=0,width=${window.screen.availWidth},height=${window.screen.availWidth}`;
  const openedWindow = window.open(url, '_blank', windowConfig, false);
  const extraWidth = openedWindow.screen.availWidth - openedWindow.outerWidth;
  const extraHeight = openedWindow.screen.availHeight - openedWindow.outerHeight;
  openedWindow.resizeBy(extraWidth, extraHeight);
  if (callBackFunctionWhenClosed) {
    const timer = setInterval(() => {
      if (openedWindow && openedWindow.closed) {
        clearInterval(timer);
        callBackFunctionWhenClosed(currentCourseId);
      }
    }, 500);
  }
};

// school config renaming keys
export const setSchoolData = response => {
  const tempData = {
    ...response,
    // used in mobile
    TAGLINE: '',
    PAYMENT_TYPE: 1,
    WEB_URL: 'https://reactapp.learnyst.com',
    DEEPLINK_DOMAIN: 'reactapp.learnyst.com',
    IS_BACKGROUNG_LIGHT: true,
    primaryColor: '#0076FF',
    onPrimaryColor: '#ffffff',
    secondaryColor: '#0076FF',
    onSecondaryColor: '#3287ff',
    paletteOne: '#2f7991',
    paletteTwo: '#235c78',
    paletteThree: '#183f5f',
    paletteFour: '#0c2246',
  };

  // key name changes
  const keysMap = {
    school_id: 'SCHOOL_ID',
    school_name: 'NAME',
    school_logo: 'SCHOOL_LOGO',
    currency: 'CURRENCY',
    gplus_web_client_id: 'GPLUS_WEB_CLIENT_ID',
    fb_app_id: 'FB_APP_ID',
    support_email: 'SUPPORT_EMAIL',
    terms_condition: 'TERMS_CONDITION',
    privacy_policy: 'PRIVACY_POLICY',
    support_mobile: 'SUPPORT_MOBILE',
  };

  Object.keys(keysMap).map(key => {
    tempData[keysMap[key]] = tempData[key];
    delete tempData[key];
  });

  return tempData;
};

export const setSchoolConfigDataOnSuccess = response => {
  const { school_config, i18n_config, theme_config, school_feature } = response;

  const tempData = {
    schoolData: school_config,
    i18nConfig: i18n_config,
    themeConfig: theme_config,
    schoolFeatures: school_feature,
  };
  return tempData;
};

export const setThemeConfig = themeConfig => {
  const themeKeys = [
    'fontSizes',
    'lineHeights',
    'letterSpacings',
    'sizes',
    'borderWidths',
    'radii',
  ];
  if (themeKeys) {
    themeKeys.map(key => {
      const themeData = themeConfig[key];
      if (themeData && themeData.all) {
        const temp = [...themeData.all];
        delete themeData.all;
        Object.keys(themeData).map(function (dataKey, index) {
          temp[dataKey] = themeData[dataKey];
        });
        themeConfig[key] = temp;
      }
    });
  }

  return themeConfig;
};
