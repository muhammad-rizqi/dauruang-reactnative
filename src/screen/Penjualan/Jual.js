import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Switch,
} from 'react-native';
import ButtonView from '../../components/ButtonView';
import InputView from '../../components/InputView';
import {colors, styles} from '../../style/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Jual = () => {
  const [isEnabled, setisEnabled] = useState(false);
  return (
    <ScrollView
      style={[styles.backgroundLight, styles.flex1, styles.container]}>
      <View style={[styles.row, styles.centerCenter]}>
        <TouchableWithoutFeedback>
          <Icon name="chevron-left" size={20} color={colors.primary} />
        </TouchableWithoutFeedback>
        <Text
          style={[
            styles.textH3,
            styles.textPrimary,
            styles.flex1,
            styles.marginHM,
          ]}>
          Penjualan Sampah
        </Text>
      </View>
      <View style={styles.marginVM}>
        <View style={[styles.centerItem, styles.marginVS]}>
          <InputView placeholder="Tanggal" />
        </View>
        <View style={[styles.centerItem, styles.marginVS]}>
          <InputView placeholder="Jenis Sampah" />
        </View>
        <View style={[styles.centerItem, styles.marginVS]}>
          <InputView placeholder="Harga Satuan" />
        </View>
        <View style={[styles.centerItem, styles.marginVS]}>
          <InputView placeholder="Berat Sampah" />
        </View>
        <View style={[styles.marginVM]}>
          <View style={[styles.row, styles.space]}>
            <Text style={styles.textH3}>Total Penjualan</Text>
            <Text style={styles.textH3}>Rp. 2.000.000,-</Text>
          </View>
        </View>
        <ButtonView title="Tambah Penjualan" dark />
        <View style={[styles.centerItem, styles.marginVS]} />
      </View>
    </ScrollView>
  );
};

export default Jual;
