import React, {Component} from 'react';
import {
  PermissionsAndroid,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

class Maps extends Component {
  constructor() {
    super();
    this.state = {
      location: null,
      permission: false,
      x: {},
      region: null,
      isReady: false,
      data: {},
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
        console.log('getposisi');
        console.log(position);
        this.setState({
          location: position,
          region: this.regionFrom(position),
          x: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
        ToastAndroid.show(error.message, ToastAndroid.LONG);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  regionFrom(position) {
    console.log(position);
    const {latitude, longitude, accuracy} = position.coords;
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
  }

  componentDidMount() {
    this.requestCameraPermission();
  }
  componentDidUpdate() {
    console.log('ini kordinat');
    console.log(this.state.x);
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          {this.state.location !== null ? (
            <>
              <MapView
                provider={PROVIDER_GOOGLE}
                region={this.state.region}
                onMapReady={() => this.setState({isReady: true})}
                showsUserLocation
                showsMyLocationButton
                onPress={(e) => this.setState({x: e.nativeEvent.coordinate})}
                onRegionChangeComplete={(region) =>
                  this.setState({region: region})
                }
                onPoiClick={(e) => {
                  console.log(e.nativeEvent);
                  this.setState({
                    x: e.nativeEvent.coordinate,
                    data: e.nativeEvent,
                  });
                }}
                style={styles.map}>
                {/* {this.state.isReady ? (
                  <Marker
                    draggable
                    coordinate={this.state.x}
                    onDragEnd={(e) =>
                      this.setState({x: e.nativeEvent.coordinate})
                    }
                  />
                ) : null} */}
              </MapView>
            </>
          ) : null}
        </View>
        <Text> {JSON.stringify(this.state.data)} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Maps;
