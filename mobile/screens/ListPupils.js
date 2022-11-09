import { SafeAreaView, View, StyleSheet, Image, Text, FlatList } from "react-native"
import React, {useState, useEffect} from "react";
import { Title } from "react-native-paper";
import { assets, COLORS, FONTS, SIZES } from "../constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import StudentService from "../config/service/StudentService";
import { PupilCard } from "../components";


const ListPupils = ({}) => {
    const [pupilsInfo, setPupilsInfo] = useState()
    const [state, setState] = useState(true)

    useEffect(()=>{
        getPupilsInfo()
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
                            gender: item.pupil_gender,
                            image: item.pupil_image ? item.pupil_image : null,
                            parent: item.parent_id
                                ? item.parent_id.person_id.person_fullname
                                : "Empty",
                            class: item.class_id
                                ? item.class_id.class_name
                                : "Empty",
                            teacher: item.class_id
                                ? item.class_id.homeroom_teacher_id.person_id
                                        .person_fullname
                                : "Empty",
                            grade: item.class_id
                                ? item.class_id.grade_id
                                    ? item.class_id.grade_id.grade_name
                                    : "Empty"
                                : "Empty",
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
    if(pupilsInfo){

        return (
            <SafeAreaView>
                <View style={{ zIndex: 0 }}>
                <FlatList
                    data={pupilsInfo}
                    renderItem={({item})=> <PupilCard data={item} />}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                />
                </View>
            </SafeAreaView>
        )
    }
}

export default ListPupils