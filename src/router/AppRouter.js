/* eslint-disable react-hooks/exhaustive-deps */
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  DashboardNasabah,
  DashboardPenjualan,
  DashboardSetoran,
  ForgotPassword,
  Intro,
  Jemput,
  Jual,
  Login,
  PermintaanJemput,
  Register,
  Setoran,
  Splash,
  UpdateProfile,
  DrawerUser,
  ChatList,
  ChatItem,
} from '../screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {changeToken, setUser} from '../redux/action';
import {profile} from '../services/endpoint/authServices';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AppRouter = () => {
  const [splash, setSplash] = useState(true);
  const {token} = useSelector((state) => state);
  const dispatch = useDispatch();

  const getTokenStorage = () => {
    AsyncStorage.getItem('token')
      .then((data) => {
        dispatch(changeToken(data));
      })
      .catch(() => setSplash(false))
      .finally(() => getProfile());
  };

  const getProfile = () => {
    profile()
      .then((res) => {
        dispatch(setUser(res.data.user));
      })
      .catch((e) => console.log(e))
      .finally(() => setSplash(false));
  };

  useEffect(() => {
    setTimeout(() => {
      if (token === null || token === '') {
        getTokenStorage();
      }
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
        {token === '' || token === null ? (
          <>
            <Stack.Screen name="Intro" component={Intro} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </>
        ) : (
          <>
            <Stack.Screen name="Nasabah">
              {() => (
                <Drawer.Navigator
                  drawerContent={(props) => <DrawerUser {...props} />}>
                  <Drawer.Screen
                    name="DashboardNasabah"
                    component={DashboardNasabah}
                  />
                </Drawer.Navigator>
              )}
            </Stack.Screen>

            <Stack.Screen name="Jemput" component={Jemput} />
            <Stack.Screen name="Penyetoran">
              {() => (
                <Drawer.Navigator
                  drawerContent={(props) => <DrawerUser {...props} />}>
                  <Drawer.Screen
                    name="DashboardSetoran"
                    component={DashboardSetoran}
                  />
                </Drawer.Navigator>
              )}
            </Stack.Screen>
            <Stack.Screen
              name="PermintaanJemput"
              component={PermintaanJemput}
            />
            <Stack.Screen name="Setoran" component={Setoran} />
            <Stack.Screen name="Penjualan">
              {() => (
                <Drawer.Navigator
                  drawerContent={(props) => <DrawerUser {...props} />}>
                  <Drawer.Screen
                    name="DashboardPenjualan"
                    component={DashboardPenjualan}
                  />
                </Drawer.Navigator>
              )}
            </Stack.Screen>
            <Stack.Screen name="Jual" component={Jual} />
            <Stack.Screen name="Settings" component={UpdateProfile} />
            <Stack.Screen name="ChatList" component={ChatList} />
            <Stack.Screen name="ChatItem" component={ChatItem} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
