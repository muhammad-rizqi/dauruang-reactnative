import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native';
import ButtonView from '../../components/ButtonView';
import InputView from '../../components/InputView';
import {colors, styles} from '../../style/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {deleteAcount, changePassword} from '../../services/endpoint/user';
import {useDispatch, useSelector} from 'react-redux';
import {clearToken} from '../../redux/action';

const Settings = ({navigation}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {user} = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onClickChange = () => {
    setLoading(true);
    changePassword(user.id, oldPassword, newPassword, confirmPassword)
      .then((res) => {
        if (res.code === 200) {
          ToastAndroid.show(
            'Berhasil merubah password\n Silahkan login kembali',
            ToastAndroid.LONG,
          );
          dispatch(clearToken());
        } else {
          ToastAndroid.show('Gagal merubah password', ToastAndroid.LONG);
          setLoading(false);
        }
      })
      .catch((e) => {
        setLoading(false);
        ToastAndroid.show('Gagal menyambung ke server', ToastAndroid.LONG);
        console.log(e);
      });
  };

  return (
    <ScrollView
      style={[styles.backgroundLight, styles.flex1, styles.container]}>
      <View style={[styles.row, styles.centerCenter]}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={20} color={colors.primary} />
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
          <InputView
            placeholder="Password Lama"
            secure
            onChangeText={(o) => setOldPassword(o)}
          />
        </View>
        <View style={[styles.centerItem, styles.marginVS]}>
          <InputView
            placeholder="Password Baru"
            secure
            onChangeText={(n) => setNewPassword(n)}
          />
        </View>
        <View style={[styles.centerItem, styles.marginVS]}>
          <InputView
            placeholder="Konfirmasi Password"
            secure
            onChangeText={(c) => setConfirmPassword(c)}
          />
        </View>
        <ButtonView
          title="Reset Password"
          dark
          onPress={onClickChange}
          loading={loading}
        />
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
