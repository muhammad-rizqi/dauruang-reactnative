import React, {useEffect, useState} from 'react';
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
import {
  regionFrom,
  requestLocationPermission,
  goToMaps,
} from '../../helper/MapsHelper';
import {colors, styles} from '../../style/styles';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const Jemput = () => {
  const [position, setPosition] = useState({});
  const [mapReady, setMapReady] = useState(false);
  const [markCoord, setMarkCoord] = useState({});
  const [mapsData, setMapsData] = useState({});

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  const requestPermission = async () => {
    try {
      const persmission = await requestLocationPermission();
      console.log(persmission);
      if (persmission) {
        Geolocation.getCurrentPosition(
          (result) => {
            console.log('getposisi');
            setPosition(result.coords);
            setMarkCoord(result.coords);
            setMapsData(result.coords);
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
            ToastAndroid.show(error.message, ToastAndroid.LONG);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <View style={[styles.backgroundLight, styles.flex1]}>
      <ScrollView style={[styles.container]}>
        <View style={[styles.row, styles.centerCenter]}>
          <TouchableWithoutFeedback>
            <Icon name="chevron-left" size={26} color={colors.primary} />
          </TouchableWithoutFeedback>
          <Text
            style={[
              styles.textH3,
              styles.textPrimary,
              styles.flex1,
              styles.marginHM,
            ]}>
            Ajukan Jemput Sampah
          </Text>
        </View>
        <View style={styles.marginVM} />
        <View style={[styles.centerItem, styles.marginVS]}>
          <InputView
            placeholder="Nama Pengirim"
            value={name}
            onChangeText={(inputName) => setName(inputName)}
          />
        </View>
        <View style={[styles.centerItem, styles.marginVS]}>
          <InputView
            placeholder="Nomor Telepon"
            type="number-pad"
            value={phone}
            onChangeText={(inputPhone) => setPhone(inputPhone)}
          />
        </View>
        <View
          style={[styles.textInput, styles.backgroundWhite, styles.marginVS]}>
          <TextInput
            style={[styles.marginHM, {maxHeight: 100}]}
            placeholder="Deskripsikan apa yang ingin dikirim"
            multiline={true}
          />
        </View>
        <View style={[styles.marginVS]}>
          <View style={styles.mapContainer}>
            {position.latitude !== undefined ? (
              <>
                <MapView
                  provider={PROVIDER_GOOGLE}
                  initialRegion={regionFrom(position)}
                  onMapReady={() => setMapReady(true)}
                  showsUserLocation
                  showsMyLocationButton
                  onPoiClick={(e) => {
                    console.log(e.nativeEvent);
                    setMarkCoord(e.nativeEvent.coordinate);
                    setPosition(regionFrom(e.nativeEvent.coordinate));
                    setMapsData(e.nativeEvent);
                  }}
                  onPress={(e) => {
                    setMarkCoord(e.nativeEvent.coordinate);
                    setMapsData(e.nativeEvent.coordinate);
                  }}
                  style={styles.map}>
                  {console.log(regionFrom(position))}
                  {mapReady ? (
                    <Marker
                      draggable
                      coordinate={markCoord}
                      onDragEnd={(e) => setMarkCoord(e.nativeEvent.coordinate)}
                    />
                  ) : null}
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
            mapsData.name
              ? goToMaps(
                  mapsData.coordinate.longitude,
                  mapsData.coordinate.latitude,
                  mapsData.placeId,
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
            {mapsData.name
              ? mapsData.name
              : `Latitude: ${mapsData.latitude}\nLongitude: ${mapsData.longitude} `}
          </Text>
          <Icon
            name="map-marked-alt"
            size={24}
            style={styles.marginHS}
            color={colors.primary}
          />
        </TouchableOpacity>

        <View style={[styles.marginVS]}>
          <ButtonView title="Minta Jemput" dark onPress={() => {}} />
        </View>
        <View style={styles.marginVM} />
      </ScrollView>
    </View>
  );
};

export default Jemput;
