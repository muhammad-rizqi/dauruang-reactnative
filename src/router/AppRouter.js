import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text} from 'react-native';
import {ForgotPassword, Login, Register} from '../screen';

const Stack = createStackNavigator();

const AppRouter = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode={false}
        screenOptions={{animationEnabled: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
