import React from 'react';

import {Text, ToastAndroid, TouchableWithoutFeedback, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {colors, styles} from '../../style/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ScanQR = ({navigation}) => {
  const validateQR = (e) => {
    try {
      if (
        JSON.parse(e.data).avatar ||
        JSON.parse(e.data).nama_pengguna ||
        JSON.parse(e.data).id
      ) {
        navigation.navigate('Setoran', {data: JSON.parse(e.data)});
      } else {
        ToastAndroid.show('Kode QR salah', ToastAndroid.LONG);
        navigation.goBack();
      }
    } catch (error) {
      ToastAndroid.show('Kode QR tidak dikenali', ToastAndroid.LONG);
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.backgroundLight, styles.flex1]}>
      <View style={[styles.container]}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={20} color={colors.primary} />
        </TouchableWithoutFeedback>
      </View>
      <View style={[styles.flex1, styles.centerCenter]}>
        <Text style={[styles.textH2, styles.textPrimary]}>Pindai QR Code</Text>
        <View style={styles.marginVM} />
        <QRCodeScanner
          showMarker
          vibrate={true}
          onRead={(e) => validateQR(e)}
        />
      </View>
    </View>
  );
};

export default ScanQR;
