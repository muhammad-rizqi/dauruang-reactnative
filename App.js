import React from 'react';
import {Button, StatusBar} from 'react-native';
import AppRouter from './src/router/AppRouter';
import Drawer from './src/screen/User/Drawer';
import {colors} from './src/style/styles';

const App = () => {
  const check = () => {
    fetch('http://192.168.1.46:3000/', {method: 'GET'})
      .then((res) => res.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <AppRouter />
    </>
  );
};

export default App;
