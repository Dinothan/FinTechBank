import React, {useState} from 'react';
import {Linking, Platform} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const onSuccess = e => {
  Linking.openURL(e.data).catch(err => console.error('An error occured', err));
};

const qrScan = () => {
  let checkAndroidPermission = true;
  if (Platform.OS === 'android' && Platform.Version < 23) {
    checkAndroidPermission = false;
  }
  return (
    <QRCodeScanner
      onRead={onSuccess}
      flashMode={RNCamera.Constants.FlashMode.torch}
      checkAndroid6Permissions={checkAndroidPermission}
    />
  );
};
export default qrScan;
