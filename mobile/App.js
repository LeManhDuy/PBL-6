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
// import { Text, View } from 'react-native';

const Stack = createStackNavigator();


export default function App() {
    const [initalRoute, setInitialRoute] = useState('Login')
    const [statusKeyLoaded, setStatusKeyLoaded] = useState(false)
    useEffect(() => {
      getInitialState();
    }, []);

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
  const NotificationStack = () => {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator defaultScreenOptions={'Notifications'} screenOptions={{
        headerShown: false
      }}>
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="SendNotice" component={SendNotice} 
          />
      </Stack.Navigator>
    )
  }

  const HomeDrawer = () => {
    const Drawer = createDrawerNavigator();
    return (
      <Drawer.Navigator useLegacyImplementation initialRouteName="Details"
      drawerContent={props => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem label="Logout" onPress={async () =>{
                  try {
                      await AsyncStorage.removeItem('@Login')
                      props.navigation.navigate("Login")
                  }
                  catch(err) {
                      console.log(err)
                  }
              }} />
            </DrawerContentScrollView>
          )
        }}>
          <Drawer.Screen name="Details" component={Details}/>
          <Drawer.Screen name="Pupils" component={ListPupils} />
          <Drawer.Screen name="Notification" component={NotificationStack} />
          <Drawer.Screen name="Schedule" component={Schedule} />
          <Drawer.Screen name="Score" component={Score} />
      </Drawer.Navigator>
    )
  }


  return (
    <>{statusKeyLoaded && (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initalRoute} screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomeDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
    )}
    </>
  );
}

