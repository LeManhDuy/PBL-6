import { Image, Text, View, StyleSheet, Animated, TouchableOpacity, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import StudentService from "../config/service/StudentService";
import ScoreService from "../config/service/ScoreService";
import CommentService from "../config/service/CommentService";
import React, { useState, useEffect, useRef } from "react";
import { scale } from 'react-native-size-matters';
import ListPupilModal from '../components/ListPupilModal';
import { AnimatedHeader, EmptyContent } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { assets } from '../constants';
import { ActivityIndicator } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/core';
const Score = () => {
    const [pupilsInfo, setPupilsInfo] = useState()
    const [state, setState] = useState(false)
    const [selectPupil, setSelectPupil] = useState(false)
    const [buttonText, setButtonText] = useState('Select Student')
    const [scoreInfo, setScoreInfo] = useState()
    const [showScore, setShowScore] = useState()
    useEffect(() => {
        getPupilsInfo()
    }, [state])
    useFocusEffect(
        React.useCallback(() => {
            getPupilsInfo()
        }, [state])
      );
    const getPupilsInfo = async () => {
        const account_data = JSON.parse(await AsyncStorage.getItem('@Login'))
        let studentData = []
        if (account_data) {
            console.log(account_data.AccountId)
            await StudentService.getPupilByParentId(account_data.AccountId)
                .then((response) => {
                    studentData = response.getPupilInfor.map(
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
                    const dataSourcesSorted = [...studentData].sort((a, b) => a.name > b.name ? 1 : -1,);
                    setPupilsInfo(dataSourcesSorted);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        let dataNew = [];
        for (let item of studentData) {
            let checkSubject = false;
            let dataSources = [];
            let detail = {};
            let summary = {
                id: "",
                content: "",
            };
            await ScoreService.getSubjectByPupilID(item.id)
                .then((res) => {
                    if (!res.success) {
                        checkSubject = true;
                    }
                    dataSources = res.result.map((item, index) => {
                        return {
                            key: index + 1,
                            subject_id: item.subject_id ? item.subject_id : "",
                            name: item.subject_name ? item.subject_name : "",
                            score_id: item._id ? item._id : "",
                            midterm_score: item.midterm_score
                                ? item.midterm_score
                                : "",
                            final_score: item.final_score
                                ? item.final_score
                                : "",
                            result: item.result ? item.result : "",
                            last_update: item.last_update
                                ? item.last_update.split("T")[0]
                                : "YYYY-MM-DD",
                        };
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
            if (!checkSubject) {
                await CommentService.getCommentByPupilID(item.id)
                    .then((res) => {
                        summary = {
                            id: res.pupilComment[0]
                                ? res.pupilComment[0]._id
                                : "",
                            content: res.pupilComment[0]
                                ? res.pupilComment[0].comment_content
                                : "-",
                            behavior: res.pupilComment[0]
                                ? res.pupilComment[0] === "Excellent" ||
                                    res.pupilComment[0] === "Good"
                                    ? "Good"
                                    : res.pupilComment[0] === "Passed"
                                        ? "Passed"
                                        : "Need to try more."
                                : "-",
                        };
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                detail = {
                    key: item.key,
                    student: item,
                    score: dataSources,
                    summary: summary,
                    check: checkSubject,
                };
            } else {
                detail = {
                    key: item.key,
                    student: item,
                    check: checkSubject,
                };
            }
            dataNew.push(detail);
        }
        setScoreInfo(dataNew);
    };
    const handlePress = () => {
        Animated.timing(offset, {
            toValue: 0,
            duration: 100,
            useNativeDriver: false
        }).start();
        setSelectPupil(true)
    }
    const handleSelect = (props) => {
        setSelectPupil(false)
        setButtonText(props.name + ' - ' + props.class)
        const filtered = scoreInfo.filter(x => {
            return x.student.id == props.id
        })
        setShowScore(filtered[0])
        console.log(filtered[0])

    }

    const offset = useRef(new Animated.Value(0)).current;
    const marginScroll = offset.interpolate({
        inputRange: [0, scale(70)],
        outputRange: [scale(58), scale(14)],
        extrapolate: 'clamp'
    });
    const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
    if (pupilsInfo && scoreInfo) {
        // {console.log('SC',scoreInfo)}
        return (
            <SafeAreaView style={styles.container}>
                <ListPupilModal show={selectPupil} data={pupilsInfo}
                    handleClose={() => setSelectPupil(false)}
                    handleSelect={handleSelect} />
                <AnimatedHeader animatedValue={offset} buttonText={buttonText} handlePress={handlePress} />
                {showScore ?
                    <>
                        <AnimatedScrollView
                            onScroll={
                                Animated.event(
                                    [{ nativeEvent: { contentOffset: { y: offset } } }],
                                    { useNativeDriver: false }
                                )
                            }
                            style={{
                                marginTop: marginScroll, marginBottom: 20
                            }}
                        >
                            <View style={styles.dataContainer}>
                                <View style={styles.commentContainer}>
                                    <View style={styles.commentLine}>
                                        <Text style={styles.dateTextContainer}>Behavior</Text>
                                        <Text style={styles.dateTextContainerSub}>
                                            {showScore.summary.behavior}
                                        </Text>
                                    </View>
                                    <View style={styles.commentLine}>
                                        <Text style={styles.dateTextContainer}>Perfomance</Text>
                                        <Text style={styles.dateTextContainerSub}>
                                            {showScore.summary.content}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.scoreContainer}>
                                    {showScore.score.map((item) => {
                                        return (
                                            <View key={item.key} style={styles.singleSubject}>
                                                <Text style={styles.SubjectNameText}>{item.name}</Text>
                                                <View style={styles.ScoreLine}>
                                                    <Text style={styles.ScoreLabel}>Midterm Score</Text>
                                                    <Text style={styles.ScoreNumber}>{item.midterm_score}</Text>
                                                </View>
                                                <View style={styles.ScoreLine}>
                                                    <Text style={styles.ScoreLabel}>Final Score</Text>
                                                    <Text style={styles.ScoreNumber}>{item.final_score}</Text>
                                                </View>
                                                <View style={styles.ScoreLine}>
                                                    <Text style={styles.ScoreLabel}>Average</Text>
                                                    <Text style={styles.ScoreNumber}>{item.result}</Text>
                                                </View>
                                                <View style={styles.ScoreLine}>
                                                    <Text style={styles.ScoreLabel}>Last Update</Text>
                                                    <Text style={styles.ScoreNumber}>{item.last_update}</Text>
                                                </View>
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>
                        </AnimatedScrollView>
                    </>
                    : <EmptyContent/>
                }

            </SafeAreaView>
        )
    }
    else {
        return (
            <View style={{
                width:'100%',
                height: '100%',
                justifyContent:'center',}}>
                <ActivityIndicator size={'large'} color={'#1A5CAC'}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    dataContainer: {
        alignSelf: 'center',
        width: '90%',
    },
    dateTextContainer: {
        fontSize: scale(15),
        marginBottom: 12,
        color: '#1A5CAC',
        borderColor: '#83acdc',
        fontWeight: 'bold'
    },
    dateTextContainerSub: {
        fontSize: scale(15),
        marginBottom: 12,
        color: '#DF0846',
        borderColor: '#83acdc',
        fontWeight: 'bold'
    },
    commentContainer: {
        borderColor: '#1A5CAC',
        padding: scale(10),
        borderRadius: 14,
        marginBottom: 20,
        borderBottomWidth: 1.5,
        borderWidth: 1.5,
        backgroundColor: '#F5F4F9',
    },
    commentLine: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    scoreContainer: {

    },
    singleSubject: {
        borderColor: '#1A5CAC',
        padding: scale(13),
        borderRadius: 14,
        marginBottom: 20,
        borderBottomWidth: 1.5,
        borderWidth: 1.5,
        backgroundColor: '#F5F4F9',
    },
    SubjectNameText: {
        fontSize: scale(15),
        marginBottom: 12,
        borderColor: '#1A5CAC',
        fontWeight: 'bold',
        borderBottomWidth: 1.5,
        color: '#1A5CAC',
    },
    ScoreLine: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    ScoreLabel: {
        //fontWeight: 'bold',
        fontSize: scale(14),
        color: '#1A5CAC',
    },
    ScoreNumber: {
        fontSize: scale(14),
        fontWeight: 'bold',
        color: '#DF0846',
    }
})

export default Score