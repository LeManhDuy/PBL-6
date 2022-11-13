import { View, Image, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { COLORS, SIZES, SHADOWS, assets, FONTS } from '../constants'
import React from 'react'
const NotificationCard = ({data, isPublic}) => {

    const styles = StyleSheet.create({
        container:{
            width:"90%",
            alignSelf:'center',
            justifyContent: 'center',
            backgroundColor: COLORS.white,
            padding: 20,
            margin: 15,
            marginBottom: 5,
            height: 175,
            borderRadius: 14, 
            ...SHADOWS.dark
        },
        titleContainer:{
            justifyContent: 'space-evenly',
            top: -20,
            borderBottomWidth: 2
        },
        dateText:{
            color: '#fd5d5d',
            fontWeight: 'bold',
            fontSize: SIZES.medium
        },
        titleText: {
            fontWeight: 'bold',
            color: '#1473e6',
            fontSize: SIZES.large
        },
        contentText: {
            color: COLORS.gray,
            fontSize: SIZES.large
        },
        contactText: {
            color: '#1473e6',
            fontSize: SIZES.large,
            fontWeight: 'bold'
        }
    })
    // console.log('isPublic',isPublic)
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                    {!isPublic? 
                    <View>
                        <Text style={styles.contactText}>{data.sender? 'To: '+data.teacherName: 'From: '+data.teacherName}</Text>
                    </View> 
                    : null
                    }
                    <View>
                        <Text style={styles.dateText}> {new Date(data.date).toLocaleString()} </Text>
                    </View> 
                    <View>
                        <Text style={styles.titleText}> {data.title} </Text>
                    </View>
            </View>
            <View>
                    <View>
                        <Text style={styles.contentText}> {data.content} </Text>
                    </View> 
            </View>
        </View>
    )
}

export default NotificationCard