import { View, Image, Text, StyleSheet,TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { scale, moderateScale } from 'react-native-size-matters';
import { COLORS, SIZES, SHADOWS, assets, FONTS } from '../constants'
import React from 'react'
const NotificationCard = (props) => {

    const styles = StyleSheet.create({
        container:{
            width:"90%",
            alignSelf:'center',
            justifyContent: 'center',
            backgroundColor: COLORS.white,
            padding: 20,
            margin: 15,
            marginBottom: 5,
            height: moderateScale(100, 0.5),
            borderRadius: 14,
            ...SHADOWS.dark
        },
        titleContainer:{
            justifyContent: 'space-evenly',
            // top: -20,
            borderBottomWidth: 2
        },
        dateText:{
            color: '#fd5d5d',
            fontWeight: 'bold',
            fontSize: scale(10)
        },
        titleText: {
            fontWeight: 'bold',
            color: '#1473e6',
            fontSize: scale(12)
        },
        contentText: {
            color: COLORS.gray,
            fontSize: scale(12)
        },
        contactText: {
            color: '#1473e6',
            fontSize: scale(12),
            fontWeight: 'bold'
        }
    })
    return (
        <TouchableOpacity style={styles.container} onPress={props.handleShowDetail}>
            <View style={styles.titleContainer}>
                    {!props.isPublic? 
                    <View>
                        <Text style={styles.contactText}>
                            {props.data.sender? 'To: '+props.data.teacherName: 'From: '+props.data.teacherName}
                        </Text>
                    </View> 
                    : null
                    }
                    <View>
                        <Text style={styles.dateText}> {new Date(props.data.date).toLocaleString()} </Text>
                    </View> 
                    <View>
                        <Text style={styles.titleText}> {props.data.title} </Text>
                    </View>
            </View>
        </TouchableOpacity>
    )
}

export default NotificationCard