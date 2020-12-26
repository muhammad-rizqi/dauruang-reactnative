import {Alert, Linking, PermissionsAndroid} from 'react-native';

export const requestLocationPermission = async () => {
  console.log('requesting');
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

export const regionFrom = (position) => {
  const {latitude, longitude} = position;
  const accuracy = position.accuracy ? position.accuracy : 20;
  const oneDegreeOfLongitudeInMeters = 111.32 * 70;
  const circumference = (40075 / 360) * 70;

  const latDelta = accuracy * (1 / (Math.cos(latitude) * circumference));
  const lonDelta = accuracy / oneDegreeOfLongitudeInMeters;

  return {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: Math.max(0, latDelta),
    longitudeDelta: Math.max(0, lonDelta),
  };
};

export const goToMaps = async (longitude, latitude, idPlace) => {
  const urlPlace = `https://www.google.com/maps/search/?api=1&query=${longitude},${latitude}&query_place_id=${idPlace}`;
  const url = `http://www.google.com/maps/place/${latitude},${longitude}`;
  console.error('terpanggil');

  const supported = await Linking.canOpenURL(idPlace ? urlPlace : url);

  if (supported) {
    await Linking.openURL(idPlace ? urlPlace : url);
  } else {
    Alert.alert(`Don't know how to open this URL: ${url}`);
  }
};
