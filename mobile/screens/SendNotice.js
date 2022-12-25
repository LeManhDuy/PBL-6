import { View, Modal, Text, StyleSheet, Pressable, Touchable, TouchableNativeFeedback, FlatList, TouchableHighlight } from 'react-native'
import React, { useState, useEffect } from "react";
import { TextInput } from 'react-native-paper';
import { scale } from 'react-native-size-matters';
import { SearchDropDown } from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StudentService from "../config/service/StudentService";
import NotificationService from '../config/service/NotificationService';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

const SendNotice = ({ navigation }) => {
    const [state, setState] = useState(false);
    const [privateNotification, setPrivateNotification] = useState({
        title: "",
        content: "",
        parent: "",
        teacher: "",
        sender: true,
    });
    const [searchText, setSearchText] = useState("")
    const [searching, setSearching] = useState(false)
    const [options, setOptions] = useState([]);
    const [filtered, setFiltered] = useState([])
    useEffect(() => {
        getStudents();
    }, [state]);

    const getStudents = async () => {
        const data = await AsyncStorage.getItem("@Login")
        setPrivateNotification({
            ...privateNotification,
            parent: JSON.parse(data).AccountId
        })
        StudentService.getPupilByParentId(
            JSON.parse(data).AccountId
        )
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
                setOptions(dataSourcesSorted);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const onSearch = (text) => {
        if (text) {
            setSearching(true)
            setPrivateNotification({
                ...privateNotification,
                teacher: ''
            })
            const temp = text.toLowerCase()

            const tempList = options.filter(item => {
                if (item.teacher.toLowerCase().includes(temp))
                    return item
            })
            setFiltered(tempList)
        }
        else {
            setSearching(false)
            setFiltered(options)
        }
    }
    const showAll = () => {
        // console.log()
        setSearching(!searching)
        setFiltered(options)
    }
    const handleDropdown = (item) => {
        // alert(id)
        setPrivateNotification({
            ...privateNotification,
            teacher: item.teacherId
        })
        setSearchText(item.teacher)
        setSearching(false)
    }
    const handleSend = () => {

        if (!privateNotification.teacher || !privateNotification.title || !privateNotification.content) {
            alert('Please fill in all field!')
        }
        else {
            console.log('pri', privateNotification)
            NotificationService.createPrivateNotification({
                title: privateNotification.title,
                content: privateNotification.content,
                parent_id: privateNotification.parent,
                teacher_id: privateNotification.teacher,
                parents_send: privateNotification.sender,
            })
                .then((res) => {
                    if (res.success) {
                        alert('Notification Sent!')
                        navigation.navigate('Notifications')
                    }
                    else {
                        alert('Failed to send notification!')
                    }
                })
                .catch((error) => console.log("error", error));
        }
    }
    return (
        <View style={styles.container}>
            <TextInput
                label={'Title'}
                outlineColor={'#1A5CAC'}
                activeOutlineColor={'#1A5CAC'}
                selectionColor={'#1A5CAC'}
                cursorColor={'#1A5CAC'}
                mode={"outlined"}
                style={styles.textInput}
                value={privateNotification.title}
                onChangeText={(props) => {
                    setPrivateNotification({
                        ...privateNotification,
                        title: props
                    })
                }}
            />
            <TextInput
                label={'Send to'}
                outlineColor={'#1A5CAC'}
                activeOutlineColor={'#1A5CAC'}
                selectionColor={'#1A5CAC'}
                cursorColor={'#1A5CAC'}
                mode={"outlined"}
                style={styles.textInput}
                // placeholder="Send to"
                value={searchText}
                onChangeText={(props) => {
                    setSearchText(props)
                    onSearch(props)
                }}
                onTouchStart={showAll}
            />
            {
                searching &&
                <SearchDropDown
                    onPress={handleDropdown}
                    dataSource={filtered} />
            }
            {
                !searching &&
                <>
                    <TextInput
                        outlineColor={'#1A5CAC'}
                        activeOutlineColor={'#1A5CAC'}
                        selectionColor={'#1A5CAC'}
                        cursorColor={'#1A5CAC'}
                        mode={"outlined"}
                        multiline={true}
                        numberOfLines={10}
                        style={styles.textArea}
                        placeholder='Content'
                        value={privateNotification.content}
                        onChangeText={(props) => {
                            setPrivateNotification({
                                ...privateNotification,
                                content: props
                            })
                        }}
                    />
                </>
            }
            <TouchableHighlight style={styles.sendButton} onPress={handleSend}>
                <Text style={styles.buttonText}>Send</Text>
            </TouchableHighlight>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        // justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: 5,
    },
    textInput: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 5,
        height: scale(40),
        fontSize: scale(12),
    },
    textArea: {
        backgroundColor: '#white',
        width: '100%',
        borderRadius: 5,
        // height: windowHeight-scale(80),
        // textAlignVertical: "top",
        // flexWrap: 'wrap',
        fontSize: scale(12),
        fontWeight: 'bold',
    },
    sendButton: {
        position: 'absolute',
        bottom: scale(30),
        height: scale(50),
        width: scale(150),
        borderRadius: 50,
        backgroundColor: '#83ACDC',
        justifyContent: 'center',
    },
    buttonText: {
        alignSelf: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: scale(16)
    }
});
export default SendNotice