import {PermissionsAndroid, Alert, Platform} from 'react-native';
import AndroidOpenSettings from 'react-native-android-open-settings';

import Permissions, {
  check,
  PERMISSIONS,
  RESULTS,
  request,
} from 'react-native-permissions';
import {strings} from '../i18n';

export async function checkLocationPermission() {
  try {
    const permission =
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    let result = await check(permission);
    return result === RESULTS.GRANTED;
  } catch (err) {
    return false;
  }
}

export async function requestLocationPermission() {
  const promise = new Promise((resolve, reject) => {
    const permission =
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

    check(permission)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            // Alert.alert(
            //   strings('alert.title'),
            //   strings('alert.cameraPermissionUnavailable')
            // );
            resolve(result);
            break;
          case RESULTS.DENIED:
            request(permission).then(requestPermissionResult => {
              switch (requestPermissionResult) {
                case RESULTS.GRANTED:
                  resolve(requestPermissionResult);
                  break;
                default:
                  resolve(requestPermissionResult);
                  break;
              }
            });
            break;
          case RESULTS.GRANTED:
            resolve(result);
            break;
          case RESULTS.BLOCKED:
            resolve(result);
            break;
        }
      })
      .catch(error => {
        resolve(error);
      });
  });
  return promise;
}

export async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    let beforeGranted = '';
    if (granted === 'never_ask_again' && beforeGranted !== 'denied') {
      Alert.alert(
        'Utop',
        'Vui lòng cho phép quyền truy cập Camera',
        [
          {
            text: 'Đồng ý',
            onPress: () => {
              AndroidOpenSettings.appDetailsSettings();
            },
            style: 'cancel',
          },
          {
            text: 'Huỷ',
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      ReactUtils.customeNavigate('BarcodeScan', null, null);
    }
    beforeGranted = granted;
  } catch (err) {
    return false;
  }
}

export const requestCameraPermissionWithCallback = onGranted => {
  const permission =
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.CAMERA
      : PERMISSIONS.IOS.CAMERA;

  check(permission)
    .then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          Alert.alert(
            strings('common.lableUtop'),
            strings('UserProfile.cameraUnavailableText'),
          );
          break;
        case RESULTS.DENIED:
          request(permission).then(requestPermissionResult => {
            switch (requestPermissionResult) {
              case RESULTS.GRANTED:
                onGranted(requestPermissionResult);
                break;
            }
          });
          break;
        case RESULTS.GRANTED:
          onGranted();
          break;
        case RESULTS.BLOCKED:
          Alert.alert(
            strings('UserProfile.needPermissionToTakeImageAlertTitle'),
            strings('UserProfile.needPermissionToTakeImageAlertText'),
            [
              {text: strings('common.cancel')},
              {
                text: strings('common.grant'),
                onPress: () => {
                  if (Platform.OS === 'ios') {
                    Permissions.openSettings();
                  } else {
                    AndroidOpenSettings.appDetailsSettings();
                  }
                },
              },
            ],
            {cancelable: true},
          );
          break;
      }
    })
    .catch(error => {
      Alert.alert(
        strings('common.lableUtop'),
        strings('UserProfile.cameraUnavailableText'),
      );
    });
};

export const requestPickImageFromGallery = onGranted => {
  const permission =
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
      : PERMISSIONS.IOS.PHOTO_LIBRARY;

  check(permission)
    .then(result => {
      switch (result) {
        case RESULTS.DENIED:
          request(permission).then(requestPermissionResult => {
            switch (requestPermissionResult) {
              case RESULTS.GRANTED:
                onGranted(requestPermissionResult);
                break;
            }
          });
          break;
        case RESULTS.GRANTED:
          onGranted();
          break;
        case RESULTS.BLOCKED:
          Alert.alert(
            strings('UserProfile.needPermissionToPickImageAlertTitle'),
            strings('UserProfile.needPermissionToPickImageAlertText'),
            [
              {text: strings('common.cancel')},
              {
                text: strings('common.grant'),
                onPress: () => {
                  if (Platform.OS === 'ios') {
                    Permissions.openSettings();
                  } else {
                    AndroidOpenSettings.appDetailsSettings();
                  }
                },
              },
            ],
            {cancelable: true},
          );
          break;
      }
    })
    .catch(error => {
      Alert.alert(
        strings('common.lableUtop'),
        strings('UserProfile.pickImageUnavailableText'),
      );
    });
};
