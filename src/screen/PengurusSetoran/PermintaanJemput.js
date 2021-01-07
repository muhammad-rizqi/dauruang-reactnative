import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonView from '../../components/ButtonView';
import {regionFrom, goToMaps} from '../../helper/MapsHelper';
import {colors, styles} from '../../style/styles';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const PermintaanJemput = ({navigation, route}) => {
  const [mapReady, setMapReady] = useState(false);
  const {penjemputan} = route.params;
  const mapsData = JSON.parse(penjemputan.lokasi);

  return (
    <View style={[styles.backgroundLight, styles.flex1]}>
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

        <View style={[styles.marginVS]}>
          <ButtonView title="Konfirmasi Jemput" dark onPress={() => {}} />
        </View>
        <View style={[styles.marginVS]}>
          <ButtonView title="Batalkan Jemput" onPress={() => {}} />
        </View>
        <View style={styles.marginVM} />
      </ScrollView>
    </View>
  );
};

export default PermintaanJemput;
