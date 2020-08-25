import React from 'react';
import { View, ToastAndroid, PermissionsAndroid } from 'react-native'
import { RootNavigator } from './src/navigator';
import { requestCameraPermission, requestStoragePermission } from './src/scripts/permissions';

class App extends React.Component {
  componentDidMount() {
    const isCameraAccessible = requestCameraPermission();
    const isStorageAccessible = requestStoragePermission();
  }

  render() {
    return <RootNavigator />;
  }
}

export default App;
