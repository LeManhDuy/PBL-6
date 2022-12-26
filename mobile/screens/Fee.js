import { Image, Text, View, StyleSheet, Animated, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FeeService from "../config/service/FeeService";
import ScheduleService from "../config/service/ScheduleService";
import React, { useState, useEffect, useRef } from "react";
import { scale } from 'react-native-size-matters';
import FeeCard from '../components/FeeCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { assets } from '../constants';
import { useFocusEffect } from '@react-navigation/core';

const Fee = () => {
    const [fees, setFees] = useState([]);

    useEffect(() => {
        getFee();
    }, []);
    useFocusEffect(
      React.useCallback(() => {
        getFee()
      }, [])
    );

    const getFee = async () => {
        await FeeService.getFeeInforByParentId(
            JSON.parse(await AsyncStorage.getItem("@Login")).AccountId
        )
            .then((response) => {
                const dataSources = response.getFeeInfor.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item._id,

                            name: item.pupil_id.pupil_name,
                            class: item.pupil_id
                                ? item.pupil_id.class_id
                                    ? item.pupil_id.class_id.class_name
                                    : "Empty"
                                : "Empty",
                            // grade: item.pupil_id
                            //     ? item.pupil_id.class_id
                            //         ? item.pupil_id.class_id.grade_id
                            //             ? item.pupil_id.class_id.grade_id.grade_name
                            //             : "Empty"
                            //         : "Empty"
                            //     : "Empty",
                            // image: item.pupil_id ? item.pupil_id.pupil_image : Logo,


                            fee_name: item.fee_category_id
                                ? item.fee_category_id.fee_name
                                : "Empty",
                            fee_amount: item.fee_category_id
                                ? item.fee_category_id.fee_amount
                                : "Empty",
                            fee_status: item.fee_status ? "Paid" : "UnPaid",
                            fee_status_bool: item.fee_status ? 1 : 0,
                            start_date: item.fee_category_id
                                ?
                                new Date(item.fee_category_id.start_date).toLocaleDateString()
                                : "Empty",
                            end_date: item.fee_category_id
                                ?
                                new Date(item.fee_category_id.end_date).toLocaleDateString()
                                : "Empty",
                            paid_date: item.paid_date ?
                                new Date(item.paid_date).toLocaleDateString()
                                : "Empty",
                        };
                    }
                );
                const dataSourcesSorted = [...dataSources].sort((a, b) => a.fee_status_bool > b.fee_status_bool ? 1 : -1,);
                setFees(dataSourcesSorted);
                console.log(dataSourcesSorted)
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return(
        <View style={styles.centeredView}>
                <View style={styles.flatlistContainer}>
                <FlatList
                data={fees}
                renderItem={({ item }) =>
                    <FeeCard
                    data={item}
                    // handleShowDetail={() => {
                    //     setModalData(item)
                    //     setModalVisible(true)
                    // }}
                    />
                }
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                />
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      backgroundColor: "#fff",
    },
    buttonContainer: {
      flex: 1 / 2,
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginBottom: 20,
    },
    button: {
      flex: 2 / 5,
      borderRadius: 25,
      padding: 10,
    },
    buttonOpen: {
      backgroundColor: "#002e64",
      alignSelf: 'center',
    },
    buttonClose: {
      backgroundColor: "#83acdc",
      alignSelf: 'center',
    },
    flatlistContainer: {
      flex: 4,
      // marginBottom: 200,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: scale(16),
      textAlign: 'center',
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
      elevation: 8
    },
    floatButtonIcon: {
      fontSize: scale(25),
      color: 'white'
    }
  });
  

export default Fee;