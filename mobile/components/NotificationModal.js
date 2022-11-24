import { View, Modal, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters';
import { COLORS } from '../constants';
const NotificationModal = (props) => {
    return(
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.show}
        onRequestClose={props.handleChange}
      >
        <TouchableWithoutFeedback onPress={props.handleChange}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {props.data?
            <> 
            <View style={styles.titleContainer}>
                    {!props.isPublic? 
                    <View>
                        <Text style={styles.contactText}>
                            {props.data.sender? 'To: '+props.data.teacherName: 'From: '+props.data.teacherName}
                        </Text>
                    </View> 
                    : null
                    }
                    <View>
                        <Text style={styles.dateText}> {new Date(props.data.date).toLocaleString()} </Text>
                    </View> 
                    <View>
                        <Text style={styles.titleText}> {props.data.title} </Text>
                    </View>
            </View>
            <View style={{paddingTop: scale(10)}}>
                    <Text style={styles.contentText}>{props.data.content}</Text>
            </View>
            </>
            : <Text>None</Text> }
            
          </View>
        </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
}
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
      // alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    titleContainer:{
      justifyContent: 'space-evenly',
      // backgroundColor: COLORS.gray,
      // width: "90%",
      paddingBottom: scale(10),
      borderBottomWidth: 2
    },
    dateText:{
        color: '#fd5d5d',
        fontWeight: 'bold',
        fontSize: scale(10)
    },
    titleText: {
        fontWeight: 'bold',
        color: '#1473e6',
        fontSize: scale(12)
    },
    contentText: {
        color: COLORS.gray,
        fontSize: scale(12)
    },
    contactText: {
        color: '#1473e6',
        fontSize: scale(12),
        fontWeight: 'bold'
    }
  });

export default NotificationModal