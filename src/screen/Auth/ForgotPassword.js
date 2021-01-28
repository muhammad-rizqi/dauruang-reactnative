import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import ButtonView from '../../components/ButtonView';
import InputView from '../../components/InputView';
import {colors, styles} from '../../style/styles';
import Logo from '../../assets/img/logo.svg';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {reset} from '../../services/endpoint/authServices';

const ForgotPassword = (props) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const onClickReset = () => {
    if (email) {
      setLoading(true);
      reset(email)
        .then((res) =>
          res.code === 200
            ? ToastAndroid.show(
                'Link reset password dikirim ke email',
                ToastAndroid.LONG,
              )
            : ToastAndroid.show('Gagal Reset Password', ToastAndroid.LONG),
        )
        .catch((e) =>
          ToastAndroid.show(JSON.stringify(e.message), ToastAndroid.LONG),
        )
        .finally(() => setLoading(false));
    } else {
      ToastAndroid.show('Isi dengan benar', ToastAndroid.LONG);
    }
  };

  return (
    <ScrollView style={[styles.backgroundLight, styles.flex1]}>
      <StatusBar backgroundColor={colors.lightBg} barStyle="dark-content" />
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
          <Icon name="chevron-left" size={20} color={colors.primary} />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.marginHM}>
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
          <InputView
            placeholder="Masukkan email"
            onChangeText={(e) => setEmail(e)}
          />
        </View>
        <ButtonView
          title="Kirim Kode Konfirmasi"
          dark
          loading={loading}
          onPress={onClickReset}
        />
        <View style={[styles.centerItem, styles.marginVM]}>
          <Text
            style={styles.textMedium}
            onPress={() => props.navigation.goBack()}>
            Login
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ForgotPassword;
