import React from 'react';
import {StatusBar} from 'react-native';
import Settings from './src/screen/User/Settings';
import {colors} from './src/style/styles';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <Settings />
    </>
  );
};

export default App;
