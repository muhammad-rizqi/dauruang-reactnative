import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  ToastAndroid,
  Linking,
  Alert,
  TouchableOpacity,
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

const Register = () => {
  const [, setEmail] = useState('');
  const [position, setPosition] = useState({});
  const [mapReady, setMapReady] = useState(false);
  const [markCoord, setMarkCoord] = useState({});
  const [mapsData, setMapsData] = useState({});

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
        <View>
          <TouchableWithoutFeedback>
            <Icon name="chevron-left" size={26} color={colors.primary} />
          </TouchableWithoutFeedback>
        </View>
        <View style={[styles.marginVXL]}>
          <Text style={[styles.textH2, styles.textPrimary]}>Buat akun</Text>
          <Text>Jadilah bagian dari kami</Text>
        </View>
        <View style={[styles.centerItem, styles.marginVS]}>
          <InputView placeholder="Nama Lengkap" />
        </View>
        <View style={[styles.centerItem, styles.marginVS]}>
          <InputView placeholder="Email" onChangeText={(e) => setEmail(e)} />
        </View>
        <View style={[styles.centerItem, styles.marginVS]}>
          <InputView placeholder="Nomor Telepon" type="number-pad" />
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
              Alamat
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
          }}>
          <Text
            style={[styles.textPrimary, styles.textMedium, styles.marginVM]}>
            {mapsData.name
              ? mapsData.name
              : `latitude: ${mapsData.latitude}\nlongitude: ${mapsData.longitude} `}
          </Text>
        </TouchableOpacity>

        <View style={[styles.centerItem, styles.marginVS]}>
          <InputView
            placeholder="Kata Sandi"
            type="number-pad"
            name="eye-off"
            secure
          />
        </View>
        <View style={[styles.marginVS]}>
          <ButtonView title="Mendaftar" dark onPress={() => {}} />
        </View>
        <View style={[styles.centerItem, styles.marginVM]}>
          <Text style={[styles.textMedium, styles.textCenter]}>
            {'Sudah memiliki akun? \n Masuk'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;
