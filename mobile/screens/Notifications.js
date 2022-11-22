import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Pressable, View, FlatList, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import NotificationService from "../config/service/NotificationService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NotificationCard, NotificationModal } from "../components";
import { COLORS, SIZES, assets } from "../constants";
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { scale } from 'react-native-size-matters';

const Notifications = ({navigation}) => {
    const [isPublic, setIsPublic] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [notificationsPrivate, setNotificationsPrivate] = useState([]);
    const [state, setState] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState();
    const [addNotificationState, setAddNotificationState] = useState(false)

    useEffect(() => {
        getNotifications();
        getNotificationsParents();
    }, [state]);

    const getNotifications = () => {
        NotificationService.getNotifications()
            .then((response) => {
                const dataSources = response.publicNotifications.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item._id,
                            title: item.title,
                            content: item.content,
                            date: item.date,
                        };
                    }
                );
                dataSources.sort(function (a, b) {
                    return new Date(b.date) - new Date(a.date);
                });

                setNotifications(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getNotificationsParents = async () => {
        const data = await AsyncStorage.getItem("@Login")
        console.log('login',JSON.parse(data).AccountId)
        NotificationService.getNotificationsParents(
            JSON.parse(data).AccountId
        )
            .then((response) => {
                const dataSources = response.privateNotifications.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item._id,
                            title: item.title,
                            content: item.content,
                            date: item.date,
                            teacher: item.teacher_id._id,
                            teacherName:
                                item.teacher_id.person_id.person_fullname,
                            sender: item.parents_send,
                        };
                    }
                );
                dataSources.sort(function (a, b) {
                    return new Date(b.date) - new Date(a.date);
                });
                setNotificationsPrivate(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleChangeModal = () => {
      setModalVisible(!modalVisible)
    }
  return (
        <View style={styles.centeredView} blurRadius={4}>
            <NotificationModal 
              data={modalData} 
              show={modalVisible}
              isPublic={isPublic} 
              handleChange={handleChangeModal} />
            <View style={styles.buttonContainer}>
                <Pressable style={isPublic?[styles.button, styles.buttonOpen]:[styles.button, styles.buttonClose]}
                    onPress={() => setIsPublic(true)}
                >
                    <Text
                      style={styles.buttonText}>
                      Public Notification
                    </Text>
                </Pressable>
                <Pressable style={!isPublic?[styles.button, styles.buttonOpen]:[styles.button, styles.buttonClose]}
                    onPress={() => setIsPublic(false)}
                >
                    {/* <Text style={styles.buttonText}>Private Notification</Text> */}
                    <Text
                      style={styles.buttonText}>
                      Private Notification
                    </Text>
                </Pressable>
            </View>
            <View style={styles.flatlistContainer}>
            <FlatList
                data={isPublic ? notifications : notificationsPrivate}
                renderItem={({item})=> 
                  <NotificationCard 
                    data={item} 
                    isPublic={isPublic}
                    handleShowDetail={()=>{
                      setModalData(item)
                      setModalVisible(true)
                    }}
                    />
                }
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
            />
            <TouchableOpacity onPress={() => {
              // console.log("this")
                navigation.navigate('SendNotice')
              }} style={styles.floatButton}>
              <Text style={styles.floatButtonIcon}>+</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  buttonContainer:{
    flex: 1/2,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  button: {
    flex: 2/5,
    borderRadius: 20,
    padding: 10,
  },
  buttonOpen: {
    backgroundColor: "#002e64",
  },
  buttonClose: {
    backgroundColor: "#83acdc",
  },
  flatlistContainer: {
    flex: 4,
    // marginBottom: 200,
  },
  buttonText:{
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: scale(16)
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

export default Notifications