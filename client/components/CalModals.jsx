import React, { useState } from 'react';
import axios from 'axios';
import { Alert, StyleSheet, Text, Pressable, View } from "react-native";
import Modal from "react-native-modal";


export default function CalModals(props) {

  //alcohol
  const [drinkValue, setDrinkValue] = useState("");

  //workout
  const [workOut, setWorkOut] = useState('');

  //diet
  const [followedDiet, setFollowedDiet] = useState(true);
  const [fastEnded, setFastEnded] = useState(false);

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

  function submitNewData(date) {
    if(props.calType==='alcohol')
        var json = ({
          activity_type: "alcohol",
          date: date,
          activity_data: {
            alcoholDrinksHad: drinkValue
          }
        });
    else if(props.calType==='diet')
        var json = ({
          activity_type : "diet",
          date : date,
          activity_data : {
              followedDiet : followedDiet,
              fastEnded:fastEnded
          }
          });
    else if(props.calType==='workout')
        var json = ({
          activity_type : "workout",
          date : date,
          activity_data : {
              workOut : workOut
          }
          });

    console.log(JSON.stringify(json))
    var url;
    if (process.env.NODE_ENV == 'production')
      url = '';
    else
      url = 'http://localhost:3000'
    axios.post(url + '/Activity/edit', json, { withCredentials: true }, {
      headers: { 'Content-Type': 'application/json',"Access-Control-Allow-Origin": "*" }
    })
      .then(
        setTimeout(() => {
          props.updateData()
        }, 500)
      ).catch(function (error) {
        console.log(error);
      });
    props.closeModal();

  }

  function getModalQuestions(calType){
    console.log(calType)
    if(calType==='alcohol'){
        return <View style={styles.modalView}>
        <form onChange={e => setDrinkValue(e.target.value)}>
          <div>Number of drinks</div>
          <input type="text" value={drinkValue} onChange={e => setDrinkValue(e.target.value)} />
        </form>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => submitNewData(props.clickedDate)}
        >
          <Text style={styles.textStyle}>Save</Text>
        </Pressable>
      </View>

    }
    else if(calType==='diet'){
      return <View style={styles.modalView}>
      <form onChange={e=>setFollowedDiet(e.target.value)}>
          <div>Followed diet?</div>
            <input type="radio" value="true" name="followedDiet"/> True
            <input type="radio" value="false" name="followedDiet"/> False
        </form>
        <div>Ended Fast?</div>
        <form onChange={e=>setFastEnded(e.target.value)}>
            <input type="radio" value="true" name="followedDiet"/> True
            <input type="radio" value="false" name="followedDiet"/> False
        </form>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => submitNewData(props.clickedDate)}
        >
          <Text style={styles.textStyle}>Save</Text>
        </Pressable>
      </View>

    }
    else if(calType==='workout'){
      return <View style={styles.modalView}>
      <form onChange={e=>setWorkOut(e.target.value)}>
          <div>Followed diet?</div>
            <input type="radio" value="cardio" name="followedDiet"/> Cardio
            <input type="radio" value="strength" name="followedDiet"/> Strength
        </form>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => submitNewData(props.clickedDate)}
        >
          <Text style={styles.textStyle}>Save</Text>
        </Pressable>
      </View>

    }



  }


      // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
      return (
           <Modal
        animationType="slide"
        onBackdropPress={() => { props.closeModal() }}
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          props.closeModal()
        }}

      >
        <View style={styles.centeredView}>
          {getModalQuestions(props.calType)}
        </View>
      </Modal>
      );
    
  }

