import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import PaymentScreen from '../Screen/PaymentScreen';
import SuccessScreen from '../Screen/SuccessScreen';
import FailureScreen from '../Screen/FailureScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Success" component={SuccessScreen} />
      <Stack.Screen name="Failure" component={FailureScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
