import React from 'react';
import {StatusBar} from 'react-native';
import AppRouter from './src/router/AppRouter';
import Settings from './src/screen/User/Settings';
import {colors} from './src/style/styles';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <AppRouter />
    </>
  );
};

export default App;
