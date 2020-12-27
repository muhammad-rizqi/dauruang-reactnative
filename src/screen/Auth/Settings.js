import React from 'react';
import {View, Text, ScrollView, TouchableWithoutFeedback} from 'react-native';
import ButtonView from '../../components/ButtonView';
import InputView from '../../components/InputView';
import {colors, styles} from '../../style/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Settings = () => {
  return (
    <ScrollView
      style={[styles.backgroundLight, styles.flex1, styles.container]}>
      <View style={[styles.row, styles.centerCenter]}>
        <TouchableWithoutFeedback>
          <Icon name="chevron-left" size={26} color={colors.primary} />
        </TouchableWithoutFeedback>
        <Text
          style={[
            styles.textH3,
            styles.textPrimary,
            styles.flex1,
            styles.marginHM,
          ]}>
          Pengaturan
        </Text>
      </View>
      <View style={styles.marginVXL}>
        <Text style={[styles.textH3, styles.textPrimary]}>Ubah Kata Sandi</Text>
        <View style={[styles.centerItem, styles.marginVS]}>
          <InputView placeholder="Password Lama" secure />
        </View>
        <View style={[styles.centerItem, styles.marginVS]}>
          <InputView placeholder="Password Baru" secure />
        </View>
        <View style={[styles.centerItem, styles.marginVS]}>
          <InputView placeholder="Konfirmasi Password" secure />
        </View>
        <ButtonView title="Reset Password" dark />
        <View style={[styles.centerItem, styles.marginVS]} />
      </View>
      <View>
        <Text style={[styles.textH3, styles.textPrimary, styles.marginVM]}>
          Hapus Akun
        </Text>
        <ButtonView title="Hapus Akun" />
      </View>
    </ScrollView>
  );
};

export default Settings;
