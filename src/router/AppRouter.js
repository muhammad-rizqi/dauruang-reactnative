import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  DashboardNasabah,
  ForgotPassword,
  Intro,
  Login,
  Register,
  Splash,
} from '../screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const AppRouter = () => {
  const [splash, setSplash] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('token', (e, data) => {
        setToken(data);
      });
      setSplash(false);
    }, 1000);
  }, []);

  if (splash) {
    return <Splash />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode={false}
        screenOptions={{animationEnabled: false}}>
        {token ? (
          <>
            <Stack.Screen name="Intro" component={Intro} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </>
        ) : (
          <Stack.Screen name="Nasabah" component={DashboardNasabah} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
