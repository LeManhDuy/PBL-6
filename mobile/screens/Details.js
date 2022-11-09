import { SafeAreaView, View, StyleSheet, Image } from "react-native"
import React from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { assets, COLORS, FONTS, SIZES } from "../constants";
import {useState, useEffect} from 'react'
import AccountService from "../config/service/AccountService";
// import AsyncStorageManager from "../config/service/AsyncStorageManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Details = ({parentInfo}) => {

    // useEffect(()=>{
    //     console.log('PPP',parentInfo)
    // }, [])

    const styles = StyleSheet.create({
        infoContainer:{
            padding: 20,
            width:"75%",
            alignSelf:'center',
            alignItems:'center'
        },
        circleImg:{
            width: 250, height: 250, borderRadius: 250/ 2
        },
        infoContainer2:{
            padding:30,
            // backgroundColor: COLORS.gray,
            width: "100%",
            justifyContent:'center'
        },
        infoLine:{
            padding: 10,
            flexDirection: 'row',
            marginBottom: 20,
            // backgroundColor: `#ff7f50`,
            borderBottomWidth: 2,
            borderColor: `#000000`
        },
        infoText:{
            marginLeft: 20,
            fontSize: SIZES.extraLarge,
        },
        infoHeaderText:{
            marginLeft: 25,
            fontSize: SIZES.medium,
            opacity: 0.5
        },
        icon:{
            alignSelf:'center'
        }
    })
    if(parentInfo){

        return (
            <SafeAreaView>
                <View style={styles.infoContainer}>
                <Image 
                    source={parentInfo?{uri:parentInfo.img}:assets.account  }
                    style={styles.circleImg} 
                    />
                <View style={styles.infoContainer2}>
                    <View style={styles.infoLine}>
                        <Image size={40} source={assets.account} style={styles.icon}/>
                        <View>
                            <Title style={styles.infoHeaderText}>Full Name</Title>
                            <Title style={styles.infoText}> {parentInfo.name} </Title>
                        </View> 
                    </View>
                    <View style={styles.infoLine}>
                        <Image size={40} source={assets.phone} style={styles.icon}/>
                        <View>
                            <Title style={styles.infoHeaderText}>Phone Number</Title>
                            <Title style={styles.infoText}> {parentInfo.phone} </Title>
                        </View> 
                    </View>
                    <View style={styles.infoLine}>
                        <Image size={40} source={assets.calendar} style={styles.icon}/>
                        <View>
                            <Title style={styles.infoHeaderText}>Birthday</Title>
                            <Title style={styles.infoText}> {parentInfo.birth} </Title>
                        </View> 
                    </View>
                    <View style={styles.infoLine}>
                        <Image size={40} source={assets.email} style={styles.icon}/>
                        <View>
                            <Title style={styles.infoHeaderText}>Email</Title>
                            <Title style={styles.infoText}> {parentInfo.email} </Title>
                        </View> 
                    </View>
                    
                </View>
            </View>
            </SafeAreaView>
        )
    }
}

export default Details