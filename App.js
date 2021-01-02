import React from 'react';
import {StatusBar} from 'react-native';
import DashboardSetoran from './src/screen/PengurusSetoran/DashboardSetoran';
import PermintaanJemput from './src/screen/PengurusSetoran/PermintaanJemput';
import {colors} from './src/style/styles';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <PermintaanJemput />
    </>
  );
};

export default App;
