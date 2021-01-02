import React from 'react';
import {StatusBar} from 'react-native';
import Jemput from './src/screen/Nasabah/Jemput';
import DashboardSetoran from './src/screen/PengurusSetoran/DashboardSetoran';
import PermintaanJemput from './src/screen/PengurusSetoran/PermintaanJemput';
import Setoran from './src/screen/PengurusSetoran/Setoran';
import DashboardPenjualan from './src/screen/Penjualan/DashboardPenjualan';
import Jual from './src/screen/Penjualan/Jual';
import {colors} from './src/style/styles';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <Jual />
    </>
  );
};

export default App;
