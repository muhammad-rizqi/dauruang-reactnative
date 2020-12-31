import React from 'react';
import {StatusBar} from 'react-native';
import AppRouter from './src/router/AppRouter';
import ChatList from './src/screen/Chat/ChatList';
import DashboardNasabah from './src/screen/Nasabah/DashboardNasabah';
import Jemput from './src/screen/Nasabah/Jemput';
import Settings from './src/screen/User/Settings';
import {colors} from './src/style/styles';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <ChatList />
    </>
  );
};

export default App;
