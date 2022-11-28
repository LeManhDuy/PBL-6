import { View, Modal, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters';
import { COLORS } from '../constants';
const ListPupilModal = (props) => {
  const { data } = props
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.show}
      onRequestClose={props.handleClose}
    >
      <TouchableWithoutFeedback onPress={props.handleClose}>
        <View style={styles.container}>
          <View style={styles.modalView}>
            {data ?
              <>
                {data.map(item => {
                  return (
                    <TouchableOpacity
                      key={item.key}
                      style={styles.selectLine}
                      onPress={() => props.handleSelect(item)}
                    >
                      <Text style={styles.nameText}>{item.name}</Text>
                    </TouchableOpacity>
                  )
                })}
              </>
              : <Text>Empty</Text>}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //   height: 340,
    marginTop: 22,
    color: 'red',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    backgroundColor: '#F5F4F9',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%'
  },
  selectLine: {
    alignSelf: 'center',
    width: '80%',
    paddingVertical: scale(12),
    backgroundColor: '#83acdc',
    borderRadius: 14,
    marginBottom: 5,
    borderColor: '#83acdc',
    // borderColor: 'blue',
    alignItems: 'center'
  },
  nameText: {
    fontSize: scale(15),
    color: '#fff',
    fontWeight: 'bold',
  }

});

export default ListPupilModal