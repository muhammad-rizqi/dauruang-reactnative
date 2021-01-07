/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  ToastAndroid,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonView from '../../components/ButtonView';
import InputView from '../../components/InputView';
import {regionFrom, goToMaps} from '../../helper/MapsHelper';
import {colors, styles} from '../../style/styles';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {reverseGeo} from '../../services/API/geolocation';
import {useSelector} from 'react-redux';
import {ajukanJemput, batalkanJemput} from '../../services/endpoint/nasabah';

const Jemput = ({navigation, route}) => {
  const {user} = useSelector((state) => state);
  const penjemputan = route.params ? route.params.penjemputan : null;

  const [mapReady, setMapReady] = useState(false);
  const [markCoord, setMarkCoord] = useState(
    penjemputan ? JSON.parse(penjemputan.lokasi) : JSON.parse(user.lokasi),
  );
  const [mapsData, setMapsData] = useState(
    penjemputan ? JSON.parse(penjemputan.lokasi) : JSON.parse(user.lokasi),
  );

  const [name, setName] = useState(
    penjemputan ? penjemputan.nama_pengirim : user.nama_lengkap,
  );
  const [phone, setPhone] = useState(
    penjemputan ? penjemputan.telepon : user.telepon,
  );
  const [keterangan, setKeterangan] = useState(
    penjemputan ? penjemputan.keterangan : '',
  );
  const [loading, setLoading] = useState(false);

  const reverseLocation = (coord, place) => {
    reverseGeo(coord)
      .then((res) => res.json())
      .then((response) => {
        setMapsData({
          latitude: response.lat,
          longitude: response.lon,
          place_id: place ? place.placeId : null,
          name: place ? place.name : response.display_name,
        });
      })
      .catch((e) => {
        console.error(e);
        ToastAndroid.show(e.message, ToastAndroid.LONG);
      });
  };

  const onClickJemput = () => {
    if ((name, phone, keterangan, mapsData)) {
      setLoading(true);
      ajukanJemput(user.id, name, phone, mapsData, keterangan)
        .then((res) => {
          if (res.code === 200) {
            setLoading(false);
            ToastAndroid.show('Berhasil diajukan', ToastAndroid.LONG);
            navigation.goBack();
          } else {
            ToastAndroid.show('Gagal diajukan', ToastAndroid.LONG);
          }
        })
        .catch((e) => {
          console.log(e);
          ToastAndroid.show('Kesalahan koneksi', ToastAndroid.LONG);
          setLoading(false);
        });
    } else {
      ToastAndroid.show('Harap isi dengan benar', ToastAndroid.LONG);
    }
  };

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

  return (
    <View style={[styles.backgroundLight, styles.flex1]}>
      <ScrollView style={[styles.container]}>
        <View style={[styles.row, styles.centerCenter]}>
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
            {penjemputan ? 'Permintaan Jemput' : 'Ajukan Jemput Sampah'}
          </Text>
        </View>
        <View style={styles.marginVM} />
        <View style={[styles.centerItem, styles.marginVS]}>
          <InputView
            placeholder="Nama Pengirim"
            value={name}
            editable={!penjemputan}
            onChangeText={(inputName) => setName(inputName)}
          />
        </View>
        <View style={[styles.centerItem, styles.marginVS]}>
          <InputView
            placeholder="Nomor Telepon"
            type="number-pad"
            value={phone}
            onChangeText={(inputPhone) => setPhone(inputPhone)}
            editable={!penjemputan}
          />
        </View>
        <View
          style={[styles.textInput, styles.backgroundWhite, styles.marginVS]}>
          <TextInput
            editable={!penjemputan}
            style={[styles.marginHM, {maxHeight: 100}]}
            placeholder="Deskripsikan apa yang ingin dikirim"
            multiline={true}
            value={keterangan}
            onChangeText={(ket) => setKeterangan(ket)}
          />
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
                  onPoiClick={(e) => {
                    if (!penjemputan) {
                      setMarkCoord(e.nativeEvent.coordinate);
                      reverseLocation(e.nativeEvent.coordinate, e.nativeEvent);
                    }
                  }}
                  onPress={(e) => {
                    if (!penjemputan) {
                      setMarkCoord(e.nativeEvent.coordinate);
                      reverseLocation(e.nativeEvent.coordinate);
                    }
                  }}
                  style={styles.map}>
                  {mapReady ? (
                    <Marker
                      draggable
                      coordinate={markCoord}
                      onDragEnd={(e) => {
                        if (!penjemputan) {
                          setMarkCoord(e.nativeEvent.coordinate);
                          reverseLocation(e.nativeEvent.coordinate);
                        }
                      }}
                    />
                  ) : null}
                </MapView>
              </>
            ) : null}
            <Text
              style={[styles.textMedium, styles.marginHS, styles.textPrimary]}>
              Alamat
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

        <View style={[styles.marginVS]}>
          {penjemputan ? (
            penjemputan.status === 1 ? (
              <Text style={styles.textH3}>Sedang Dijemput</Text>
            ) : penjemputan.status === 2 ? (
              <Text style={styles.textH3}>Selesai Dijemput</Text>
            ) : penjemputan.status === 3 ? (
              <Text>Dibatalkan</Text>
            ) : (
              <ButtonView
                loading={loading}
                title={'Batalkan'}
                onPress={() => onClickBatalkan()}
              />
            )
          ) : (
            <ButtonView
              loading={loading}
              title={'Minta Jemput'}
              dark
              onPress={() => onClickJemput()}
            />
          )}
        </View>
        <View style={styles.marginVM} />
      </ScrollView>
    </View>
  );
};

export default Jemput;
