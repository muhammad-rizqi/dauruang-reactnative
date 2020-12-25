import React from 'react';
import {View, Text, TouchableNativeFeedback} from 'react-native';
import {styles} from '../style/styles';
import LottieView from 'lottie-react-native';

const ButtonView = ({onPress, loading, title, dark, disabled}) => {
  return (
    <TouchableNativeFeedback
      disabled={loading ? true : disabled}
      onPress={() => onPress(!loading)}>
      <View
        style={[
          styles.button,
          dark ? styles.backgroundPrimary : styles.backgroundSecondary,
        ]}>
        {loading ? (
          <LottieView
            source={require('../assets/lottie/8308-loading.json')}
            autoPlay
            loop
            style={styles.lottieButton}
          />
        ) : (
          <Text
            style={[
              styles.textMedium,
              styles.textUppercase,
              styles.textCenter,
              styles.textWhite,
            ]}>
            {title}
          </Text>
        )}
      </View>
    </TouchableNativeFeedback>
  );
};

export default ButtonView;
