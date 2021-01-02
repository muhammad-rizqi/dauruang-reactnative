import React from 'react';
import {StatusBar} from 'react-native';
import DashboardSetoran from './src/screen/PengurusSetoran/DashboardSetoran';
import {colors} from './src/style/styles';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <DashboardSetoran />
    </>
  );
};

export default App;
