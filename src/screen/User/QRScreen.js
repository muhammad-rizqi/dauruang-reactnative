import React from 'react';
import {
  Image,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {useSelector} from 'react-redux';
import {colors, styles} from '../../style/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

const QRScreen = ({navigation}) => {
  const {user} = useSelector((state) => state);
  const dataQR = {
    id: user.id,
    nama_lengkap: user.nama_lengkap,
    avatar: user.avatar,
    role: user.role,
  };

  return (
    <ScrollView style={[styles.backgroundLight, styles.flex1]}>
      <StatusBar backgroundColor={colors.lightBg} barStyle="dark-content" />
      <View style={[styles.container]}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={20} color={colors.primary} />
        </TouchableWithoutFeedback>
      </View>
      <View style={[styles.flex1, styles.centerCenter]}>
        <Text style={[styles.textH2, styles.textPrimary]}>Pindai QR Code</Text>
        <View style={[styles.card, styles.backgroundWhite, styles.marginVM]}>
          <View style={[styles.row, styles.centerCard, styles.marginVM]}>
            <Image source={{uri: user.avatar}} style={styles.avatarM} />
            <Text style={[styles.marginHM, styles.textH2, styles.textPrimary]}>
              {user.nama_lengkap}
            </Text>
          </View>
          <QRCode size={200} value={JSON.stringify(dataQR)} />
        </View>
        <Text>Tunjukkan QR ini ke petugas untuk dipindai</Text>
      </View>
    </ScrollView>
  );
};

export default QRScreen;
