import React from 'react';
import {View, Text} from 'react-native';
import Logo from '../../assets/img/logo.svg';
import {styles} from '../../style/styles';

const Splash = () => {
  return (
    <View style={[styles.flex1, styles.backgroundLight, styles.centerCenter]}>
      <Logo width={120} height={120} />
      <Text style={[styles.textH2, styles.textPrimary]}>Daur Uang</Text>
    </View>
  );
};

export default Splash;
