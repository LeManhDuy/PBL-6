import { useFonts } from 'expo-font';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import { createStackNavigator, Header } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect} from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import Details from './screens/Details';
import ListPupils from './screens/ListPupils';
import Notifications from './screens/Notifications';
import SendNotice from './screens/SendNotice';
import Schedule from './screens/Schedule';
import Score from './screens/Score'
import Fee from './screens/Fee';
import { CustomDrawer } from './components';
import Home from './screens/Home';
// import { Text, View } from 'react-native';

const Stack = createStackNavigator();


export default function App() {
    const [initalRoute, setInitialRoute] = useState('Login')
    const [statusKeyLoaded, setStatusKeyLoaded] = useState(false)
    const [state, setState] = useState(false);
    useEffect(() => {
      getInitialState();
    }, [state]);

  const getInitialState = async () => {
    try {
      const isLogin = await AsyncStorage.getItem('@Login')
      if(isLogin!==null){
        setInitialRoute('Home')
      }
      setStatusKeyLoaded(true)
      console.log('Login',isLogin)
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <>{statusKeyLoaded && (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initalRoute} screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
    )}
    </>
  );
}

