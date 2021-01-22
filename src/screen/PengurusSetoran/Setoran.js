import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Switch,
  Image,
  ToastAndroid,
  StatusBar,
} from 'react-native';
import ButtonView from '../../components/ButtonView';
import InputView from '../../components/InputView';
import {colors, styles} from '../../style/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getSampahCategory} from '../../services/endpoint/sampah';
import {Picker} from '@react-native-picker/picker';
import {addSetor} from '../../services/endpoint/penyetor';
import {toPrice} from '../../services/helper/helper';

const Setoran = ({navigation, route}) => {
  const [isEnabled, setisEnabled] = useState(false);
  const [category, setCategory] = useState([]);
  const [berat, setBerat] = useState(1);
  const [selected, setSelected] = useState(0);
  const nasabah = route.params.data;
  const [loading, setLoading] = useState(false);

  console.log(nasabah);

  const getCategory = () => {
    getSampahCategory()
      .then((cat) => setCategory(cat.data))
      .catch((e) => setCategory([]));
  };

  const onClickSetor = () => {
    setLoading(true);
    addSetor(nasabah.id, category[selected].id, berat, isEnabled)
      .then((res) => {
        if (res.code === 200) {
          ToastAndroid.show('Berhasil setor', ToastAndroid.LONG);
          navigation.navigate('DashboardSetoran');
        } else {
          ToastAndroid.show('Gagal setor', ToastAndroid.LONG);
          setLoading(false);
        }
      })
      .catch((e) => {
        ToastAndroid.show('Gagal melakukan permintaan', ToastAndroid.LONG);
        console.log(e);
        setLoading(false);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <ScrollView style={[styles.backgroundLight, styles.flex1]}>
      <StatusBar backgroundColor={colors.lightBg} barStyle="dark-content" />
      <View style={[styles.row, styles.centerCenter, styles.container]}>
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
          Setor Sampah Nasabah
        </Text>
      </View>
      <View style={styles.marginHM}>
        <View style={[styles.row, styles.centerCenter, styles.marginVS]}>
          <Image source={{uri: nasabah.avatar}} style={styles.avatarM} />
          <Text
            style={[
              styles.marginHS,
              styles.textH3,
              styles.textPrimary,
              styles.flex1,
            ]}>
            {nasabah.nama_lengkap}
          </Text>
        </View>
        <Text>Jenis Sampah</Text>
        <View style={[styles.textInput, styles.backgroundWhite]}>
          <Picker
            mode="dropdown"
            selectedValue={category.length > 0 ? category[selected].id : 0}
            onValueChange={(item, index) => setSelected(index)}>
            {category.map((sampah) => (
              <Picker.Item
                key={sampah.id}
                label={sampah.nama_kategori + ' (Rp. ' + sampah.harga + ')'}
                value={sampah.id}
              />
            ))}
          </Picker>
        </View>
        <View style={[styles.row]}>
          <View style={[styles.marginVS, styles.flex1]}>
            <Text>Berat Sampah {'(Kg)'}</Text>
            <InputView
              value={`${berat}`}
              placeholder="Berat Sampah "
              type="numeric"
              onChangeText={(i) => setBerat(i)}
            />
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
          {berat !== '' || berat > 0 || category.length > 0 ? (
            <>
              {isEnabled ? (
                <>
                  <View style={[styles.row, styles.space]}>
                    <Text>Total Harga Sampah</Text>
                    <Text>
                      Rp.{' '}
                      {toPrice(
                        Number.parseFloat(berat) * category[selected].harga,
                      )}
                    </Text>
                  </View>
                  <View style={[styles.row, styles.space]}>
                    <Text>{'Potongan Jemput (20%)'}</Text>
                    <Text>
                      Rp.{' '}
                      {toPrice(
                        Number.parseFloat(berat) *
                          category[selected].harga *
                          0.2,
                      )}
                    </Text>
                  </View>
                </>
              ) : null}
              <View style={[styles.row, styles.space]}>
                <Text style={styles.textH3}>Total TopUp</Text>
                <Text style={styles.textH3}>
                  Rp.{' '}
                  {category[selected] && berat !== ''
                    ? !isEnabled
                      ? toPrice(
                          Number.parseFloat(berat) * category[selected].harga,
                        )
                      : toPrice(
                          Number.parseFloat(berat) * category[selected].harga -
                            Number.parseFloat(berat) *
                              category[selected].harga *
                              0.2,
                        )
                    : 0}
                </Text>
              </View>
            </>
          ) : null}
        </View>

        <ButtonView
          title="Setor"
          dark
          loading={loading}
          onPress={() => onClickSetor()}
        />
        <View style={[styles.centerItem, styles.marginVS]} />
      </View>
    </ScrollView>
  );
};

export default Setoran;
