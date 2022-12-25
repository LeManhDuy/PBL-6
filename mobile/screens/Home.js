import React, { useState, useEffect } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Details from './Details';
import ListPupils from './ListPupils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Schedule from './Schedule';
import Score from './Score';
import Fee from './Fee';
import { CustomDrawer } from '../components';
import AccountService from '../config/service/AccountService';
import { IconButton } from 'react-native-paper';
import { scale } from 'react-native-size-matters';
import SendNotice from './SendNotice'
import Notifications from './Notifications'
import NotificationStack from './NotificationStack';

const Home = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [state, setState] = useState(true)
  const [parentInfo, setParentInfo] = useState()

    useEffect(() => {
        checkLogin()
        getParentInfo()
    }, [state])

    const getParentInfo = async () => {
        const account_data = JSON.parse(await AsyncStorage.getItem('@Login'))
        if (account_data) {
            console.log('log', account_data)
            AccountService.GetParentsInformation(account_data.AccountId)
                .then((response) => {
                    // console.log('2',response.getParentInfor)
                    const item = response.getParentInfor[0]
                    // console.log('3',item.person_id)
                    const dataSources = {
                        key: 1,
                        id: item._id,
                        name: item.person_id.person_fullname,
                        img: item.person_id.person_image,
                    }
                    console.log('d', dataSources)
                    setParentInfo(dataSources);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

  const checkLogin = async () => {
    const i = await AsyncStorage.getItem("@Login")
    setIsLogin(i !== null)
  }
  
  
  // console.log(parentInfo)
  if (isLogin) {
    // console.log("ss",pupilsInfo)
    const Drawer = createDrawerNavigator();
    return (
      <Drawer.Navigator initialRouteName="Details"
        drawerContent = {(props) => <CustomDrawer {...props} accountInfo={parentInfo} />
      }
        screenOptions={{
          drawerActiveTintColor:'#2596BE',
          drawerLabelStyle: {marginLeft:-scale(25)},
          headerTintColor: '#1A5CAC'
        }}
        >
          <Drawer.Screen name="Details" component={Details} 
            options={{
              drawerIcon: ({color}) => {
                return(
                  <IconButton icon='account-details' color={color} size={scale(16)}/>
                )
              },
            }}
          />
          <Drawer.Screen name="Pupils" component={ListPupils} 
            options={{
              drawerIcon: ({color}) => {
                return(
                  <IconButton icon='account-child' color={color} size={scale(16)}/>
                )
              }
            }}
          />
          <Drawer.Screen name="Notification" component={NotificationStack} 
            options={{
              drawerIcon: ({color}) => {
                return(
                  <IconButton icon='bell' color={color} size={scale(16)}/>
                )
              }
            }}
          />
          <Drawer.Screen name="Schedule" component={Schedule} 
            options={{
              drawerIcon: ({color}) => {
                return(
                  <IconButton icon='timetable' color={color} size={scale(16)}/>
                )
              }
            }}
          />
          <Drawer.Screen name="Score" component={Score} 
            options={{
              drawerIcon: ({color}) => {
                return(
                  <IconButton icon='star' color={color} size={scale(16)}/>
                )
              }
            }}
          />
          <Drawer.Screen name="Fee" component={Fee} 
            options={{
              drawerIcon: ({color}) => {
                return(
                  <IconButton icon='cash' color={color} size={scale(16)}/>
                )
              }
            }}
          />
      </Drawer.Navigator>
    )
  }
}

export default Home