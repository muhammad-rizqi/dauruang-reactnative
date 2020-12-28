import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../../style/styles';
import ButtonView from '../../components/ButtonView';
import LottieView from 'lottie-react-native';

const Intro = (props) => {
  return (
    <View style={[styles.flex1, styles.backgroundLight]}>
      <View style={[styles.flex1]}>
        <LottieView
          source={require('../../assets/lottie/38217-money-growth.json')}
          autoPlay
          loop
        />
      </View>
      <View>
        <View style={[styles.centerItem]}>
          <Text
            style={[
              styles.textH2,
              styles.textCenter,
              styles.marginVM,
              styles.textPrimary,
            ]}>
            Tukar sampah jadi uang
          </Text>
        </View>
        <View style={styles.marginHXL}>
          <View style={styles.marginVM}>
            <ButtonView
              onPress={() => props.navigation.navigate('Login')}
              title="Masuk"
              dark
            />
          </View>
          <View style={styles.marginVM}>
            <ButtonView
              onPress={() => props.navigation.navigate('Register')}
              title="Daftar"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Intro;
