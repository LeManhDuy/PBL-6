import React, { useState, useEffect } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Details from './Details';
import ListPupils from './ListPupils';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [state, setState] = useState(true)

  useEffect(() => {
    checkLogin()
  }, [state])

  const checkLogin = async () => {
    const i = await AsyncStorage.getItem("@Login")
    setIsLogin(i !== null)
  }
  if (isLogin) {
    // console.log("ss",pupilsInfo)
    const Drawer = createDrawerNavigator();
    return (
      <Drawer.Navigator useLegacyImplementation initialRouteName="Details"
        drawerContent={props => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem label="Logout" onPress={async () => {
                try {
                  await AsyncStorage.removeItem('@Login')
                  props.navigation.navigate("Login")
                }
                catch (err) {
                  console.log(err)
                }
              }} />
            </DrawerContentScrollView>
          )
        }}>
        <Drawer.Screen name="Details" component={Details} />
        <Drawer.Screen name="Pupils" component={ListPupils} />
      </Drawer.Navigator>
    )
  }
}

export default Home