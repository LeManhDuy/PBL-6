import React, {useState, useEffect} from 'react'
import AddStory from './AddStory';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Details from './Details';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AccountService from "../config/service/AccountService";

const Home = () => {
    const [isLogin, setIsLogin] = useState(false)
    // const [accId, setAccId] = useState()
    const [parentInfo, setParentInfo] = useState()
    const [state, setState] = useState(true)

    useEffect(()=>{
        // getAccId()
        getParentInfo()
        checkLogin()
    }, [state])

    // const getAccId = async () => {
    //     try{
    //         const account_data = await AsyncStorage.getItem('@Login')
    //         if(account_data){
    //             setAccId(JSON.parse(account_data).AccountId)
    //         }
    //         console.log('done',JSON.parse(account_data).AccountId)
    //     }catch(err){
    //         console.log('5',err)
    //     }
    // }

    const getParentInfo = async () => {
        // console.log('log',accId)
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
        setState(false)
    }
    
    const checkLogin = async () => {
      const i = await AsyncStorage.getItem("@Login")
      setIsLogin(i!==null)
    }
    if(isLogin){
    console.log('login',parentInfo)
    const Drawer = createDrawerNavigator();
    return (
    <Drawer.Navigator useLegacyImplementation initialRouteName="Details" 
    drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Logout" onPress={async () =>{
                try {
                    
                    await AsyncStorage.removeItem('@Login')
                    props.navigation.navigate("Login")
                }
                catch(err) {
                    console.log(err)
                }
            }} />
          </DrawerContentScrollView>
        )
      }}>
        <Drawer.Screen name="Details">
            {(props)=> <Details {...props} parentInfo={parentInfo} />}
          </Drawer.Screen> 
        <Drawer.Screen name="Add" component={AddStory} />
    </Drawer.Navigator>
    )
  }
}

export default Home