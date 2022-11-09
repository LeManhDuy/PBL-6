import { useFonts } from 'expo-font';
import Home from './screens/Home'
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect} from 'react'

const Stack = createStackNavigator();


export default function App() {
    const [initalRoute, setInitialRoute] = useState('Login')
    const [store, setStore] = useState()
    const [loaded] = useFonts({
      InterBold: require('./assets/fonts/Inter-Bold.ttf'),
      InterSemiBold: require('./assets/fonts/Inter-SemiBold.ttf'), 
      InterMedium: require('./assets/fonts/Inter-Medium.ttf'), 
      InterLight: require('./assets/fonts/Inter-Light.ttf'), 
      InterRegular: require('./assets/fonts/Inter-Regular.ttf'),  
    });
    useEffect(() => {
      getInitialState();
    }, []);

  const getInitialState = async () => {
    try {
      const isLogin = await AsyncStorage.getItem('@Login')
      if(isLogin!==null){
        setInitialRoute('Home')
      }else{
        setInitialRoute('Login')
      }
      console.log('Login',isLogin)
    } catch(e) {
      console.log(e)
    }
  }


  if (!loaded) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initalRoute} screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

