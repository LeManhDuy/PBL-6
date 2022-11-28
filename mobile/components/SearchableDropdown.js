import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    Pressable,
} from 'react-native';
import { scale } from 'react-native-size-matters';

export default function SearchDropDown(props) {
    const { dataSource } = props
    return (
        <View
            style={styles.container}>

            <ScrollView
                style={styles.subContainer}
            >
                <View style={styles.subContainer2}>
                    {
                        dataSource.length ?

                            dataSource.map(item => {
                                return (
                                    <TouchableOpacity
                                        key={item.key}
                                        onPress={() => { props.onPress(item) }}
                                        style={styles.itemView}>
                                        <Text style={styles.itemText}>{item.teacher}</Text>
                                    </TouchableOpacity>
                                )
                            })
                            :
                            <View
                                style={styles.noResultView}>
                                <Text style={styles.noResultText}>No search items matched</Text>
                            </View>
                    }
                </View>
            </ScrollView>
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: scale(80),
        left: 0, right: 0, bottom: 0,
        height: scale(145),
        alignItems: 'center',
    },
    subContainer: {
        width: "100%",
    },
    subContainer2: {
        backgroundColor: '#F5F4F9',
        paddingTop: scale(5),
        marginHorizontal: 20,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        width: "95%",
        //borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    itemView: {
        // marginHorizontal: '10%',
        alignSelf: 'center',
        width: '95%',
        backgroundColor: 'white',
        height: scale(30),
        marginBottom: scale(5),
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#83acdc',
    },
    itemText: {
        color: '#83ACDC',
        fontSize: scale(15),
        paddingHorizontal: 10,
    },
    noResultView: {
        alignSelf: 'center',
        height: scale(145),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    noResultText: {
        fontSize: scale(16),
        fontWeight: 'bold',
        color: 'white'
    },

});