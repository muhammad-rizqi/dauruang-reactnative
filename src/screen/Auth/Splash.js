import React from 'react';
import {View, Text, StatusBar, ActivityIndicator} from 'react-native';
import Logo from '../../assets/img/logo.svg';
import {colors, styles} from '../../style/styles';

const Splash = () => {
  return (
    <View style={[styles.flex1, styles.backgroundLight, styles.centerCenter]}>
      <StatusBar backgroundColor={colors.lightBg} barStyle="dark-content" />
      <Logo width={120} height={120} />
      <Text style={[styles.textH2, styles.textPrimary]}>Daur Uang</Text>
      <Text
        style={[
          styles.textH3,
          styles.textPrimary,
          styles.textCenter,
          styles.marginVXL,
        ]}>
        Tukar sampah jadi uang, {'\n'} selamatkan bumi sambil investasi
      </Text>
      <ActivityIndicator color={colors.primary} size="large" />
    </View>
  );
};

export default Splash;
