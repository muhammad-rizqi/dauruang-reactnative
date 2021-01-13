import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  ToastAndroid,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonView from '../../components/ButtonView';
import InputView from '../../components/InputView';
import {regionFrom, goToMaps} from '../../helper/MapsHelper';
import {colors, styles} from '../../style/styles';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {reverseGeo} from '../../services/API/geolocation';
import {changeAvatar, updateProfile} from '../../services/endpoint/user';
import {profile} from '../../services/endpoint/authServices';
import {setUser} from '../../redux/action';
import {launchImageLibrary} from 'react-native-image-picker';

const UpdateProfile = ({navigation}) => {
  const {user} = useSelector((state) => state);
  const [mapReady, setMapReady] = useState(false);
  const [markCoord, setMarkCoord] = useState(JSON.parse(user.lokasi));
  const [mapsData, setMapsData] = useState(JSON.parse(user.lokasi));

  const [name, setName] = useState(user.nama_lengkap);
  const [phone, setPhone] = useState(user.telepon);
  const [email, setEmail] = useState(user.email);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState({uri: user.avatar});
  const dispatch = useDispatch();
  const [imageLoading, setImageLoading] = useState(false);

  const reverseLocation = (coord, place) => {
    reverseGeo(coord)
      .then((res) => res.json())
      .then((response) => {
        setMapsData({
          latitude: Number.parseFloat(response.lat),
          longitude: Number.parseFloat(response.lon),
          place_id: place ? place.placeId : null,
          name: place ? place.name : response.display_name,
        });
      })
      .catch((e) => {
        console.error(e);
        ToastAndroid.show(e.message, ToastAndroid.LONG);
      });
  };

  const updateData = async () => {
    const res = await profile();
    res.code === 200 ? dispatch(setUser(res.data.user)) : null;
  };
  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    launchImageLibrary(options, (response) => {
      if (response.uri) {
        console.log(response);
        setPhoto(response);
        setImageLoading(true);
        changeAvatar(user.id, response)
          .then((result) => {
            console.log(result);
            if (result.code === 200) {
              updateData();
              ToastAndroid.show('Berhasil diupdate', ToastAndroid.LONG);
            } else {
              setPhoto({uri: user.avatar});
            }
          })
          .catch((err) => {
            console.log(err);
            setPhoto({uri: user.avatar});
          })
          .finally(() => setImageLoading(false));
      }
    });
  };

  const onClickUpdate = async () => {
    if ((name, email, phone, mapsData)) {
      setLoading(true);
      try {
        const resUpdate = await updateProfile(
          user.id,
          name,
          email,
          phone,
          mapsData,
        );
        if (resUpdate.code === 200) {
          setLoading(false);
          updateData();
          ToastAndroid.show('Berhasil diupdate', ToastAndroid.LONG);
          navigation.goBack();
        } else {
          ToastAndroid.show('Gagal diupdate', ToastAndroid.LONG);
        }
      } catch (error) {
        console.log(error);
        ToastAndroid.show('Kesalahan koneksi', ToastAndroid.LONG);
        setLoading(false);
      }
    } else {
      ToastAndroid.show('Harap isi dengan benar', ToastAndroid.LONG);
    }
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
            Update Profile
          </Text>
        </View>
        <View style={styles.marginVM} />
        <TouchableOpacity
          onPress={handleChoosePhoto}
          style={styles.widthScreenBox}>
          <ImageBackground
            source={photo}
            style={[styles.flex1, styles.centerCenter]}>
            {imageLoading ? (
              <ActivityIndicator color={colors.tertiary} size="large" />
            ) : null}
          </ImageBackground>
        </TouchableOpacity>
        <View style={[styles.centerItem, styles.marginVS]}>
          <InputView
            placeholder="Nama Lengkap"
            value={name}
            onChangeText={(inputName) => setName(inputName)}
          />
        </View>
        <View style={[styles.centerItem, styles.marginVS]}>
          <InputView
            placeholder="Email"
            value={email}
            onChangeText={(inputEmail) => setEmail(inputEmail)}
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
                    setMarkCoord(e.nativeEvent.coordinate);
                    const {coordinate, placeId} = e.nativeEvent;
                    setMapsData({
                      latitude: coordinate.latitude,
                      longitude: coordinate.longitude,
                      place_id: placeId,
                      name: e.nativeEvent.name,
                    });
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
          <ButtonView
            title="Update Profile"
            dark
            onPress={onClickUpdate}
            loading={loading}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;
