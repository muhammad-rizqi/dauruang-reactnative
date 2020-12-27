import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import ButtonView from '../../components/ButtonView';
import InputView from '../../components/InputView';
import {styles} from '../../style/styles';
import Logo from '../../assets/img/logo.svg';

const Login = (props) => {
  return (
    <ScrollView
      style={[styles.backgroundLight, styles.flex1, styles.container]}>
      <View
        style={[
          styles.flex1,
          styles.row,
          styles.centerCenter,
          styles.marginVM,
        ]}>
        <Logo width={42} height={42} />
        <Text style={[styles.textH1, styles.text, styles.textSecondary]}>
          aur Uang
        </Text>
      </View>
      <View style={[styles.marginVM]}>
        <Text style={[styles.textH2, styles.textPrimary]}>Selamat Datang</Text>
        <Text>Masuk untuk melanjutkan</Text>
      </View>
      <View style={[styles.centerItem]}>
        <InputView placeholder="Masukkan email" />
      </View>
      <View style={[styles.centerItem, styles.marginVM]}>
        <InputView placeholder="Masukan password" secure name="eye-off" />
      </View>
      <ButtonView title="Masuk" dark />
      <View style={[styles.centerItem, styles.marginVM]}>
        <Text>atau</Text>
      </View>
      <ButtonView
        title="Daftar"
        onPress={() => props.navigation.navigate('Register')}
      />
      <View style={[styles.centerItem, styles.marginVM]}>
        <Text
          style={styles.textMedium}
          onPress={() => props.navigation.navigate('ForgotPassword')}>
          Lupa Kata Sandi?
        </Text>
      </View>
    </ScrollView>
  );
};

export default Login;
