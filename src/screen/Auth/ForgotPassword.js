import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import ButtonView from '../../components/ButtonView';
import InputView from '../../components/InputView';
import {colors, styles} from '../../style/styles';
import Logo from '../../assets/img/logo.svg';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ForgotPassword = (props) => {
  return (
    <ScrollView
      style={[styles.backgroundLight, styles.flex1, styles.container]}>
      <StatusBar backgroundColor={colors.lightBg} barStyle="dark-content" />
      <View>
        <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
          <Icon name="chevron-left" size={20} color={colors.primary} />
        </TouchableWithoutFeedback>
      </View>
      <View
        style={[
          styles.flex1,
          styles.row,
          styles.centerCenter,
          styles.marginVS,
        ]}>
        <Logo width={42} height={42} />
        <Text style={[styles.textH1, styles.text, styles.textSecondary]}>
          aur Uang
        </Text>
      </View>
      <View style={[styles.marginVM, styles.centerCenter]}>
        <Text style={[styles.textH3, styles.textPrimary]}>
          Masukkan email akun Anda
        </Text>
      </View>
      <View style={[styles.centerItem, styles.marginVM]}>
        <InputView placeholder="Masukkan email" />
      </View>
      <ButtonView title="Kirim Kode Konfirmasi" dark />
      <View style={[styles.centerItem, styles.marginVM]}>
        <Text
          style={styles.textMedium}
          onPress={() => props.navigation.goBack()}>
          Login
        </Text>
      </View>
    </ScrollView>
  );
};

export default ForgotPassword;
