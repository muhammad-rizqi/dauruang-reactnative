import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ToastAndroid,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonView from '../../components/ButtonView';
import {regionFrom, goToMaps} from '../../helper/MapsHelper';
import {colors, styles} from '../../style/styles';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {batalkanJemput} from '../../services/endpoint/nasabah';
import {useSelector} from 'react-redux';
import {confirmJemput} from '../../services/endpoint/penyetor';

const PermintaanJemput = ({navigation, route}) => {
  const [mapReady, setMapReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const {user} = useSelector((state) => state);

  const {penjemputan} = route.params;
  const mapsData = JSON.parse(penjemputan.lokasi);

  const onClickBatalkan = () => {
    setLoading(true);
    batalkanJemput(penjemputan.id, user.id)
      .then((res) => {
        if (res.code === 200) {
          setLoading(false);
          ToastAndroid.show('Berhasil dibatalkan', ToastAndroid.LONG);
          navigation.goBack();
        } else {
          ToastAndroid.show('Gagal dibatalkan', ToastAndroid.LONG);
        }
      })
      .catch((e) => {
        console.log(e);
        ToastAndroid.show('Kesalahan koneksi', ToastAndroid.LONG);
        setLoading(false);
      });
  };

  const onClickConfirm = () => {
    setLoading(true);
    confirmJemput(penjemputan.id, user.id)
      .then((res) => {
        if (res.code === 200) {
          setLoading(false);
          ToastAndroid.show('Berhasil dikonfirmasi', ToastAndroid.LONG);
          navigation.goBack();
        } else {
          ToastAndroid.show('Berhasil dikonfirmasi', ToastAndroid.LONG);
        }
      })
      .catch((e) => {
        console.log(e);
        ToastAndroid.show('Kesalahan koneksi', ToastAndroid.LONG);
        setLoading(false);
      });
  };

  return (
    <View style={[styles.backgroundLight, styles.flex1]}>
      <Modal transparent={true} visible={loading} style={[styles.flex1]}>
        <View
          style={[styles.flex1, styles.centerCenter, styles.backgroundOpacity]}>
          <View style={[styles.card, styles.backgroundWhite]}>
            <ActivityIndicator color={colors.primary} size="large" />
            <Text style={[styles.marginHL, styles.marginVM]}>
              Merubah Data ...
            </Text>
          </View>
        </View>
      </Modal>
      <View style={[styles.row, styles.centerCenter, styles.container]}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={26} color={colors.primary} />
        </TouchableWithoutFeedback>
        <Text
          style={[
            styles.textH3,
            styles.textPrimary,
            styles.flex1,
            styles.marginHM,
          ]}>
          Permintaan Jemput Sampah
        </Text>
      </View>
      <ScrollView style={[styles.container]}>
        <View style={styles.marginVS}>
          <Text style={styles.textMedium}>Nama Pengirim</Text>
          <Text style={styles.textH3}>{penjemputan.nama_pengirim}</Text>
        </View>
        <View style={styles.marginVS}>
          <Text style={styles.textMedium}>No Telepon</Text>
          <Text>{penjemputan.telepon}</Text>
        </View>
        <View style={styles.marginVS}>
          <Text style={styles.textMedium}>Keterangan</Text>
          <Text>{penjemputan.keterangan}</Text>
        </View>
        <View style={[styles.marginVS]}>
          <View style={styles.mapContainer}>
            {mapsData.latitude !== undefined ? (
              <>
                <MapView
                  provider={PROVIDER_GOOGLE}
                  initialRegion={regionFrom(mapsData)}
                  onMapReady={() => setMapReady(true)}
                  showsUserLocation
                  showsMyLocationButton
                  style={styles.map}>
                  {console.log(regionFrom(mapsData))}
                  {mapReady ? <Marker draggable coordinate={mapsData} /> : null}
                </MapView>
              </>
            ) : null}
            <Text
              style={[styles.textMedium, styles.marginHS, styles.textPrimary]}>
              Alamat Penjemputan
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            mapsData.place_id
              ? goToMaps(
                  mapsData.longitude,
                  mapsData.latitude,
                  mapsData.place_id,
                )
              : goToMaps(mapsData.longitude, mapsData.latitude, null);
          }}
          style={[styles.row, styles.centerCenter]}>
          <Text
            style={[
              styles.textPrimary,
              styles.textMedium,
              styles.marginVM,
              styles.flex1,
            ]}>
            {mapsData.name}
          </Text>
          <Icon
            name="map-marked-alt"
            size={24}
            style={styles.marginHS}
            color={colors.primary}
          />
        </TouchableOpacity>

        {penjemputan.status === 3 ? (
          <Text style={[styles.textH3, styles.textCenter]}>Dibatalkan</Text>
        ) : (
          <>
            {penjemputan.status === 2 ? (
              <Text>Selesai Dijemput</Text>
            ) : (
              <View style={[styles.marginVS]}>
                <ButtonView
                  title="Konfirmasi Jemput"
                  dark
                  onPress={() => onClickConfirm()}
                />
              </View>
            )}
            <View style={[styles.marginVS]}>
              <ButtonView
                title="Batalkan Jemput"
                onPress={() => onClickBatalkan()}
              />
            </View>
          </>
        )}
        <View style={styles.marginVM} />
      </ScrollView>
    </View>
  );
};

export default PermintaanJemput;
