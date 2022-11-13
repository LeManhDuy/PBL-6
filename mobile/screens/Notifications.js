import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, FlatList, SafeAreaView } from "react-native";
import NotificationService from "../config/service/NotificationService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NotificationCard, NotificationCardHeader } from "../components";
import { COLORS, SIZES } from "../constants";

const Notifications = () => {
    const [isPublic, setIsPublic] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [notificationsPrivate, setNotificationsPrivate] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [state, setState] = useState(false);
    const [id, setId] = useState("");
    const [isDelete, setIsDelete] = useState(false);
    const [errorService, setErrorServer] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

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
  return (
        <SafeAreaView>
            <View style={styles.buttonContainer}>
                <Pressable style={isPublic?[styles.button, styles.buttonOpen]:[styles.button, styles.buttonClose]}
                    onPress={() => setIsPublic(true)}
                >
                    <Text style={styles.buttonText}>Public Notification</Text>
                </Pressable>
                <Pressable style={!isPublic?[styles.button, styles.buttonOpen]:[styles.button, styles.buttonClose]}
                    onPress={() => setIsPublic(false)}
                >
                    <Text style={styles.buttonText}>Private Notification</Text>
                </Pressable>
            </View>
            <View style={{ zIndex: 1, marginBottom: 200 }}>
            <FlatList
                data={isPublic ? notifications : notificationsPrivate}
                renderItem={({item})=> <NotificationCard data={item} isPublic={isPublic}/>}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
            />
            </View>
        </SafeAreaView>
    );
};
{/*     const [modalVisible, setModalVisible] = useState(false); 
<View style={styles.centeredView}>
      <Modal
        animationType="slide"
        useNativeDriver={true}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
   */}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonContainer:{
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 20
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#002e64",
  },
  buttonClose: {
    backgroundColor: "#83acdc",
  },
  onHoverIn: {
    backgroundColor: "#002e64",
  },
  buttonText:{
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: SIZES.extraLarge
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Notifications