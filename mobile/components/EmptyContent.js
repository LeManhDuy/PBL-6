import React from "react";
import { Text, View } from "react-native";
import { scale } from "react-native-size-matters";
const EmptyContent = () => {
    return (
        <View 
            style={{
                width:'100%',
                height: '100%',
                justifyContent:'center',
                // backgroundColor:'gray'
                }}>
            <Text style={{
                alignSelf:'center',
                fontSize: scale(20)
            }}>
                Empty
            </Text>
        </View>
    )
}

export default EmptyContent