import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  StatusBar,
  Alert,
  Linking,
} from 'react-native';
import {colors, styles} from '../../style/styles';
import Logo from '../../assets/img/logo.svg';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Help = ({navigation}) => {
  const goToLink = async () => {
    const supported = await Linking.canOpenURL(
      'https://play.google.com/store/apps/dev?id=5466953594888127910',
    );

    if (supported) {
      await Linking.openURL(
        'https://play.google.com/store/apps/dev?id=5466953594888127910',
      );
    } else {
      Alert.alert("Don't know how to open this URL");
    }
  };

  const step = [
    'Nasabah bisa mendaftar via aplikasi mobile, sedangkan akun pengurus dan bendahara dibuat oleh admin via web.',
    'Nasabah dan pengurus bisa login melalui mobile, sedangkan bendahara dan admin harus login via web.',
    'Nasabah yang ingin dijemput sampah nya bisa meminta penjemputan melalui aplikasi dan menentukan lokasi nya dan beri keterangan sampah apa yang akan dijemput.',
    'Nasabah bisa membatalkan permintaan jika status penjemputan belum di konfirmasi oleh pengurus.',
    'Nasabah bisa menyetorkan langsung sampah ke kantor bank sampah dan dilayani pengurus langsung.',
    'Pengurus akan segera menjemput sesuai lokasi yang diminta nasabah dan menghubungi kontak yang tertera di form permintaan.',
    'Pengurus akan memindai QR nasabah untuk memasukkan data.',
    'Pengurus akan memasukkan data sampah sesuai berat timbangan. Jika dijemput maka harga dikurangi sebesar 20% dari harga total sampah.',
    'Saldo akan otomatis masuk ke buku tabungan nasabah.',
    'Pengurus akan menjualkan sampah ketika sudah cukup stok untuk dijual ke pengepul dan saldo akan masuk ke keuangan bank sampah.',
    'Nasabah bisa menarik saldo yang ada dengan cara datang ke kantor untuk dilayani oleh bendahara.',
  ];

  return (
    <ScrollView style={[styles.backgroundLight, styles.flex1]}>
      <StatusBar backgroundColor={colors.lightBg} barStyle="dark-content" />
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
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
        <Text style={styles.marginVM}>Cara kerja aplikasi Daur Uang</Text>
        <View style={styles.marginVM}>
          {step.map((item, index) => (
            <Text style={styles.marginVS}>
              {index + 1}. {item}
            </Text>
          ))}
        </View>
        <View>
          <Text
            onPress={goToLink}
            style={[styles.textMedium, styles.textCenter, styles.marginVM]}>
            Untuk informasi dan aplikasi lain nya kunjungi Pondok Programmer
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Help;
