import React, {useState} from 'react';
import {View, Text, ScrollView, ToastAndroid} from 'react-native';
import ButtonView from '../../components/ButtonView';
import InputView from '../../components/InputView';
import {styles} from '../../style/styles';
import Logo from '../../assets/img/logo.svg';
import {login} from '../../services/endpoint/authServices';
import {useDispatch} from 'react-redux';
import {changeToken, setUser} from '../../redux/action';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [pasword, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onClickLogin = () => {
    setLoading(true);
    login(email, pasword)
      .then((res) => {
        if (res.code === 200) {
          const {role} = res.data.user;
          if (role === 1 || role === 2 || role === 3) {
            dispatch(setUser(res.data.user));
            dispatch(changeToken(res.data.token));
          } else {
            ToastAndroid.show('Harap login di web', ToastAndroid.LONG);
          }
        } else {
          ToastAndroid.show(res.message, ToastAndroid.LONG);
        }
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  return (
    <ScrollView style={[styles.backgroundLight, styles.flex1]}>
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
      <View style={[styles.marginVM, styles.marginHM]}>
        <Text style={[styles.textH2, styles.textPrimary]}>Selamat Datang</Text>
        <Text>Masuk untuk melanjutkan</Text>
      </View>
      <View style={[styles.centerItem, styles.marginHM]}>
        <InputView
          placeholder="Masukkan email"
          onChangeText={(inputEmail) => setEmail(inputEmail)}
        />
      </View>
      <View style={[styles.centerItem, styles.marginVM, styles.marginHM]}>
        <InputView
          placeholder="Masukan password"
          secure={secure}
          name={secure ? 'eye-off' : 'eye'}
          onChangeText={(inputPass) => setPassword(inputPass)}
          onIconPress={() => setSecure(!secure)}
        />
      </View>
      <View style={[styles.marginVM, styles.marginHM]}>
        <ButtonView
          loading={loading}
          title="Masuk"
          dark
          onPress={() => onClickLogin()}
        />
      </View>
      <View style={[styles.centerItem, styles.marginVM]}>
        <Text>atau</Text>
      </View>
      <View style={[styles.marginVM, styles.marginHM]}>
        <ButtonView
          title="Daftar"
          onPress={() => props.navigation.navigate('Register')}
        />
      </View>
      <View style={[styles.centerItem, styles.marginVM]}>
        <Text
          style={styles.textMedium}
          onPress={() => props.navigation.navigate('ForgotPassword')}>
          Lupa Kata Sandi?
        </Text>
      </View>
      <View style={[styles.centerItem, styles.marginVM]}>
        <Text
          style={styles.textMedium}
          onPress={() => props.navigation.navigate('Help')}>
          Butuh bantuan?
        </Text>
      </View>
    </ScrollView>
  );
};

export default Login;
