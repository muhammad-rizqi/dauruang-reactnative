import React from 'react';
import {View, Text} from 'react-native';
import ScanScreen from './src/QRscan';
import Maps from './src/Maps';
const App = () => {
  return (
    <View>
      <ScanScreen />
    </View>
  );
};

export default App;
