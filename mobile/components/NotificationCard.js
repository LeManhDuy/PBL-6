import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { scale, moderateScale } from 'react-native-size-matters';
import { COLORS, SHADOWS } from '../constants'
import React from 'react'
const NotificationCard = (props) => {

    const styles = StyleSheet.create({
        container: {
            width: "90%",
            alignSelf: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.white,
            padding: 10,
            margin: 10,
            height: moderateScale(100, 0.5),
            borderRadius: 20,
            ...SHADOWS.dark
        },
        titleContainer: {
            justifyContent: 'space-evenly',
        },
        dateText: {
            color: '#fd5d5d',
            fontWeight: 'bold',
            fontSize: scale(12)
        },
        containerText: {
            textAlign: 'left',
        },
        titleText: {
            textAlign: 'left',
            fontWeight: 'bold',
            color: '#1473e6',
            fontSize: scale(13)
        },
        contentText: {
            color: COLORS.gray,
            fontSize: scale(13)
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
                {!props.isPublic ?
                    <View>
                        <Text style={styles.contactText}>
                            {props.data.sender ? 'To: ' + props.data.teacherName : 'From: ' + props.data.teacherName}
                        </Text>
                    </View>
                    : null
                }
                <View>
                    <Text style={styles.dateText}> {new Date(props.data.date).toLocaleString()} </Text>
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.titleText}> {props.data.title} </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default NotificationCard