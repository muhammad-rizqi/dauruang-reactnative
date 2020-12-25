import React from 'react';
import {View, Text, ScrollView, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonView from '../../components/ButtonView';
import InputView from '../../components/InputView';
import {colors, styles} from '../../style/styles';

const Register = () => {
  return (
    <View style={[styles.backgroundLight, styles.flex1, styles.container]}>
      <View>
        <TouchableWithoutFeedback>
          <Icon name="chevron-left" size={26} color={colors.primary} />
        </TouchableWithoutFeedback>
      </View>
      <ScrollView>
        <View style={[styles.marginVXL]}>
          <Text style={[styles.textH2, styles.textPrimary]}>Buat akun</Text>
          <Text>Jadilah bagian dari kami</Text>
        </View>
        <View style={[styles.centerItem, styles.marginVS]}>
          <InputView placeholder="Nama Lengkap" />
        </View>
        <View style={[styles.centerItem, styles.marginVS]}>
          <InputView placeholder="Email" />
        </View>
        <View style={[styles.centerItem, styles.marginVS]}>
          <InputView placeholder="Nomor Telepon" type="number-pad" />
        </View>
        <View style={[styles.centerItem, styles.marginVS]}>
          <InputView
            placeholder="Kata Sandi"
            type="number-pad"
            name="eye-off"
            secure
          />
        </View>
        <View style={[styles.marginVS]}>
          <ButtonView title="Mendaftar" dark />
        </View>
        <View style={[styles.centerItem, styles.marginVM]}>
          <Text style={[styles.textMedium, styles.textCenter]}>
            {'Sudah memiliki akun? \n Masuk'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;
