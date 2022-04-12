import React, { useState,useEffect } from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import axios from 'axios';
import { Alert, StyleSheet, Text, Pressable, View } from "react-native";
import Modal from "react-native-modal";

export default function AlcoholCalendar(props) {


  const [drinkValue, setDrinkValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(false);

  function getDayData(d) {   
  var ctr = 0;
  while (ctr<props.alcohol_data.length){
    if(props.alcohol_data[ctr].date===d.dateString){
      return props.alcohol_data[ctr].activity_data.alcoholDrinksHad;
    }
    ctr++;
  }
  return 'empty';
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


function submitNewAlcoholData(){
  var json = ({
    activity_type : "alcohol",
    date : date,
    activity_data : {
        alcoholDrinksHad : drinkValue
    }
    });
console.log(JSON.stringify(json))
var url;
        if(process.env.NODE_ENV=='production')
            url='';
        else
            url='http://localhost:3000'
  axios.post(url+'/Activity/edit', json,{ withCredentials: true },{
        headers: {'Content-Type': 'application/json'}})
      .then(
        setTimeout(() => {
          props.updateData()
       }, 500)

        
        );
        setModalVisible(false);
  
}



function handleClickDay(d){
  setModalVisible(true);
  setDate(d.dateString);
}

      return (
        <div>
        <CalendarList 
     style={{height:'600px'}}
        dayComponent={({date, state}) => {
          return (
            <div style={{height: 'inherit', width:'100%'}}>
            {(
              getDayData(date)==='empty' ? 
              <View style={{height:'99%',width:'99%'}} >
                <div onClick={() => {handleClickDay(date)}} style={{height: '100%', width:'100%',backgroundColor: '#ccc'}}></div>
              </View>
              :
            <div onClick={() => {handleClickDay(date)}} style={{display: 'flex', margin: 'auto', justifyContent:'center',paddingTop:'15px'}}>{getDayData(date)}</div>
              )}
              </div>
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
   pastScrollRange={0}
   // Max amount of months allowed to scroll to the future. Default = 50
   futureScrollRange={4}
   // Enable or disable scrolling of calendar list
   scrollEnabled={true}
   // Enable or disable vertical scroll indicator. Default = false
   showScrollIndicator={true}
  
 />

            <Modal
        animationType="slide"
        onBackdropPress={() => {setModalVisible(!modalVisible)}}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
       
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <form onChange={e=>setDrinkValue(e.target.value)}>
              <div>Number of drinks</div>
              <input type="text" value={drinkValue} onChange={e => setDrinkValue(e.target.value)} />
            </form>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => submitNewAlcoholData()}
            >
              <Text style={styles.textStyle}>Save</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
            
            
            </div>
          )
      }


