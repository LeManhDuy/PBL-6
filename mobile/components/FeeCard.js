import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { scale, moderateScale } from 'react-native-size-matters';
import { COLORS, SHADOWS } from '../constants'
import React from 'react'
const FeeCard = ({data}) => {

    const styles = StyleSheet.create({
        container: {
            width: "90%",
            alignSelf: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.white,
            padding: 10,
            margin: 10,
            height: moderateScale(200, 0.5),
            borderRadius: 20,
            ...SHADOWS.dark
        },
        titleContainer:{
            width: "95%"
        },
        feeName:{
            // width: '95%',
            borderBottomWidth: 2,
            borderBottomColor: '#fd5d5d',
        },
        feeNameText:{
            fontSize: scale(20),
            fontWeight: 'bold',
            color: '#fd5d5d',
        },
        pupilContainer:{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: scale(12)
        },
        pupilTextLabel:{
            fontSize: scale(10),
            fontWeight: 'bold',
            color: '#1473e6',
        },
        pupilText:{
            fontSize: scale(10),
            color: '#1473e6',
        },
        infoLine:{
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        contentText: {
            color: COLORS.gray,
            fontSize: scale(13)
        },
        infoText: {
            color: '#1473e6',
            fontSize: scale(16),
            // fontWeight: 'bold'
        },
        infoTextLabel: {
            color: '#1473e6',
            fontSize: scale(16),
            fontWeight: 'bold'
        }
    })
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <View style={styles.feeName}>
                    <Text style={styles.feeNameText}>Fee: {data.fee_name} </Text>
                </View>
                <View style={styles.pupilContainer}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.pupilTextLabel}> Name:</Text>
                        <Text style={styles.pupilText}> {data.name} </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.pupilTextLabel}> Class:</Text>
                        <Text style={styles.pupilText}> {data.class} </Text>
                    </View>
                </View>
                <View style={styles.infoLine}>
                    <Text style={styles.infoTextLabel}> Amount </Text>
                    <Text style={styles.infoText}> {data.fee_amount} </Text>
                </View>
                <View style={styles.infoLine}>
                    <Text style={styles.infoTextLabel}> Status </Text>  
                    <Text style={styles.infoText}> {data.fee_status} </Text>
                </View>
                {data.fee_status=='Paid'?
                <View style={styles.infoLine}>
                    <Text style={styles.infoTextLabel}> Paid Date </Text>
                    <Text style={styles.infoText}> {data.paid_date} </Text>
                </View>: null}
                <View style={styles.infoLine}>
                    <Text style={styles.infoTextLabel}> Start Date </Text>
                    <Text style={styles.infoText}> {data.start_date} </Text>
                </View>
                <View style={styles.infoLine}>
                    <Text style={styles.infoTextLabel}> End Date </Text>
                    <Text style={styles.infoText}> {data.end_date} </Text>
                </View>
            </View>
        </View>
    )
}

export default FeeCard