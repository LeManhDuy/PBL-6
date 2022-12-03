import { View, Image, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { TextInput, Title } from "react-native-paper";
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { scale, moderateScale } from 'react-native-size-matters';
import { COLORS, SIZES, SHADOWS, assets, FONTS } from '../constants'
import React from 'react'
const PupilCard = ({ data }) => {
    const navigation = useNavigation();
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const styles = StyleSheet.create({

        // container: {
        //     width: "90%",
        //     alignSelf: 'center',
        //     flexDirection: 'row',
        //     justifyContent: 'center',
        //     backgroundColor: COLORS.white,
        //     padding: "5%",
        //     margin: "3%",
        //     aspectRatio: 16 / 9,
        //     borderRadius: 14,
        //     ...SHADOWS.dark
        // },
        // imgContainer: {
        //     width: scale(100),
        //     aspectRatio: 1,
        //     alignSelf: 'center',
        //     justifyContent: 'center',
        //     paddingRight: scale(5),
        // },
        // infoContainer: {
        //     alignSelf: 'center',
        //     paddingLeft: scale(5),
        //     width: "60%",
        //     aspectRatio: 1,
        //     justifyContent: 'space-evenly'
        // },
        // infoLine: {
        //     flexDirection: 'row',
        // },
        // circleImg: {
        //     width: "80%",
        //     aspectRatio: 1,
        //     borderRadius: 150,
        //     alignSelf: 'center'
        // },
        // infoText: {
        //     color: '#83ACDC',
        //     fontSize: 14,
        // },
        // infoHeaderText: {
        //     color: '#225896',
        //     fontSize: 17,
        // },
        // icon: {
        //     alignSelf: 'center',
        //     height: "100%",
        //     resizeMode: 'contain',
        // },
        // lineText: {
        //     flex: 1,
        //     textAlignments: 'left'
        // },
        // icon: {
        //     alignSelf: 'center',
        //     color: '#83ACDC',
        // }
        main: {
            backgroundColor: "#fff",
        },
        infoContainer: {
            padding: 5,
            width: "90%",
            alignSelf: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 15,
            marginTop: 15,
            backgroundColor: '#F5F4F9',
            borderRadius: 20,
            borderWidth: 1.5,
            borderColor: '#1A5CAC',
        },
        circleImg: {
            width: 100,
            height: 100,
            borderRadius: 100 / 2,
            alignSelf: 'center'
        },
        flexContainer: {
            flexDirection: "row",
            flex: 1,
        },
        infoContainer3: {
            marginLeft: 30,
            justifyContent: "space-around",
        },
        infoText: {
            marginLeft: 20,
            color: '#83ACDC',
            fontSize: 14,
        },
        infoHeaderText: {
            marginLeft: 22,
            color: '#1A5CAC',
            fontSize: 15,
            //fontWeight: 'bold',
        },
        icon: {
            alignSelf: 'center',
            color: '#1A5CAC',
        }
    })
    return (
        <ScrollView style={styles.main}>
            <View style={styles.infoContainer}>
                <Image
                    source={data.image ? { uri: data.image } : assets.account}
                    resizeMode='cover'
                    style={styles.circleImg}
                />
                <View style={styles.flexContainer}>
                    <View style={styles.infoContainer3}>
                        <View style={styles.infoLine}>
                            <Icon style={styles.icon} name="user" size={25} />
                        </View>
                        <View style={styles.infoLine}>
                            <Icon style={styles.icon} name="phone" size={25} />
                        </View>
                        <View style={styles.infoLine}>
                            <Icon style={styles.icon} name="calendar" size={25} />
                        </View>
                        <View style={styles.infoLine}>
                            <Icon style={styles.icon} name="envelope" size={25} />
                        </View>
                    </View>
                    <View style={styles.infoContainer2}>
                        <View style={styles.infoLine}>
                            <View>
                                <Title style={styles.infoHeaderText}>Full Name</Title>
                                <Title style={styles.infoText}> {data.name} </Title>
                            </View>
                        </View>
                        <View style={styles.infoLine}>
                            <View>
                                <Title style={styles.infoHeaderText}>Class</Title>
                                <Title style={styles.infoText}> {data.class} </Title>
                            </View>
                        </View>
                        <View style={styles.infoLine}>
                            <View>
                                <Title style={styles.infoHeaderText}>Hoomroom Teacher</Title>
                                <Title style={styles.infoText}> {data.teacher} </Title>
                            </View>
                        </View>
                        <View style={styles.infoLine}>
                            <View>
                                <Title style={styles.infoHeaderText}>Birthday</Title>
                                <Title style={styles.infoText}> {data.dateofbirth} </Title>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
        // <View style={styles.container}>
        //     <View style={styles.imgContainer}>
        //         <Image
        //             source={data.image ? { uri: data.image } : assets.account}
        //             resizeMode='cover'
        //             style={styles.circleImg}
        //         />
        //     </View>
        //     <View style={styles.infoContainer}>
        //         <View style={styles.infoLine}>
        //             <Icon style={styles.icon} name="user" size={25} />
        //             <View style={styles.lineText}>
        //                 <Text style={styles.infoHeaderText}>Full Name</Text>
        //                 <Text style={styles.infoText}> {data.name} </Text>
        //             </View>
        //         </View>
        //         <View style={styles.infoLine}>
        //             <View>
        //                 <Title style={styles.infoHeaderText}>Full Name</Title>
        //                 <Title style={styles.infoText}> {data.name} </Title>
        //             </View>
        //         </View>
        //         <View style={styles.infoLine}>
        //             <Icon style={styles.icon} name="clipboard" size={25} />
        //             <View style={styles.lineText}>
        //                 <Text style={styles.infoHeaderText}>Class</Text>
        //                 <Text style={styles.infoText}> {data.class} </Text>
        //             </View>
        //         </View>
        //         <View style={styles.infoLine}>
        //             <Icon style={styles.icon} name="user" size={25} />
        //             <View style={styles.lineText}>
        //                 <Text style={styles.infoHeaderText}>Hoomroom Teacher</Text>
        //                 <Text style={styles.infoText}> {data.teacher} </Text>
        //             </View>
        //         </View>
        //         <View style={styles.infoLine}>
        //             <Icon style={styles.icon} name="calendar" size={25} />
        //             <View style={styles.lineText}>
        //                 <Text style={styles.infoHeaderText}>Birthday</Text>
        //                 <Text style={styles.infoText}> {data.dateofbirth} </Text>
        //             </View>
        //         </View>
        //     </View>
        // </View>
    )
}

export default PupilCard