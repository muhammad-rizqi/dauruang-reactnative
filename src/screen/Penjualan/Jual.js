import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  ToastAndroid,
  StatusBar,
} from 'react-native';
import ButtonView from '../../components/ButtonView';
import InputView from '../../components/InputView';
import {colors, styles} from '../../style/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Picker} from '@react-native-picker/picker';
import {getSampahCategory} from '../../services/endpoint/sampah';
import {jualSampah} from '../../services/endpoint/penjual';
import {useSelector} from 'react-redux';

const Jual = ({navigation}) => {
  const [category, setCategory] = useState([]);
  const [harga, setHarga] = useState(0);
  const [berat, setBerat] = useState(0);
  const [selected, setSelected] = useState(0);
  const [client, setClient] = useState('');
  const [loading, setLoading] = useState(false);
  const {user} = useSelector((state) => state);

  const onClickJual = () => {
    if (
      harga !== '' ||
      harga > 0 ||
      berat > 0 ||
      berat !== '' ||
      client !== '' ||
      category.length > 0
    ) {
      setLoading(true);
      jualSampah(user.id, category[selected].id, client, harga, berat)
        .then((res) => {
          if (res.code === 201) {
            ToastAndroid.show('Berhasil memasukan data', ToastAndroid.LONG);
            navigation.goBack();
          } else {
            ToastAndroid.show('Gagal memasukan data', ToastAndroid.LONG);
            setLoading(false);
          }
        })
        .catch((e) => {
          console.log(e);
          ToastAndroid.show('Gagal mengirim data', ToastAndroid.LONG);
          setLoading(false);
        });
    } else {
      ToastAndroid.show('Harap isi semua', ToastAndroid.LONG);
    }
  };

  const getCategory = () => {
    getSampahCategory()
      .then((cat) => setCategory(cat.data))
      .catch((e) => setCategory([]));
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <ScrollView style={[styles.backgroundLight, styles.flex1]}>
      <StatusBar backgroundColor={colors.lightBg} barStyle="dark-content" />
      <View style={[styles.row, styles.centerCenter, styles.container]}>
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
          Penjualan Sampah
        </Text>
      </View>
      <View style={[styles.marginVM, styles.marginHM]}>
        <View style={[styles.marginVS]}>
          <Text>Pengepul</Text>
          <InputView
            placeholder="Masukkan Nama Client"
            onChangeText={(inputClient) => setClient(inputClient)}
          />
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
                label={sampah.nama_kategori}
                value={sampah.id}
              />
            ))}
          </Picker>
        </View>
        <View style={[styles.marginVS]}>
          <Text>Harga Satuan</Text>
          <InputView
            placeholder="Harga Satuan"
            onChangeText={(price) => setHarga(price)}
          />
        </View>
        <View style={[styles.marginVS]}>
          <Text>Berat Sampah</Text>
          <InputView
            placeholder="Masukkan Berat Sampah"
            onChangeText={(weight) => setBerat(weight)}
          />
        </View>
        <View style={[styles.marginVM]}>
          <View style={[styles.row, styles.space]}>
            <Text style={styles.textH3}>Total Penjualan</Text>
            <Text style={styles.textH3}>Rp. {berat * harga},-</Text>
          </View>
        </View>
        <ButtonView
          title="Tambah Penjualan"
          loading={loading}
          dark
          onPress={onClickJual}
        />
        <View style={[styles.centerItem, styles.marginVS]} />
      </View>
    </ScrollView>
  );
};

export default Jual;
