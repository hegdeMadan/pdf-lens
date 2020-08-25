import * as React from 'react';
import { Dimensions, StatusBar } from 'react-native'
import 'react-native-gesture-handler';
import Scanner from '../dashboard/scanner';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { screens } from './constants';
import { Home } from '../dashboard/home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { colors, sizes } from '../theme';
import DrawerComponent from '../dashboard/DrawerComponent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerStack = () => (
    <Drawer.Navigator
      edgeWidth={Dimensions.get('window').width}
      drawerContent={(props) => {
        return <DrawerComponent {...props} />
      }}
    >
      <Drawer.Screen
        name={screens.home}
        component={Home}
      />
      <Drawer.Screen
        name={screens.scanner}
        component={Scanner}
      />

      <Drawer.Screen
        name={screens.exportToPdf}
        component={Scanner}
      />
    </Drawer.Navigator>
  )

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.avatar} barStyle='white-content' />
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name={screens.dashboard} component={DrawerStack} />
        <Stack.Screen name={screens.scanner} component={Scanner} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
