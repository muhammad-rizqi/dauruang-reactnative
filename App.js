import React from 'react';
import {StatusBar} from 'react-native';
import Intro from './src/screen/Auth/Intro';
import Login from './src/screen/Auth/Login';
import Register from './src/screen/Auth/Register';
import {colors} from './src/style/styles';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <Register />
    </>
  );
};

export default App;
