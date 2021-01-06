/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  ToastAndroid,
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
import Logo from '../../assets/img/logo.svg';
import {register} from '../../services/endpoint/registerServices';
import {reverseGeo} from '../../services/API/geolocation';

const Register = (props) => {
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
            setPosition(result.coords);
            setMarkCoord(result.coords);
            reverseLocation(result.coords);
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

  const reverseLocation = (coord, place) => {
    console.log(place);
    reverseGeo(coord)
      .then((res) => res.json())
      .then((response) => {
        // console.log(response);
        setMapsData({
          latitude: response.lat,
          longitude: response.lon,
          place_id: place ? place.placeId : response.place_id,
          name: place ? place.name : response.display_name,
        });
      })
      .catch((e) => console.error(e));
  };

  const onClickRegister = () => {
    register('halo', 'halo');
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <View style={[styles.backgroundLight, styles.flex1]}>
      <ScrollView style={[styles.container]}>
        <View>
          <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
            <Icon name="chevron-left" size={20} color={colors.primary} />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.marginVM} />
        <View style={[styles.row, styles.centerCenter, styles.marginVS]}>
          <Logo width={52} height={52} />
          <View style={[styles.flex1, styles.marginHS]}>
            <Text style={[styles.textH2, styles.textPrimary]}>Buat akun</Text>
            <Text>Jadilah bagian dari kami</Text>
          </View>
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
        <View style={[styles.centerItem, styles.marginVS]}>
          <InputView
            placeholder="Kata Sandi"
            type="number-pad"
            name="eye-off"
            secure
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
                    setMarkCoord(e.nativeEvent.coordinate);
                    setPosition(regionFrom(e.nativeEvent.coordinate));
                    reverseLocation(e.nativeEvent.coordinate, e.nativeEvent);
                  }}
                  onPress={(e) => {
                    setMarkCoord(e.nativeEvent.coordinate);
                    reverseLocation(e.nativeEvent.coordinate);
                  }}
                  style={styles.map}>
                  {mapReady ? (
                    <Marker
                      draggable
                      coordinate={markCoord}
                      onDragEnd={(e) => {
                        setMarkCoord(e.nativeEvent.coordinate);
                        reverseLocation(e.nativeEvent.coordinate);
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
            mapsData.name
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
          <ButtonView
            title="Mendaftar"
            dark
            onPress={() => onClickRegister()}
          />
        </View>
        <Text style={styles.textCenter}>
          Dengan mendaftar, Anda menyetujui Persyaratan, Kebijakan Data, dan
          Kebijakan Layanan kami.
        </Text>
        <View style={[styles.centerItem, styles.marginVXL]}>
          <Text
            style={[styles.textMedium, styles.textCenter]}
            onPress={() => props.navigation.goBack()}>
            {'Sudah memiliki akun? \n Masuk'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;
