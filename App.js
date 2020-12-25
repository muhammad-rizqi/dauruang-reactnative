import React, {useState} from 'react';
import {View, Text, StatusBar, TouchableNativeFeedback} from 'react-native';
import {colors, styles} from './src/style/styles';
import Logo from './src/assets/img/logo.svg';
import LottieView from 'lottie-react-native';

const App = () => {
  const [loading, setLoading] = useState(false);
  return (
    <View style={[styles.flex1, styles.backgroundLight]}>
      <StatusBar backgroundColor={colors.primary} />
      <View style={[styles.flex1, styles.centerCenter]}>
        <Logo width={200} height={200} />
        <Text style={styles.textH1}>Daur Uang</Text>
      </View>
      <View style={styles.marginHXL}>
        <View style={styles.marginVM}>
          <TouchableNativeFeedback onPress={() => setLoading(!loading)}>
            <View style={styles.button}>
              {loading ? (
                <LottieView
                  source={require('./src/assets/lottie/8308-loading.json')}
                  autoPlay
                  loop
                  style={styles.lottieButton}
                />
              ) : (
                <Text style={styles.textMedium}>MASUK</Text>
              )}
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </View>
  );
};

export default App;
