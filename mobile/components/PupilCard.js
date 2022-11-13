import { View, Image, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { COLORS, SIZES, SHADOWS, assets, FONTS } from '../constants'
import React from 'react'
const PupilCard = ({data}) => {
    const navigation = useNavigation();

    const styles = StyleSheet.create({
        container:{
            width:"90%",
            alignSelf:'center',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: COLORS.white,
            padding:20,
            margin:20,
            marginBottom: 20,
            aspectRatio: 4/3,
            // height: "35%",    
            borderRadius: 14,
            ...SHADOWS.dark
        },
        imgContainer:{
            width: "50%", aspectRatio: 1,
            alignSelf:'center',
        },
        infoContainer:{
            alignSelf:'center',
            paddingLeft: "5%",
            width: "60%",
            marginLeft: "10%",
            borderLeftWidth: 2
        },
        infoLine:{
            flexDirection: 'row',
            marginBottom: 20,
        },
        circleImg:{
            width: "80%", aspectRatio: 1, borderRadius: 150
        },
        infoText:{
            marginLeft: 20,
            fontSize: SIZES.large,
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
    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Image 
                    source={data.image?{uri:data.image}:assets.account}
                    resizeMode='cover'
                    style={styles.circleImg}
                />
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.infoLine}>
                    <Image size={40} source={assets.account} style={styles.icon}/>
                    <View>
                        <Text style={styles.infoHeaderText}>Full Name</Text>
                        <Text style={styles.infoText}> {data.name} </Text>
                    </View> 
                </View>
                <View style={styles.infoLine}>
                    <Image size={40} source={assets.classes} style={styles.icon}/>
                    <View>
                        <Text style={styles.infoHeaderText}>Class</Text>
                        <Text style={styles.infoText}> {data.class} </Text>
                    </View> 
                </View>
                <View style={styles.infoLine}>
                    <Image size={40} source={assets.teacher} style={styles.icon}/>
                    <View>
                        <Text style={styles.infoHeaderText}>Hoomroom Teacher</Text>
                        <Text style={styles.infoText}> {data.teacher} </Text>
                    </View> 
                </View>
                <View style={styles.infoLine}>
                    <Image size={40} source={assets.calendar} style={styles.icon}/>
                    <View>
                        <Text style={styles.infoHeaderText}>Birthday</Text>
                        <Text style={styles.infoText}> {data.dateofbirth} </Text>
                    </View> 
                </View>
            </View>
        </View>
    )
}

export default PupilCard