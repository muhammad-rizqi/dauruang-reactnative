import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import Logo from '../../assets/img/logo.svg';
import {colors, styles} from '../../style/styles';

const Splash = () => {
  return (
    <View style={[styles.flex1, styles.backgroundLight, styles.centerCenter]}>
      <StatusBar backgroundColor={colors.primary} />
      <Logo width={120} height={120} />
      <Text style={styles.textH2}>Daur Uang</Text>
    </View>
  );
};

export default Splash;
