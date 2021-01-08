import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Switch,
  Image,
} from 'react-native';
import ButtonView from '../../components/ButtonView';
import InputView from '../../components/InputView';
import {colors, styles} from '../../style/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getSampahCategory} from '../../services/endpoint/sampah';
import {Picker} from '@react-native-picker/picker';

const Setoran = ({navigation, route}) => {
  const [isEnabled, setisEnabled] = useState(false);
  const [category, setCategory] = useState([]);
  const [selected, setSelected] = useState([]);
  const nasabah = route.params.data;

  console.log(nasabah);

  const getCategory = () => {
    getSampahCategory()
      .then((cat) => setCategory(cat.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <ScrollView
      style={[styles.backgroundLight, styles.flex1, styles.container]}>
      <View style={[styles.row, styles.centerCenter]}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('DashboardSetoran')}>
          <Icon name="chevron-left" size={20} color={colors.primary} />
        </TouchableWithoutFeedback>
        <Text
          style={[
            styles.textH3,
            styles.textPrimary,
            styles.flex1,
            styles.marginHM,
          ]}>
          Setor Sampah
        </Text>
      </View>
      <View style={styles.marginVM}>
        <View style={[styles.row, styles.centerCard, styles.marginVM]}>
          <Image source={{uri: nasabah.avatar}} style={styles.avatarM} />
          <Text style={[styles.marginHM, styles.textH2, styles.textPrimary]}>
            {nasabah.nama_lengkap}
          </Text>
        </View>

        <View style={[styles.textInput, styles.backgroundWhite]}>
          <Picker
            mode="dropdown"
            selectedValue={selected}
            onValueChange={(itemValue) => setSelected(itemValue)}>
            {category.map((sampah) => (
              <Picker.Item
                key={sampah.id}
                label={sampah.nama_kategori + ' - Rp. ' + sampah.harga}
                value={sampah.id}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.row}>
          <View style={[styles.centerItem, styles.marginVS, styles.flex1]}>
            <InputView placeholder="Berat Sampah" type="numeric" />
          </View>
          <View style={[styles.row, styles.centerCenter]}>
            <Text style={styles.marginHM}>Dijemput</Text>
            <Switch
              trackColor={{false: colors.grey, true: colors.primary}}
              thumbColor={isEnabled ? colors.secondary : colors.white}
              onValueChange={() => setisEnabled(!isEnabled)}
              value={isEnabled}
            />
          </View>
        </View>
        <View style={[styles.marginVM]}>
          <View style={[styles.row, styles.space]}>
            <Text>Total Harga Sampah</Text>
            <Text>Rp. 100.0000</Text>
          </View>
          <View style={[styles.row, styles.space]}>
            <Text>{'Potongan Jemput (20%)'}</Text>
            <Text>Rp. 20.0000</Text>
          </View>
          <View style={[styles.row, styles.space]}>
            <Text style={styles.textH3}>Total TopUp</Text>
            <Text style={styles.textH3}>Rp. 20.0000</Text>
          </View>
        </View>

        <ButtonView title="Setor" dark />
        <View style={[styles.centerItem, styles.marginVS]} />
      </View>
    </ScrollView>
  );
};

export default Setoran;
