import React from 'react';
import {StatusBar} from 'react-native';
import ChatItem from './src/screen/Chat/ChatItem';
import DashboardNasabah from './src/screen/Nasabah/DashboardNasabah';
import {colors} from './src/style/styles';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <DashboardNasabah />
    </>
  );
};

export default App;
