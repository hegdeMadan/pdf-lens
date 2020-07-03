import {
    check,
    request,
    PERMISSIONS,
    RESULTS,
    openSettings,
    checkNotifications,
  } from 'react-native-permissions';
  import { Alert } from 'react-native';
  import {
    OS,
    deviceType,
    cameraAccessType,
  } from '../constants';
  import { I18n, customerConfig } from '../../config';
  
  export async function getStorageReadPermission() {
    if (OS === deviceType.DEVICE_IOS) {
      return true;
    }
  
    let permissionResult;
    try {
      permissionResult = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      console.log(`getStorageReadPermission, permissionResult = ${permissionResult}`);
    } catch (error) {
      console.log('getStorageReadWritePermission, exception when checking permissions', error);
      permissionResult = RESULTS.DENIED;
    }
  
    if (permissionResult === RESULTS.BLOCKED) {
      Alert.alert(I18n.t('storage_access_error_title', { appname: customerConfig.NAME }),
        I18n.t('grant_storage_access_msg', { appname: customerConfig.NAME }),
        [{
            text: I18n.t('grant_permission_open_settings', { appname: customerConfig.NAME }),
            onPress: () => {
              openSettings().catch(() => console.log('cannot open settings'));
            },
          },
          { text: I18n.t('grant_permission_cancel', { appname: customerConfig.NAME }) },
        ]);
      throw new Error('Storage permissions not granted!');
    }
  
    try {
      permissionResult = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    } catch (error) {
      permissionResult = RESULTS.DENIED;
    }
  
    console.log(`getStorageReadWritePermission, permissionResult = ${permissionResult}`);
    if (permissionResult === RESULTS.GRANTED) {
      return true;
    }
  
    throw new Error('Storage permissions not granted!');
  }
  
  export async function getStorageWritePermission() {
    if (OS === deviceType.DEVICE_IOS) {
      return true;
    }
  
    let permissionResult;
    try {
      permissionResult = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      console.log(`getStorageReadPermission, permissionResult = ${permissionResult}`);
    } catch (error) {
      console.log('getStorageReadWritePermission, exception when checking permissions', error);
      permissionResult = RESULTS.DENIED;
    }
  
    if (permissionResult === RESULTS.BLOCKED) {
      Alert.alert(I18n.t('storage_access_error_title', { appname: customerConfig.NAME }),
        I18n.t('grant_storage_access_msg', { appname: customerConfig.NAME }),
        [{
            text: I18n.t('grant_permission_open_settings', { appname: customerConfig.NAME }),
            onPress: () => {
              openSettings().catch(() => console.log('cannot open settings'));
            },
          },
          { text: I18n.t('grant_permission_cancel', { appname: customerConfig.NAME }) },
        ]);
      throw new Error('Storage permissions not granted!');
    }
  
    try {
      permissionResult = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    } catch (error) {
      permissionResult = RESULTS.DENIED;
    }
  
    console.log(`getStorageReadWritePermission, permissionResult = ${permissionResult}`);
    if (permissionResult === RESULTS.GRANTED) {
      return true;
    }
  
    throw new Error('Storage permissions not granted!');
  }
  
  export async function getCameraPermission(accessType) {
    let requiredPermission;
    if (OS === deviceType.DEVICE_ANDROID) {
      requiredPermission = PERMISSIONS.ANDROID.CAMERA;
    } else {
      requiredPermission = PERMISSIONS.IOS.CAMERA;
    }
  
    let permissionResult;
    try {
      permissionResult = await check(requiredPermission);
      console.log(`getCameraPermission, permissionResult = ${permissionResult}`);
    } catch (error) {
      console.log('getCameraPermission, exception when checking permissions', error);
      permissionResult = RESULTS.DENIED;
    }
  
    if (permissionResult === RESULTS.BLOCKED) {
      if(accessType === cameraAccessType.ATTACHMENTS_UPLOAD){
        Alert.alert(I18n.t('camera_access_error_title', { appname: customerConfig.NAME }),
        I18n.t('grant_camera_access_msg', { appname: customerConfig.NAME }),
        [{
            text: I18n.t('grant_permission_open_settings', { appname: customerConfig.NAME }),
            onPress: () => {
              openSettings().catch(() => console.log('cannot open settings'));
            },
          },
          { text: I18n.t('grant_permission_cancel', { appname: customerConfig.NAME }) },
        ]);
      } else {
        Alert.alert(I18n.t('camera_access_error_title', { appname: customerConfig.NAME }),
        I18n.t('grant_camera_access_msg_for_qr', { appname: customerConfig.NAME }),
        [{
            text: I18n.t('grant_permission_open_settings', { appname: customerConfig.NAME }),
            onPress: () => {
              openSettings().catch(() => console.log('cannot open settings'));
            },
          },
          { text: I18n.t('grant_permission_cancel', { appname: customerConfig.NAME }) },
        ]);
      }
      throw new Error('Camera permissions not granted!');
    }
  
    try {
      permissionResult = await request(requiredPermission);
    } catch (error) {
      permissionResult = RESULTS.DENIED;
    }
  
    console.log(`getCameraPermission, permissionResult = ${permissionResult}`);
    if (permissionResult === RESULTS.GRANTED) {
      return true;
    }
  
    throw new Error('Camera permissions not granted!');
  }
  
  export async function getPhotoPermission() {
    let requiredPermission;
    if (OS === deviceType.DEVICE_ANDROID) {
      requiredPermission = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
    } else {
      requiredPermission = PERMISSIONS.IOS.PHOTO_LIBRARY;
    }
  
    let permissionResult;
    try {
      permissionResult = await check(requiredPermission);
      console.log(`getPhotoPermission, permissionResult = ${permissionResult}`);
    } catch (error) {
      console.log('getPhotoPermission, exception when checking permissions', error);
      permissionResult = RESULTS.DENIED;
    }
  
    if (permissionResult === RESULTS.BLOCKED) {
      if (OS === deviceType.DEVICE_ANDROID) {
        Alert.alert(I18n.t('photo_storage_access_error_title', { appname: customerConfig.NAME }),
          I18n.t('grant_photo_storage_access_msg', { appname: customerConfig.NAME }),
          [{
              text: I18n.t('grant_permission_open_settings', { appname: customerConfig.NAME }),
              onPress: () => {
                openSettings().catch(() => console.log('cannot open settings'));
              },
            },
            { text: I18n.t('grant_permission_cancel', { appname: customerConfig.NAME }) },
          ]);
      } else {
        Alert.alert(I18n.t('photo_access_error_title', { appname: customerConfig.NAME }),
          I18n.t('grant_photo_access_msg', { appname: customerConfig.NAME }),
          [{
              text: I18n.t('grant_permission_open_settings', { appname: customerConfig.NAME }),
              onPress: () => {
                openSettings().catch(() => console.log('cannot open settings'));
              },
            },
            { text: I18n.t('grant_permission_cancel', { appname: customerConfig.NAME }) },
          ]);
      }
      throw new Error('Photo permissions not granted!');
    }
  
    try {
      permissionResult = await request(requiredPermission);
    } catch (error) {
      permissionResult = RESULTS.DENIED;
    }
  
    console.log(`getPhotoPermission, permissionResult = ${permissionResult}`);
    if (permissionResult === RESULTS.GRANTED) {
      return true;
    }
  
    throw new Error('Photo permissions not granted!');
  }
  
  export async function hasNotificationPermission() {
    checkNotifications().then(({ status, settings }) => {
      if (status === RESULTS.GRANTED) {
        return true;
      }
  
      return false;
    }).catch((err) => {
      console.log('CheckNotificationsSuccess Failed ', err);
      return false;
    });
  }
  