import { View, Image, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { COLORS, SIZES, SHADOWS, assets, FONTS } from '../constants'
import React from 'react'
const StoryCard = ({data}) => {
    const navigation = useNavigation();
    return (
    <View style={{
        flex: 1/2,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark,
    }}>
            <View style={{
                width: "100%", height: 350
            }}>
            <Image 
                source={{uri:"https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"}}
                resizeMode='cover'
                style={{
                    width: "100%",
                    height: "100%",
                    borderTopLeftRadius: SIZES.font,
                    borderTopRightRadius: SIZES.font,
                }}
            />
            </View>
            <Text style={{fontFamily:FONTS.bold, fontSize: SIZES.extraLarge, margin: 10}}>
                {data.title}
            </Text>
            <View style={{display:'flex', flexDirection: 'row',justifyContent:'space-between', margin: 20}}>
            <Text style={{fontSize: SIZES.medium, fontStyle:'italic',color:COLORS.gray}}>
                Status: {data.status}
            </Text>
            <Text style={{fontSize: SIZES.medium}}>
                Chapter: {data.number_of_chapter}
            </Text>
            </View>
            <Text style={{fontSize: SIZES.small,color:COLORS.gray, textAlign:'right', marginRight:30}}>
                Read: {data.number_read}
            </Text>
            <View style={{
                width:"100%",
                padding: SIZES.font,
            }}>
            </View>
        </View>
    )
}

export default StoryCard