import {Image, Text, View, StyleSheet, Animated, TouchableOpacity, ScrollView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import StudentService from "../config/service/StudentService";
import ScheduleService from "../config/service/ScheduleService";
import React, {useState, useEffect, useRef} from "react";
import { scale } from 'react-native-size-matters';
import ListPupilModal from '../components/ListPupilModal';
import { AnimatedHeader } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, List } from 'react-native-paper';
import { assets } from '../constants';
const Schedule = () => { 

    const [pupilsInfo, setPupilsInfo] = useState()
    const [state, setState] = useState(false)
    const [scheduleInfo, setScheduleInfo] = useState()
    const [selectPupil, setSelectPupil] = useState(false)
    const [buttonText, setButtonText] = useState('Select Student')
    const [scheduleShow, setScheduleShow] = useState()
    const [showButton, setShowButton] = useState(true)
    useEffect(()=>{
        getPupilsInfo()
        getScheduleInfo()
    }, [state])

    const getPupilsInfo = async () => {
        const account_data = JSON.parse(await AsyncStorage.getItem('@Login'))
        if(account_data){
            console.log(account_data.AccountId)
            await StudentService.getPupilByParentId(account_data.AccountId)
                .then((response) => {
                    const dataSources = response.getPupilInfor.map(
                        (item, index) => {
                            return {
                                key: index + 1,
                                id: item._id,
                                name: item.pupil_name,
                                dateofbirth: new Date(
                                    item.pupil_dateofbirth
                                ).toLocaleDateString(),
                                class: item.class_id
                                    ? item.class_id.class_name
                                    : "Empty",
                                class_id: item.class_id ? item.class_id._id : "Empty"
                            };
                        }
                    );
                    const dataSourcesSorted = [...dataSources].sort((a, b) => a.name > b.name ? 1 : -1,);
                    setPupilsInfo(dataSourcesSorted);
                })
                .catch((error) => {
                    console.log(error);
                });
            
        }
    };

    const getScheduleInfo = () => {
        ScheduleService.getSchedule()
            .then((response) => {
                const dataSources = response.schedules.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item.schedule._id,
                            class_id: item.schedule.class_id._id,
                            class_name: item.schedule.class_id.class_name,
                            periods : item.periods
                        };
                    }
                );
                // console.log('p',pupilsInfo.map(x => x.class_id))
                // const dt = dataSources.filter(x =>{
                //     return pupilsInfo.map(x => x.class_id).includes(x.class_id)
                // })
                // // console.log(dt.map(x=> x.class_id))
                // console.log(dt)
                setScheduleInfo(dataSources);
            })
            .catch((error)=>{
                console.log(error);
            })
    }
    const handlePress = ()=>{
        Animated.timing(offset, {
            toValue: 0,
            duration: 100,
            useNativeDriver: false
          }).start();
        setSelectPupil(true)
    }
    const handleSelect = (props)=>{
        setSelectPupil(false)
        setButtonText(props.name+' - '+props.class)
        const showSchedule = scheduleInfo.filter(x => {
            return x.class_id === props.class_id
        })
        setScheduleShow({
            Mon: showSchedule[0].periods.filter(x =>{
                return x.period_date === 'Mon'
            }),
            Tue: showSchedule[0].periods.filter(x =>{
                return x.period_date === 'Tue'
            }),
            Wed: showSchedule[0].periods.filter(x =>{
                return x.period_date === 'Wed'
            }),
            Thu: showSchedule[0].periods.filter(x =>{
                return x.period_date === 'Thu'
            }),
            Fri: showSchedule[0].periods.filter(x =>{
                return x.period_date === 'Fri'
            }),
        })
        console.log(showSchedule[0].periods[0])
        // setScheduleShow(showSchedule[0])

    }
    const toTop = () => {
        scrollRef.current?.scrollTo({
          y: 0,
          animated: true,
        });
      }
    const offset = useRef(new Animated.Value(0)).current;
    const scrollRef = useRef();
    const marginScroll = offset.interpolate({
        inputRange: [0, scale(70)],
        outputRange: [scale(58), scale(14)],
        extrapolate: 'clamp'
      });
      const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
    if (pupilsInfo && scheduleInfo){
    return (
        <SafeAreaView style={styles.container}>
            <ListPupilModal show={selectPupil} data={pupilsInfo} 
                handleClose={()=>setSelectPupil(false)}
                handleSelect={handleSelect}/>
            <AnimatedHeader animatedValue={offset} buttonText={buttonText} handlePress={handlePress}/>
            {scheduleShow?
            <> 
                <AnimatedScrollView
                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { y: offset } } }],
                            { useNativeDriver: false }
                        )
                    }
                    ref={scrollRef}
                    style={{marginTop: marginScroll,marginBottom:20}}
                >
                    <View style={styles.dateContainer}>
                        <View style={styles.dateTextContainer}>
                            <Text style={styles.dateText}>Mon</Text>
                        </View>
                        <View style={styles.periodContainer}>
                                {scheduleShow.Mon.map((item, index)=>{
                                    return (
                                    <View key={index} style={styles.periodLine}>
                                    <Text style={styles.periodNumber}>{item.period_number}</Text> 
                                    <Text style={styles.periodSubject}>{item.subject_teacher_id.subject_id.subject_name}</Text> 
                                    </View>
                                )
                                })}
                        </View>
                    </View>
                    <View style={styles.dateContainer}>
                        <View style={styles.dateTextContainer}>
                            <Text style={styles.dateText}>Tue</Text>
                        </View>
                        <View style={styles.periodContainer}>
                                {scheduleShow.Tue.map((item, index)=>{
                                    return (
                                    <View key={index} style={styles.periodLine}>
                                    <Text style={styles.periodNumber}>{item.period_number}</Text> 
                                    <Text style={styles.periodSubject}>{item.subject_teacher_id.subject_id.subject_name}</Text> 
                                    </View>
                                )
                                })}
                        </View>
                    </View>
                    <View style={styles.dateContainer}>
                        <View style={styles.dateTextContainer}>
                            <Text style={styles.dateText}>Wed</Text>
                        </View>
                        <View style={styles.periodContainer}>
                                {scheduleShow.Wed.map((item, index)=>{
                                    return (
                                    <View key={index} style={styles.periodLine}>
                                    <Text style={styles.periodNumber}>{item.period_number}</Text> 
                                    <Text style={styles.periodSubject}>{item.subject_teacher_id.subject_id.subject_name}</Text> 
                                    </View>
                                )
                                })}
                        </View>
                    </View>
                    <View style={styles.dateContainer}>
                        <View style={styles.dateTextContainer}>
                            <Text style={styles.dateText}>Thu</Text>
                        </View>
                        <View style={styles.periodContainer}>
                                {scheduleShow.Thu.map((item, index)=>{
                                    return (
                                    <View key={index} style={styles.periodLine}>
                                    <Text style={styles.periodNumber}>{item.period_number}</Text> 
                                    <Text style={styles.periodSubject}>{item.subject_teacher_id.subject_id.subject_name}</Text> 
                                    </View>
                                )
                                })}
                        </View>
                    </View>
                    <View style={styles.dateContainer}>
                        <View style={styles.dateTextContainer}>
                            <Text style={styles.dateText}>Fri</Text>
                        </View>
                        <View style={styles.periodContainer}>
                                {scheduleShow.Fri.map((item, index)=>{
                                    return (
                                    <View key={index} style={styles.periodLine}>
                                    <Text style={styles.periodNumber}>{item.period_number}</Text> 
                                    <Text style={styles.periodSubject}>{item.subject_teacher_id.subject_id.subject_name}</Text> 
                                    </View>
                                )
                                })}
                        </View>
                    </View>
                </AnimatedScrollView>
                <TouchableOpacity onPress={toTop} style={styles.floatButton}>
                <Image size={40} source={assets.arrowup}/>
                </TouchableOpacity>
                </>
            :<Text style={{marginTop:scale(58)}}>Empty</Text>}
            
        </SafeAreaView>
    )
    }
    else{
        // console.log(pupilsInfo)
        // console.log(scheduleInfo)
        return(
            <Text>Loading</Text>
        )
    }
}

const styles = StyleSheet.create({
    container:{

    },
    button:{
        borderWidth: 2,
        width: '70%',
        alignSelf: 'center',
        marginTop: scale(12),
        paddingVertical: scale(16),
        borderRadius: 14
    },
    buttonText:{
        alignSelf: 'center',
        fontSize: scale(14)
    },
    floatButton: {
        position: 'absolute',
        width: scale(50),
        height: scale(50),
        alignItems: 'center',
        justifyContent: 'center',
        right: 40,
        bottom: 40,
        backgroundColor: '#83acdc',
        borderRadius: 100,
        elevation: 8,
        // opacity: 0
      },
      floatButtonIcon: {
        fontSize: scale(25),
        color: 'white'
      },
      dateContainer:{
        alignSelf: 'center',
        width: '90%',
        borderWidth: 1,
        padding: scale(10),
        borderRadius: 14,
        marginBottom: 20
      },
      dateTextContainer:{
        borderBottomWidth: 2,
        marginBottom: 12
      },
        dateText:{
            fontSize: scale(24),
            fontWeight: 'bold',
            marginLeft: scale(20)
        },
        periodContainer:{
            paddingHorizontal: scale(20),
        },
        periodLine:{
            flexDirection: 'row',
            marginBottom: 10,
            justifyContent: 'space-between'
        },
        periodNumber:{
            fontWeight: 'bold',
            fontSize: scale(16)
        },
        periodSubject:{
            fontSize: scale(16)
        }
})

export default Schedule