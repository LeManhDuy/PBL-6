import {
    View,
    Modal,
    Text,
    StyleSheet,
    Pressable,
    Touchable,
    TouchableNativeFeedback,
    FlatList,
    TouchableHighlight,
} from "react-native";
import React, { useState, useEffect } from "react";
import { TextInput } from "react-native-paper";
import { scale } from "react-native-size-matters";
import { SearchDropDown } from "../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StudentService from "../config/service/StudentService";
import NotificationService from "../config/service/NotificationService";
import GestureRecognizer, {
    swipeDirections,
} from "react-native-swipe-gestures";

const SendNotice = ({ navigation }) => {
    const [privateNotification, setPrivateNotification] = useState({
        title: "",
        content: "",
        parent: "",
        teacher: "",
        sender: true,
    });
    const [searchText, setSearchText] = useState("");
    const [searching, setSearching] = useState(false);
    const [options, setOptions] = useState([]);
    const [filtered, setFiltered] = useState([]);
    useEffect(() => {
        getStudents();
    }, []);

    const getStudents = async () => {
        const data = await AsyncStorage.getItem("@Login");
        // console.log(JSON.parse(data))
        setPrivateNotification({
            ...privateNotification,
            parent: JSON.parse(data).AccountId,
        });
        StudentService.getPupilByParentId(JSON.parse(data).AccountId)
            .then((response) => {
                const dataSources = response.getPupilInfor.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item._id,
                            name: item.pupil_name,
                            class: item.class_id
                                ? item.class_id.class_name
                                : "Empty",
                            teacherId: item.class_id
                                ? item.class_id.homeroom_teacher_id._id
                                : null,
                            teacher: item.class_id
                                ? item.class_id.homeroom_teacher_id.person_id
                                      .person_fullname
                                : "Empty",
                            teacher_phone: item.class_id
                                ? item.class_id.homeroom_teacher_id.person_id
                                      .person_phonenumber
                                : "Empty",
                            value: item._id,
                            label: item.class_id
                                ? item.class_id.homeroom_teacher_id.person_id
                                      .person_fullname
                                : null,
                        };
                    }
                );
                const dataSourcesSorted = [...dataSources].sort((a, b) =>
                    a.name > b.name ? 1 : -1
                );
                // console.log(dataSourcesSorted)
                const unique = [];
                const uniqueTeacher = dataSourcesSorted.filter((element) => {
                    const isDuplicate = unique.includes(element.teacherId);
                    if (!isDuplicate) {
                        unique.push(element.teacherId);
                        return true;
                    }
                    return false;
                });
                setOptions(uniqueTeacher);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    onSwipePerformed = (action) => {
        /// action : 'left' for left swipe
        /// action : 'right' for right swipe
        /// action : 'up' for up swipe
        /// action : 'down' for down swipe

        switch (action) {
            case "left": {
                console.log("left Swipe performed");
                break;
            }
            case "right": {
                console.log("right Swipe performed");
                break;
            }
            case "up": {
                console.log("up Swipe performed");
                break;
            }
            case "down": {
                console.log("down Swipe performed");
                break;
            }
            default: {
                console.log("Undeteceted action");
            }
        }
    };

    const onSearch = (text) => {
        if (text) {
            setSearching(true);
            setPrivateNotification({
                ...privateNotification,
                teacher: "",
            });
            const temp = text.toLowerCase();

            const tempList = options.filter((item) => {
                if (item.teacher.toLowerCase().includes(temp)) return item;
            });
            setFiltered(tempList);
        } else {
            setSearching(false);
            setFiltered(options);
        }
    };
    const showAll = () => {
        // console.log()
        setSearching(!searching);
        setFiltered(options);
    };
    const handleDropdown = (item) => {
        // alert(id)
        setPrivateNotification({
            ...privateNotification,
            teacher: item.teacherId,
        });
        setSearchText(item.teacher);
        setSearching(false);
    };
    const handleSend = () => {
        if (
            !privateNotification.teacher ||
            !privateNotification.title ||
            !privateNotification.content
        ) {
            alert("Please fill in all field!");
        } else {
            console.log("pri", privateNotification);
            NotificationService.createPrivateNotification({
                title: privateNotification.title,
                content: privateNotification.content,
                parent_id: privateNotification.parent,
                teacher_id: privateNotification.teacher,
                parents_send: privateNotification.sender,
            })
                .then((res) => {
                    if (res.success) {
                        alert("Notification Sent!");
                        navigation.navigate("Notifications");
                    } else {
                        alert("Failed to send notification!");
                    }
                })
                .catch((error) => console.log("error", error));
        }
    };
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder="Title"
                value={privateNotification.title}
                onChangeText={(props) => {
                    setPrivateNotification({
                        ...privateNotification,
                        title: props,
                    });
                }}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Send to"
                value={searchText}
                onChangeText={(props) => {
                    setSearchText(props);
                    onSearch(props);
                }}
                onTouchStart={showAll}
            />
            {searching && (
                <SearchDropDown
                    onPress={handleDropdown}
                    dataSource={filtered}
                />
            )}
            {!searching && (
                <>
                    <TextInput
                        multiline={true}
                        numberOfLines={10}
                        style={styles.textArea}
                        placeholder="Content"
                        value={privateNotification.content}
                        onChangeText={(props) => {
                            setPrivateNotification({
                                ...privateNotification,
                                content: props,
                            });
                        }}
                    />
                </>
            )}
            <TouchableHighlight style={styles.sendButton} onPress={handleSend}>
                <Text style={styles.buttonText}>Send</Text>
            </TouchableHighlight>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        // justifyContent: 'center',
        alignItems: "center",
        flex: 1,
    },
    textInput: {
        backgroundColor: "white",
        width: "100%",
        borderRadius: 5,
        height: scale(40),
        fontSize: scale(12),
        fontWeight: "bold",
        paddingHorizontal: 10,
    },
    textArea: {
        backgroundColor: "#white",
        width: "100%",
        borderRadius: 5,
        // height: windowHeight-scale(80),
        // textAlignVertical: "top",
        // flexWrap: 'wrap',
        fontSize: scale(12),
        fontWeight: "bold",
    },
    sendButton: {
        position: "absolute",
        bottom: scale(30),
        height: scale(50),
        width: scale(150),
        borderRadius: 50,
        backgroundColor: "gray",
        justifyContent: "center",
    },
    buttonText: {
        alignSelf: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: scale(25),
    },
});
export default SendNotice;
