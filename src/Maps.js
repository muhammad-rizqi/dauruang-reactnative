import React, {Component} from 'react';
import {
  PermissionsAndroid,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

class App extends Component {
  constructor() {
    super();
    this.state = {
      location: null,
      permission: false,
    };
  }

  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.getCurrentLocation();
      } else {
        console.log('Lokasi Tidak Diizinkan');
        ToastAndroid.show('Lokasi Tidak Diizinkan', ToastAndroid.LONG);
      }
    } catch (err) {
      console.warn(err);
    }
  }

  getCurrentLocation() {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        this.setState({location: position});
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
        ToastAndroid.show(error.message, ToastAndroid.LONG);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  regionFrom() {
    const {latitude, longitude, accuracy} = this.state.location.coords;
    const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
    const circumference = (40075 / 360) * 1000;

    const latDelta = accuracy * (1 / (Math.cos(latitude) * circumference));
    const lonDelta = accuracy / oneDegreeOfLongitudeInMeters;

    return {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: Math.max(0, latDelta),
      longitudeDelta: Math.max(0, lonDelta),
    };
  }

  componentDidMount() {
    this.requestCameraPermission();
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          {this.state.location !== null ? (
            <>
              <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                showsUserLocation={true}
                showsMyLocationButton={true}
                initialRegion={this.regionFrom()}
              />
              <Text> {JSON.stringify(this.regionFrom())} </Text>
            </>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;
