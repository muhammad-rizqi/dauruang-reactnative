import React from 'react';
import LottieView from 'lottie-react-native';
import QRCode from 'react-native-qrcode-svg';

export default class BasicExample extends React.Component {
  render() {
    return (
      <>
        <QRCode
          size={200}
          value='
          {
    "id": "number",
    "nama_lengkap": "string",
    "email": "string <email>",
    "telepon": "string",
    "lokasi": "string",
    "avatar": "string <uri>",
}
          '
        />
        <LottieView source={require('./animation.json')} autoPlay loop />
      </>
    );
  }
}
