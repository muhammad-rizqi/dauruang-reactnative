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
          dispatch(setUser(res.data.user));
          dispatch(changeToken(res.data.token));
        } else {
          ToastAndroid.show(res.message, ToastAndroid.LONG);
        }
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

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
        <InputView
          placeholder="Masukkan email"
          onChangeText={(inputEmail) => setEmail(inputEmail)}
        />
      </View>
      <View style={[styles.centerItem, styles.marginVM]}>
        <InputView
          placeholder="Masukan password"
          secure={secure}
          name={secure ? 'eye-off' : 'eye'}
          onChangeText={(inputPass) => setPassword(inputPass)}
          onIconPress={() => setSecure(!secure)}
        />
      </View>
      <ButtonView
        loading={loading}
        title="Masuk"
        dark
        onPress={() => onClickLogin()}
      />
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
