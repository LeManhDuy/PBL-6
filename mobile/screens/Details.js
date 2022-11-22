import { SafeAreaView, View, StyleSheet, Image, ScrollView } from "react-native"
import React, { useState, useEffect } from "react";
import { TextInput, Title } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import { assets, COLORS, FONTS, SIZES } from "../constants";
import AccountService from "../config/service/AccountService";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Details = () => {
    const [parentInfo, setParentInfo] = useState()
    const [state, setState] = useState(true)

    useEffect(() => {
        getParentInfo()
    }, [state])

    const getParentInfo = async () => {
        const account_data = JSON.parse(await AsyncStorage.getItem('@Login'))
        if (account_data) {
            console.log('log', account_data)
            AccountService.GetParentsInformation(account_data.AccountId)
                .then((response) => {
                    // console.log('2',response.getParentInfor)
                    const item = response.getParentInfor[0]
                    // console.log('3',item.person_id)
                    const dataSources = {
                        key: 1,
                        id: item._id,
                        name: item.person_id.person_fullname,
                        username:
                            item.person_id.account_id.account_username,
                        role:
                            item.person_id.account_id.account_role,
                        birth: item.person_id.person_dateofbirth.split('T')[0],
                        email: item.person_id.person_email,
                        gender: item.person_id.person_gender,
                        phone: item.person_id.person_phonenumber,
                        address: item.person_id.person_address,
                        job: item.parent_job,
                        img: item.person_id.person_image,
                    }
                    console.log('d', dataSources)
                    setParentInfo(dataSources);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const styles = StyleSheet.create({
        main: {
            backgroundColor: "#fff",
        },
        infoContainer: {
            padding: 20,
            width: "75%",
            alignSelf: 'center',
            alignItems: 'center',
            // ...SHADOWS.dark
        },
        circleImg: {
            width: 200,
            height: 200,
            borderRadius: 200 / 2,
        },
        flexContainer: {
            flexDirection: "row",
            flex: 1,
            marginTop: 50,
            backgroundColor: '#F5F4F9',
            borderRadius: 20,
        },
        infoContainer2: {
        },
        infoContainer3: {
            marginLeft:20,
            justifyContent: "space-around",
        },
        infoLine: {
            padding: 10,
            flexDirection: 'row',
        },
        infoText: {
            marginLeft: 20,
            color: '#83ACDC',
            fontSize: 14,
        },
        infoHeaderText: {
            marginLeft: 25,
            color: '#225896',
            fontSize: 17,
        },
        icon: {
            alignSelf: 'center',
            color: '#83ACDC',
        }
    })
    if (parentInfo) {

        return (
            <ScrollView style={styles.main}>
                <View style={styles.infoContainer}>
                    <Image
                        source={parentInfo ? { uri: parentInfo.img } : assets.account}
                        style={styles.circleImg}
                    />
                    <View style={styles.flexContainer}>
                        <View style={styles.infoContainer3}>
                            <View style={styles.infoLine}>
                                <Icon style={styles.icon} name="user" size={30} />
                            </View>
                            <View style={styles.infoLine}>
                                <Icon style={styles.icon} name="phone" size={30} />
                            </View>
                            <View style={styles.infoLine}>
                                <Icon style={styles.icon} name="calendar" size={30} />
                            </View>
                            <View style={styles.infoLine}>
                                <Icon style={styles.icon} name="envelope" size={30} />
                            </View>
                        </View>
                        <View style={styles.infoContainer2}>
                            <View style={styles.infoLine}>
                                <View>
                                    <Title style={styles.infoHeaderText}>Full Name</Title>
                                    <Title style={styles.infoText}> {parentInfo.name} </Title>
                                </View>
                            </View>
                            <View style={styles.infoLine}>
                                <View>
                                    <Title style={styles.infoHeaderText}>Phone Number</Title>
                                    <Title style={styles.infoText}> {parentInfo.phone} </Title>
                                </View>
                            </View>
                            <View style={styles.infoLine}>
                                <View>
                                    <Title style={styles.infoHeaderText}>Birthday</Title>
                                    <Title style={styles.infoText}> {parentInfo.birth} </Title>
                                </View>
                            </View>
                            <View style={styles.infoLine}>
                                <View>
                                    <Title style={styles.infoHeaderText}>Email</Title>
                                    <Title style={styles.infoText}> {parentInfo.email} </Title>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default Details