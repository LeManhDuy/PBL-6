import React from "react";
import {View, Text, ImageBackground, Image, TouchableOpacity} from 'react-native'
import { DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import { assets } from "../constants";
import { scale } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IconButton } from "react-native-paper";
const CustomDrawer = (props) =>{
    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView 
                {...props}
                >
                <ImageBackground 
                    source={require('../assets/image/DrawerBackground.png')}
                    style={{paddingBottom:scale(15),paddingLeft:scale(10)}}
                    >
                    <Image 
                        source={props.accountInfo ? { uri: props.accountInfo.img } : assets.account}
                        style={{height:scale(80),width:scale(80),borderRadius:scale(40),margin:scale(10)}}
                    />
                    <Text style={{color:'#FFFFFF',fontSize:scale(16),fontWeight:'bold'}}>
                        {props.accountInfo ? props.accountInfo.name: 'UserName'}
                    </Text>
                </ImageBackground>
                <DrawerItemList {...props}/>
            </DrawerContentScrollView>
            <View style={{paddingVertical:scale(15),paddingLeft:scale(10),borderTopWidth:1}}>
              <TouchableOpacity onPress={async () =>{
                  try {
                      await AsyncStorage.removeItem('@Login')
                      props.navigation.navigate("Login")
                  }
                  catch(err) {
                      console.log(err)
                  }
              }}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <IconButton icon='logout'/>
                    <Text style={{fontWeight:'bold'}}>Logout</Text>
                </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomDrawer