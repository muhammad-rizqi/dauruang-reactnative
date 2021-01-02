import React from 'react';
import {StatusBar} from 'react-native';
import DashboardSetoran from './src/screen/PengurusSetoran/DashboardSetoran';
import PermintaanJemput from './src/screen/PengurusSetoran/PermintaanJemput';
import Setoran from './src/screen/PengurusSetoran/Setoran';
import {colors} from './src/style/styles';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <Setoran />
    </>
  );
};

export default App;
