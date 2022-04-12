import React, { useState } from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Drawer from "react-bottom-drawer";
import axios from 'axios';
import { Alert, StyleSheet, Text, Pressable, View } from "react-native";
import Modal from "react-native-modal";

export default function WorkoutCalendar(props) {

  const [workOut, setWorkOut] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(false);

  function getDayData(d) {   
  var ctr = 0;
  while (ctr<props.workout_data.length){
    if(props.workout_data[ctr].date===d.dateString){
      return props.workout_data[ctr].activity_data.workOut;
    }
    ctr++;
  }
  return 'empty';
}

function submitNewEatingData(){
  var json = ({
    activity_type : "workout",
    date : date,
    activity_data : {
        workOut : workOut
    }
    });
    var url;
        if(process.env.NODE_ENV=='production')
            url='';
        else
            url='http://localhost:3000'
console.log(JSON.stringify(json))
  axios.post(url+'/Activity/edit', json,{ withCredentials: true },{
        headers: {'Content-Type': 'application/json'}})
      .then(
        setTimeout(() => {
          props.updateData()
       }, 500)

        
        );
        setModalVisible(false);
  
}
function getDataforScroll(){
    var today = new Date();
    var month = today.getMonth()+5;
    var year = today.getFullYear();
    return year+'-'+month+'-01'
  }
  

function handleClickDay(d){

    setModalVisible(true);
  setDate(d.dateString);
}

const styles = StyleSheet.create({
    centeredView: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });


      return (
        <div>
        <CalendarList
      style={{height:'600px'}}
        dayComponent={({date, state}) => {
          return (
           
              <div onClick={() => {handleClickDay(date)}} style={{textAlign: 'center'}}>{getDayData(date)}</div>
           
          );
        }}

  theme={{
    backgroundColor: '#ccc',
    'stylesheet.calendar.main': {
      dayContainer: {
        borderBottomWidth:'2px',
        borderBottomColor:'black',
        borderTopWidth:'2px',
        borderTopColor:'black',
        borderLeftWidth:'1px',
        borderLeftColor:'black',
        borderRightWidth:'1px',
        borderRightColor:'black',
        flex: 1,
        alignItems: 'center',
        height:'60px'
      
      }
    }
  }}


         // Callback which gets executed when visible months change in scroll view. Default = undefined
   // Max amount of months allowed to scroll to the past. Default = 50
   pastScrollRange={10}
   // Max amount of months allowed to scroll to the future. Default = 50
   futureScrollRange={4}
   // Enable or disable scrolling of calendar list
   scrollEnabled={true}
   // Enable or disable vertical scroll indicator. Default = false
   showScrollIndicator={true}
  
 />



            <Modal
         onBackdropPress={() => {setModalVisible(!modalVisible)}}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <form onChange={e=>setWorkOut(e.target.value)}>
              <div>Followed diet?</div>
                <input type="radio" value="cardio" name="followedDiet"/> Cardio
                <input type="radio" value="strength" name="followedDiet"/> Strength
            </form>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => submitNewEatingData()}
            >
              <Text style={styles.textStyle}>Save</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
            </div>
          )
      }


