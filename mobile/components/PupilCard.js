import { View, Image, Text, StyleSheet, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { scale, moderateScale } from 'react-native-size-matters';
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
            aspectRatio: 16/9, 
            borderRadius: 14,
            ...SHADOWS.dark
        },
        imgContainer:{
            width: scale(100), 
            aspectRatio: 1,
            alignSelf:'center', 
            justifyContent: 'center',
            paddingRight: scale(5),
        },
        infoContainer:{
            alignSelf:'center',
            paddingLeft: scale(5),
            width: "60%",
            aspectRatio: 1,
            borderLeftWidth: 2,
            justifyContent: 'space-evenly'
        },
        infoLine:{
            flexDirection: 'row',
            height: "15%",
            marginBottom: scale(5),
        },
        circleImg:{
            width: "80%", 
            aspectRatio: 1, 
            borderRadius: 150, 
            alignSelf: 'center'
        },
        infoText:{
            fontSize: scale(12),
        },
        infoHeaderText:{
            fontSize: scale(12),
            opacity: 0.5,
        },
        icon:{
            alignSelf:'center',
            height: "100%",
            resizeMode: 'contain',
        },
        lineText:{
            marginLeft:scale(10)
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
                    <View style={styles.lineText}>
                        <Text style={styles.infoHeaderText}>Full Name</Text>
                        <Text style={styles.infoText}> {data.name} </Text>
                    </View> 
                </View>
                <View style={styles.infoLine}>
                    <Image source={assets.classes} style={styles.icon}/>
                    <View style={styles.lineText}>
                        <Text style={styles.infoHeaderText}>Class</Text>
                        <Text style={styles.infoText}> {data.class} </Text>
                    </View> 
                </View>
                <View style={styles.infoLine}>
                    <Image source={assets.teacher} style={styles.icon}/>
                    <View style={styles.lineText}>
                        <Text style={styles.infoHeaderText}>Hoomroom Teacher</Text>
                        <Text style={styles.infoText}> {data.teacher} </Text>
                    </View> 
                </View>
                <View style={styles.infoLine}>
                    <Image size={40} source={assets.calendar} style={styles.icon}/>
                    <View style={styles.lineText}>
                        <Text style={styles.infoHeaderText}>Birthday</Text>
                        <Text style={styles.infoText}> {data.dateofbirth} </Text>
                    </View> 
                </View>
            </View>
        </View>
    )
}

export default PupilCard