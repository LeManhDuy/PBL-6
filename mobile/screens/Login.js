import React,  { useEffect, useState } from "react";
import { SafeAreaView, Text, View, StyleSheet} from "react-native"
import { TextInput, Title } from "react-native-paper";
import { Formik } from "formik"
import { CustomButton } from "../components";
import AuthenticationService from "../config/service/AuthenticationService";
// import AsyncStorageManager from "../config/service/AsyncStorageManager";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from "../constants";



const Login = ({navigation}) => {
    const [userInfo, setUserInfo] = useState({username:"",password:""});
    const [secureTextEntry, setSecureTextEntry] = useState(true)

    const handleLogin =  async (navigation) => {
        // console.log(userInfo)
        AuthenticationService.postLogin({
            account_username:userInfo.username, 
            account_password:userInfo.password
        })
            .then(async (response)=>{
                console.log(response)
                if(response.success && response.AccountRole==="Parents"){
                    await AsyncStorage.setItem('@Login',JSON.stringify(response))
                    setUserInfo({username:"",password:""})
                    navigation.navigate('Home',{screen: 'Details'})
                }
                else{
                    alert("Incorrect email or password")
                } 
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    const styles = StyleSheet.create({
        input: {
            width: "90%",
            alignSelf: 'center',
        },
        container: {
            marginTop: "50%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        header:{
            paddingTop: 50,
            paddingBottom: 20,
            fontSize: 50,
        }
    })

    return (
      <SafeAreaView>
            
            <View style={styles.container}>
            <Title style={styles.header}>LOGIN</Title>
                <TextInput 
                    label={'Username'}
                    mode={"outlined"}
                    value={userInfo.username} 
                    onChangeText={newText =>{setUserInfo({...userInfo,username:newText})}}
                    style={styles.input}
                />
                <TextInput 
                    label={'Password'}
                    mode={"outlined"}
                    value={userInfo.password} 
                    secureTextEntry={secureTextEntry}
                    right={
                        <TextInput.Icon
                        name="eye"
                        onPress={() => {
                            setSecureTextEntry(!secureTextEntry);
                            return false;
                        }}
                        />
                    }
                    onChangeText={newText=>{setUserInfo({...userInfo,password:newText})}}
                    style={styles.input}
                />
                <CustomButton onPress={() => {
                    handleLogin(navigation)
                }} 
                title="Submit" text={'Submit'} />
            </View>
      </SafeAreaView>
    );
  };
  
export default Login