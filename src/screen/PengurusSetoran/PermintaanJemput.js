/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ToastAndroid,
  Modal,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonView from '../../components/ButtonView';
import {regionFrom, goToMaps} from '../../helper/MapsHelper';
import {colors, styles} from '../../style/styles';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {batalkanJemput} from '../../services/endpoint/nasabah';
import {useSelector} from 'react-redux';
import {confirmJemput} from '../../services/endpoint/penyetor';
import {ScrollView} from 'react-native-gesture-handler';

const PermintaanJemput = ({navigation, route}) => {
  const [mapReady, setMapReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const {user} = useSelector((state) => state);
  const [show, setShow] = useState(true);
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

  const onClickConfirm = (status) => {
    setLoading(true);
    confirmJemput(penjemputan.id, user.id, status)
      .then((res) => {
        if (res.code === 200) {
          setLoading(false);
          ToastAndroid.show('Berhasil', ToastAndroid.LONG);
          navigation.goBack();
        } else {
          ToastAndroid.show('Gagal', ToastAndroid.LONG);
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
      <StatusBar backgroundColor={colors.lightBg} barStyle="dark-content" />
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
      <View style={[styles.row, styles.container]}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={26} color={colors.primary} />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.flex1} />
      <TouchableOpacity
        onPress={() => setShow(!show)}
        style={styles.centerCenter}>
        <Icon
          name={show ? 'chevron-down' : 'chevron-up'}
          size={26}
          color={colors.primary}
        />
      </TouchableOpacity>
      <View
        style={[
          styles.container,
          styles.backgroundLight,
          styles.topBorderCurve,
          styles.elevation,
        ]}>
        <Text style={[styles.textH3, styles.textPrimary]}>Jemput sampah</Text>
        <View style={[styles.marginVS, styles.row, styles.centerCenter]}>
          <View style={styles.flex1}>
            <Text style={styles.textMedium}>Nama Pengirim</Text>
            <Text style={styles.textH3}>{penjemputan.nama_pengirim}</Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate('ChatItem', {
                to: penjemputan.relation.nasabah,
              })
            }>
            <Icon name="comment" size={26} color={colors.primary} />
          </TouchableWithoutFeedback>
        </View>
        {show ? (
          <>
            <View style={styles.marginVS}>
              <Text style={styles.textMedium}>No Telepon</Text>
              <Text>{penjemputan.telepon}</Text>
            </View>
            <View style={styles.marginVS}>
              <Text style={styles.textMedium}>Keterangan</Text>
              <ScrollView style={{maxHeight: 100}}>
                <Text>{penjemputan.keterangan}</Text>
              </ScrollView>
            </View>
          </>
        ) : null}

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
          style={[styles.row, styles.centerCenter, styles.marginVM]}>
          <Icon name="map-marker-alt" size={24} color={colors.primary} />
          <Text
            style={[
              styles.textH3,
              styles.textPrimary,
              styles.flex1,
              styles.marginHM,
            ]}
            numberOfLines={1}>
            {mapsData.name}
          </Text>
        </TouchableOpacity>

        {penjemputan.status === 3 ? (
          <Text style={[styles.textH3, styles.textCenter]}>Dibatalkan</Text>
        ) : (
          <View style={[styles.row, styles.centerCenter]}>
            {penjemputan.status === 2 ? (
              <Text style={(styles.flex1, styles.marginHS, styles.textH3)}>
                Selesai Dijemput
              </Text>
            ) : penjemputan.status === 1 ? (
              <View style={[styles.marginVS, styles.flex1, styles.marginHM]}>
                <ButtonView
                  title="Tandai Selesai"
                  dark
                  onPress={() => onClickConfirm(2)}
                />
              </View>
            ) : (
              <>
                <View style={[styles.marginVS, styles.flex1]}>
                  <ButtonView
                    title="Batalkan"
                    onPress={() => onClickBatalkan()}
                  />
                </View>
                <View style={[styles.marginVS, styles.flex1, styles.marginHS]}>
                  <ButtonView
                    title="Jemput Sekarang"
                    dark
                    onPress={() => onClickConfirm(1)}
                  />
                </View>
              </>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default PermintaanJemput;
