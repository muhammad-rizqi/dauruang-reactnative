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
  QRScreen,
  ScanQR,
} from '../screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {changeToken, setUser} from '../redux/action';
import {profile} from '../services/endpoint/authServices';
import LottieView from 'lottie-react-native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AppRouter = () => {
  const [splash, setSplash] = useState(true);
  const {token, user} = useSelector((state) => state);
  const dispatch = useDispatch();

  const getTokenStorage = () => {
    console.log('getting token');
    AsyncStorage.getItem('token')
      .then((data) => {
        if (data !== null) {
          dispatch(changeToken(data));
          getProfile();
        } else {
          setSplash(false);
        }
      })
      .catch(() => setSplash(false));
  };

  const getProfile = () => {
    profile()
      .then((res) => {
        if (res.code === 200) {
          dispatch(setUser(res.data.user));
          setSplash(false);
        }
      })
      .catch((e) => {
        console.log(e);
        setSplash(false);
      });
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
        ) : user.role ? (
          <>
            {user.role === 1 ? (
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
              </>
            ) : user.role === 2 ? (
              <>
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
                <Stack.Screen name="ScanQR" component={ScanQR} />
              </>
            ) : user.role === 3 ? (
              <>
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
              </>
            ) : null}
            <Stack.Screen name="Settings" component={UpdateProfile} />
            <Stack.Screen name="ChatList" component={ChatList} />
            <Stack.Screen name="ChatItem" component={ChatItem} />
            <Stack.Screen name="QRScreen" component={QRScreen} />
          </>
        ) : (
          <Stack.Screen name="Penjualan">
            {() => (
              <LottieView
                source={require('../assets/lottie/offline.json')}
                autoPlay
                loop
              />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
