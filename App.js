import React from 'react';
import {StatusBar} from 'react-native';
import Intro from './src/screen/Auth/Intro';
import Login from './src/screen/Auth/Login';
import {colors} from './src/style/styles';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <Login />
    </>
  );
};

export default App;
