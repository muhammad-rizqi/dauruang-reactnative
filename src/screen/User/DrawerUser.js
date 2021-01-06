import React from 'react';
import {View, Text, Image, TouchableNativeFeedback} from 'react-native';
import {styles, colors} from '../../style/styles';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Drawer = () => {
  return (
    <View>
      <View style={[styles.container, styles.backgroundPrimary]}>
        <Image
          source={{uri: 'https://ui-avatars.com/api/?name=Joni'}}
          style={styles.avatarL}
        />
        <View style={styles.marginVM}>
          <Text style={[styles.textH3, styles.textWhite]}>Kevin</Text>
          <Text style={[styles.textWhite]}>08278362187637</Text>
        </View>
      </View>
      <View>
        <TouchableNativeFeedback>
          <View style={[styles.row, styles.paddingS, styles.centerItem]}>
            <MaterialIcon name="account" size={40} color={colors.black} />
            <Text style={[styles.textH3, styles.marginHS]}>Profile</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
          <View style={[styles.row, styles.paddingS, styles.centerItem]}>
            <MaterialIcon name="cog" size={40} color={colors.black} />
            <Text style={[styles.textH3, styles.marginHS]}>Pengaturan</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
          <View style={[styles.row, styles.paddingS, styles.centerItem]}>
            <MaterialIcon name="help-circle" size={40} color={colors.black} />
            <Text style={[styles.textH3, styles.marginHS]}>Bantuan</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
          <View style={[styles.row, styles.paddingS, styles.centerItem]}>
            <MaterialIcon name="logout" size={40} color={colors.black} />
            <Text style={[styles.textH3, styles.marginHS]}>Keluar</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default Drawer;
