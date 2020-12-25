import React from 'react';
import {View, Text} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import ButtonView from '../../components/ButtonView';
import {colors, styles} from '../../style/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Login = () => {
  return (
    <View style={[styles.backgroundLight, styles.flex1, styles.container]}>
      <Text style={styles.textH2}>Daur Uang</Text>
      <View
        style={[
          {borderWidth: 1, borderRadius: 5, borderColor: colors.secondary},
          styles.backgroundWhite,
          styles.row,
        ]}>
        <TextInput
          placeholder="Masukan email"
          style={[styles.flex1, styles.marginHM]}
        />
        <View style={[styles.centerCenter, styles.marginHS]}>
          <Icon name="home" size={24} />
        </View>
      </View>
      <ButtonView title="Masuk" dark />
      <View style={[styles.centerItem, styles.marginVM]}>
        <Text>atau</Text>
      </View>
      <ButtonView title="Daftar" />
      <View style={[styles.centerItem, styles.marginVM]}>
        <Text style={styles.textMedium}>Lupa Kata Sandi?</Text>
      </View>
    </View>
  );
};

export default Login;
