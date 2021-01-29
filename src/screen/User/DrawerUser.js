import React from 'react';
import {View, Text, Image, TouchableNativeFeedback} from 'react-native';
import {styles, colors} from '../../style/styles';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {clearToken} from '../../redux/action';

const Drawer = ({navigation}) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state);

  return (
    <View>
      <View style={[styles.container, styles.backgroundPrimary]}>
        <TouchableNativeFeedback onPress={() => navigation.navigate('Profile')}>
          <Image
            source={{uri: user.avatar}}
            style={[styles.avatarL, styles.marginVS]}
          />
        </TouchableNativeFeedback>
        <View style={[styles.row, styles.centerCenter]}>
          <View style={styles.flex1}>
            <Text style={[styles.textH3, styles.textWhite]}>
              {user.nama_lengkap}
            </Text>
            <Text style={[styles.textWhite]}>{user.telepon}</Text>
          </View>
          <TouchableNativeFeedback
            onPress={() => navigation.navigate('QRScreen')}>
            <MaterialIcon name="qrcode-scan" size={28} color={colors.white} />
          </TouchableNativeFeedback>
        </View>
      </View>
      <View>
        <TouchableNativeFeedback onPress={() => navigation.navigate('Profile')}>
          <View style={[styles.row, styles.paddingS, styles.centerItem]}>
            <MaterialIcon name="account" size={28} color={colors.grey} />
            <Text style={[styles.textMedium, styles.marginHS]}>Profile</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => navigation.navigate('Settings')}>
          <View style={[styles.row, styles.paddingS, styles.centerItem]}>
            <MaterialIcon name="cog" size={28} color={colors.grey} />
            <Text style={[styles.textMedium, styles.marginHS]}>Pengaturan</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => navigation.navigate('Help')}>
          <View style={[styles.row, styles.paddingS, styles.centerItem]}>
            <MaterialIcon name="help-circle" size={28} color={colors.grey} />
            <Text style={[styles.textMedium, styles.marginHS]}>Bantuan</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => dispatch(clearToken())}>
          <View style={[styles.row, styles.paddingS, styles.centerItem]}>
            <MaterialIcon name="logout" size={28} color={colors.grey} />
            <Text style={[styles.textMedium, styles.marginHS]}>Keluar</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default Drawer;
