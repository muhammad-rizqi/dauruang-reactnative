import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppRouter from './src/router/AppRouter';
import {colors} from './src/style/styles';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={colors.primary} />
      <AppRouter />
    </Provider>
  );
};

export default App;
