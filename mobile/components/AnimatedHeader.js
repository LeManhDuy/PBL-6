import React from 'react';
import { Animated, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
const HEADER_HEIGHT = 30;
const AnimatedHeader = ({ animatedValue, buttonText, handlePress, isDisable }) => {
    const insets = useSafeAreaInsets();
    // console.log('a',animatedValue)
    // const headerHeight = animatedValue.interpolate({
    //     inputRange: [0, HEADER_HEIGHT],
    //     outputRange: [HEADER_HEIGHT+insets.top+scale(22), insets.top],
    //     extrapolate: 'clamp'
    //   });
    const ButtonHeight = animatedValue.interpolate({
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [HEADER_HEIGHT+insets.top+2, insets.top],
        extrapolate: 'clamp'
      });
    const headerPadding = animatedValue.interpolate({
        inputRange: [0, scale(16)],
        outputRange: [scale(16), 0],
        extrapolate: 'clamp'
      });
    // const headerOpacity = animatedValue.interpolate({
    //     inputRange: [0, 20],
    //     outputRange: [1, 0],
    //     extrapolate: 'clamp'
    //   });
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    // console.log(headerHeight) 
    const styles = StyleSheet.create({
        button:{
            borderWidth: 2,
            width: '70%',
            // alignSelf: 'center',
            marginTop: 12,
            paddingVertical: headerPadding,
            borderRadius: 14,
            position: 'absolute',
            top: 0,
            left: scale(50),
            right: scale(50),
            height: ButtonHeight,
            // opacity: headerOpacity
            // backgroundColor: 'lightblue'
        },
        buttonText:{
            alignSelf: 'center',
            fontSize: scale(14),
            // opacity: headerOpacity
        }
    })
      return (
        // <Animated.View style={{
        //     position: 'absolute',
        //     top: 0,
        //     left: 0,
        //     right: 0,
        //     zIndex: 10,
        //     height: headerHeight,
        //     backgroundColor: 'lightblue'
        //   }}>
            <AnimatedTouchable disabled={animatedValue>0} style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText} >
                    {buttonText}
                </Text>
            </AnimatedTouchable>
        // </Animated.View>
      );
};



export default AnimatedHeader;