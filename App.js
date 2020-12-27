import React from 'react';
import {StatusBar} from 'react-native';
import UpdateProfile from './src/screen/Auth/UpdateProfile';
import {colors} from './src/style/styles';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <UpdateProfile />
    </>
  );
};

export default App;
