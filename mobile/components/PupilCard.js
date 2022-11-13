import { View, Image, Text, StyleSheet, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { COLORS, SIZES, SHADOWS, assets, FONTS } from '../constants'
import React from 'react'
const PupilCard = ({data}) => {
    const navigation = useNavigation();
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const styles = StyleSheet.create({
        container:{
            width: "90%",
            alignSelf:'center',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: COLORS.white,
            padding:"5%",
            margin:"3%",
            // marginBottom: "5%",
            aspectRatio: 16/9,
            // height: "35%",    
            borderRadius: 14,
            ...SHADOWS.dark
        },
        imgContainer:{
            width: "50%", 
            aspectRatio: 1,
            alignSelf:'center', 
            // backgroundColor: COLORS.gray,
            justifyContent: 'center'
        },
        infoContainer:{
            alignSelf:'center',
            paddingLeft: "5%",
            width: "60%",
            aspectRatio: 1,
            // marginLeft: "10%",
            // backgroundColor: COLORS.gray,
            borderLeftWidth: 2,
            justifyContent: 'space-evenly'
        },
        infoLine:{
            flexDirection: 'row',
            height: "15%",
            marginBottom: 20,
            // backgroundColor: COLORS.gray
        },
        circleImg:{
            width: "80%", 
            aspectRatio: 1, 
            borderRadius: 150, 
            alignSelf: 'center'
        },
        infoText:{
            marginLeft: windowWidth/35,
            fontSize: windowWidth/35,
        },
        infoHeaderText:{
            marginLeft: windowWidth/35,
            fontSize: windowWidth/50,
            opacity: 0.5
        },
        icon:{
            alignSelf:'center',
            height: "100%",
            resizeMode: 'contain'
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
                    <Image source={assets.account} style={styles.icon}/>
                    <View>
                        <Text style={styles.infoHeaderText}>Full Name</Text>
                        <Text style={styles.infoText}> {data.name} </Text>
                    </View> 
                </View>
                <View style={styles.infoLine}>
                    <Image source={assets.classes} style={styles.icon}/>
                    <View>
                        <Text style={styles.infoHeaderText}>Class</Text>
                        <Text style={styles.infoText}> {data.class} </Text>
                    </View> 
                </View>
                <View style={styles.infoLine}>
                    <Image source={assets.teacher} style={styles.icon}/>
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