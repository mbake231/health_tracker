import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Alert, StyleSheet, Text, Pressable, View } from "react-native";
import Modal from "react-native-modal";
import Cookies from 'js-cookie'


export default function Tutorial(props) {

 //const [cookies, setCookie] = useCookies(['tutorialComplete']);
  const [tutorialStep, setTutorialStep] = useState(0);


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

 
function endTutorial(){
    Cookies.set('tutorialComplete',true);
    props.toggleTutorialModal();

}




var tutorialContent = [ <View style={styles.modalView}>
    <form onChange={e => setDrinkValue(e.target.value)}>
      <div>Welcome to Health Tracker! Here is a quick overview of how to use the app.</div>
      <Pressable
      style={[styles.button, styles.buttonClose]}
      onPress={() => setTutorialStep(tutorialStep+1)}
    >
      <Text style={styles.textStyle}>Next</Text>
    </Pressable>
      
    </form>
    <br></br>
    
  </View>,

<View style={styles.modalView}>
<form onChange={e => setDrinkValue(e.target.value)}>
  <div>Recording daily data is simple. Choose the category tab at the top, and then click the day you want to record data for.</div>
  <Pressable
  style={[styles.button, styles.buttonClose]}
  onPress={() => setTutorialStep(tutorialStep+1)}
>
  <Text style={styles.textStyle}>Next</Text>
</Pressable>
</form>
<br></br>
</View>,

<View style={styles.modalView}>
<form onChange={e => setDrinkValue(e.target.value)}>
  <div>Use the menu in the top left to access our Guides. Spend time reading and rereading them to become familiar with how the program works.</div>
  <Pressable
  style={[styles.button, styles.buttonClose]}
  onPress={() => setTutorialStep(tutorialStep+1)}
>
  <Text style={styles.textStyle}>Next</Text>
</Pressable>
</form>
<br></br>
</View>,

<View style={styles.modalView}>
<form onChange={e => setDrinkValue(e.target.value)}>
  <div>We'll send you reminders to keep this top of mind, but remember this is a lifelong journey, not a temporary quick fix.</div>
  <Pressable
  style={[styles.button, styles.buttonClose]}
  onPress={() => endTutorial()}
>
  <Text style={styles.textStyle}>Done</Text>
</Pressable>
</form>
<br></br>
</View>
  

];


      // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
      return (
           <Modal
        animationType="slide"
        onBackdropPress={() => {props.closeModal() }}
        transparent={true}
        visible={props.showTutorial}
        onRequestClose={() => {
          props.closeModal()
        }}

      >
        <View style={styles.centeredView}>
            {tutorialContent[tutorialStep]}
            
          
        </View>
        
      </Modal>
      );
    
  }

