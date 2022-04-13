import React, { Component } from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import axios from 'axios';
import { Alert, StyleSheet, Text, Pressable, View } from "react-native";
import Modal from "react-native-modal";
import AlcoholDay from './AlcoholDay';
import CalModals from './CalModals';
import { cos } from 'react-native-reanimated';

export class MyCalendar extends Component {

   
      state = {
        calendarType:null,
        clickedDate:null,
        modalVisible:false,
        calTheme:{
        backgroundColor: '#ccc',
        'stylesheet.calendar.main': {
          dayContainer: {
            borderBottomWidth: '2px',
            borderBottomColor: 'black',
            borderTopWidth: '2px',
            borderTopColor: 'black',
            borderLeftWidth: '1px',
            borderLeftColor: 'black',
            borderRightWidth: '1px',
            borderRightColor: 'black',
            flex: 1,
            alignItems: 'center',
            height: '60px'

          }
        }
      },
    modalStyles:StyleSheet.create({
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
      })

    };


     

componentDidMount(){
    this.setState({calendarType:this.props.calendarType});
}

formatDayData(){

}

closeModal(){
  this.setState({modalVisible:false});
}

handleClickDay(date){
  this.setState({clickedDate:date.dateString});
  this.setState({modalVisible:!this.state.modalVisible});
  
}

getDayDiv(d) {

  var emptyDivState = 
  <View style={{ height: '99%', width: '99%' }} >
    <div onClick={() => { this.handleClickDay(d) }} style={{ height: '100%', width: '100%', backgroundColor: '#ccc' }}></div>
  </View>
  

    if(this.state.calendarType==='alcohol') {
    var ctr = 0;
    while (ctr < this.props.alcohol_data.length) {
      if (this.props.alcohol_data[ctr].date === d.dateString) {
        return (<AlcoholDay dayData={this.props.alcohol_data[ctr].activity_data.alcoholDrinksHad}> 
            
          </AlcoholDay>);
      }
      ctr++;
    }
    return emptyDivState;
  }

  else if(this.state.calendarType==='diet') {
    var ctr = 0;
    while (ctr<this.props.diet_data.length){
        if(this.props.diet_data[ctr].date===d.dateString){
        return this.props.diet_data[ctr].activity_data.followedDiet+this.props.diet_data[ctr].activity_data.fastEnded;
        }
        ctr++;
    }
    return emptyDivState;
  }

  else if(this.state.calendarType==='workout') {
    var ctr = 0;
     while (ctr<this.props.workout_data.length){
    if(this.props.workout_data[ctr].date===d.dateString){
      return this.props.workout_data[ctr].activity_data.workOut;
    }
    ctr++;
  }
  return emptyDivState;
  }

}


render(){
    return(<div>
       <CalModals updateData={this.props.updateData} closeModal={this.closeModal.bind(this)} clickedDate={this.state.clickedDate} modalVisible={this.state.modalVisible} calType={this.state.calendarType}></CalModals>
         <CalendarList
        style={{ height: '600px' }}
        dayComponent={({ date, state }) => {
          return (
            <div style={{ height: 'inherit', width: '100%' }}>
                  <div style={{ height: 'inherit', width: '100%' }} onClick={() => { this.handleClickDay(date) }} >
                      {this.getDayDiv(date)}
                  </div>
              
            </div>
          );
        }}

        theme={this.state.calTheme}

        // Callback which gets executed when visible months change in scroll view. Default = undefined
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={4}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={4}
        // Enable or disable scrolling of calendar list
        scrollEnabled={true}
        // Enable or disable vertical scroll indicator. Default = false
        showScrollIndicator={true}

      />
     
    </div>)
}

}

export default MyCalendar