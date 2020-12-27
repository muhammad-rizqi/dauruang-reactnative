import React from 'react';
import {StatusBar} from 'react-native';
import ForgotPassword from './src/screen/Auth/ForgotPassword';
import {colors} from './src/style/styles';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <ForgotPassword />
    </>
  );
};

export default App;
