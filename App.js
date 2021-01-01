import React from 'react';
import {StatusBar} from 'react-native';
import AppRouter from './src/router/AppRouter';
import ChatItem from './src/screen/Chat/ChatItem';
import ChatList from './src/screen/Chat/ChatList';
import DashboardNasabah from './src/screen/Nasabah/DashboardNasabah';
import Jemput from './src/screen/Nasabah/Jemput';
import Settings from './src/screen/User/Settings';
import {colors} from './src/style/styles';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <ChatItem />
    </>
  );
};

export default App;
