import {SafeAreaView, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React, { useEffect } from 'react';
import OpenScreen from './screens/OpenScreen';
import { TailwindProvider } from 'tailwindcss-react-native';
import Connect from './screens/Connect';
import Login from './screens/Login';
import OpenDashboard from './screens/OpenDashboard';


const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <TailwindProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="OpenScreen" component={OpenScreen} />
            <Stack.Screen name="Connect" component={Connect} />
            <Stack.Screen name="OpenDashboard" component={OpenDashboard} />
          </Stack.Navigator>
        </NavigationContainer>
    </TailwindProvider>
  );
};
export default App;
