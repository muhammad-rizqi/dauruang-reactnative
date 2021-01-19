/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  ToastAndroid,
  TouchableOpacity,
  TextInput,
  StatusBar,
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
  const [show, setShow] = useState(false);
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
            ToastAndroid.show('Berhasil diajukan', ToastAndroid.LONG);
            navigation.goBack();
          } else {
            ToastAndroid.show('Gagal diajukan', ToastAndroid.LONG);
          }
          setLoading(false);
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
      <StatusBar backgroundColor={colors.lightBg} barStyle="dark-content" />
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
        <Text style={[styles.textH3, styles.textPrimary]}>
          {penjemputan ? 'Detail Penjemputan' : 'Ajukan Penjemputan'}
        </Text>
        {penjemputan.id_pengurus ? (
          <View>
            <Text>Dijemput oleh </Text>
            <View style={[styles.row, styles.marginVS, styles.centerCenter]}>
              <Image
                source={{uri: penjemputan.relation.pengurus.avatar}}
                style={styles.avatarM}
              />
              <Text style={[styles.textH3, styles.marginHM, styles.flex1]}>
                {penjemputan.relation.pengurus.nama_lengkap}
              </Text>
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate('ChatItem', {
                    to: penjemputan.relation.pengurus,
                  })
                }>
                <Icon name="comment" size={26} color={colors.primary} />
              </TouchableWithoutFeedback>
            </View>
          </View>
        ) : null}
        <Image />
        {show ? (
          <>
            <View style={[styles.marginVS]}>
              <Text>Nama Pengirim</Text>
              <InputView
                placeholder="Masukkan Nama Pengirim"
                value={name}
                editable={!penjemputan}
                onChangeText={(inputName) => setName(inputName)}
              />
            </View>
            <View style={[styles.marginVS]}>
              <Text>Nomor Telepon</Text>
              <InputView
                placeholder="+62812345678"
                type="number-pad"
                value={phone}
                onChangeText={(inputPhone) => setPhone(inputPhone)}
                editable={!penjemputan}
              />
            </View>
            <Text>Deskripsi</Text>
            <View
              style={[
                styles.textInput,
                styles.backgroundWhite,
                styles.marginVS,
              ]}>
              <TextInput
                editable={!penjemputan}
                style={[styles.marginHM, {maxHeight: 100}]}
                placeholder="Apa yang ingin Anda dikirim?"
                multiline={true}
                value={keterangan}
                onChangeText={(ket) => setKeterangan(ket)}
              />
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
          <Icon name="map-marker-alt" size={14} color={colors.primary} />
          <Text
            style={[
              styles.textMedium,
              styles.textPrimary,
              styles.flex1,
              styles.marginHM,
            ]}
            numberOfLines={1}>
            {mapsData.name}
          </Text>
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
      </View>
    </View>
  );
};

export default Jemput;
