import { SafeAreaView, View, StyleSheet, Image, ScrollView } from "react-native"
import React, {useState, useEffect} from "react";
import { Title } from "react-native-paper";
import { assets, COLORS, FONTS, SIZES } from "../constants";
import AccountService from "../config/service/AccountService";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Details = () => {
    const [parentInfo, setParentInfo] = useState()
    const [state, setState] = useState(true)

    useEffect(()=>{
        getParentInfo()
    }, [state])

    const getParentInfo = async () => {
        const account_data = JSON.parse(await AsyncStorage.getItem('@Login'))
        if(account_data){
            console.log('log',account_data)
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
                console.log('d',dataSources)
                setParentInfo(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    const styles = StyleSheet.create({
        infoContainer:{
            padding: 20,
            width:"80%",
            alignSelf:'center',
            alignItems:'center',
        },
        imgContainer:{
            // borderWidth: 2,
            width: "75%",
            aspectRatio: 1
            // backgroundColor: COLORS.gray,
        },
        circleImg:{
            width: "100%", height: "100%", borderRadius: 200,
        },
        infoContainer2:{
            padding:"10%",
            width: "100%",
            justifyContent:'center'
        },
        infoLine:{
            padding: "5%",
            flexDirection: 'row',
            marginBottom: "10%",
            // backgroundColor: `#ff7f50`,
            borderBottomWidth: 2,
            borderColor: `#000000`
        },
        infoText:{
            marginLeft: "10%",
            fontSize: SIZES.extraLarge,
        },
        infoHeaderText:{
            marginLeft: "12%",
            fontSize: SIZES.medium,
            opacity: 0.5
        },
        icon:{
            alignSelf:'center'  
        }
    })
    if(parentInfo){

        return (
            <ScrollView>
                <View style={styles.infoContainer}>
                    <View style={styles.imgContainer}>
                        <Image 
                        source={parentInfo?{uri:parentInfo.img}:assets.account}
                        style={styles.circleImg} 
                        />
                    </View>
                
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
            </ScrollView>
        )
    }
}

export default Details