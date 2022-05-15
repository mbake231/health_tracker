import React, { Component } from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import axios from 'axios';
import { Alert, StyleSheet, Text, Pressable, View } from "react-native";
import Modal from "react-native-modal";
import FormattedDay from './FormattedDay';
import CalModals from './CalModals';
import { cos } from 'react-native-reanimated';

export class MyCalendar extends Component {

   
      state = {
        calendarType:null,
        todaysDate:null,
        clickedDate:null,
        clickedDateData:null,
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


    _refCalendarList = ref => (this._calendarList = ref);


componentDidMount(){
    
  let newDate = new Date();
  
      let day = newDate.getDate();
      let month = newDate.getMonth() + 1;
      let year = newDate.getFullYear();
      var todaysDate=year+'-'+('0' + month).slice(-2)+'-'+('0' + day).slice(-2);
    setTimeout(() => {
      this._calendarList.scrollToMonth(year+'-'+('0' + month).slice(-2));
    });
    this.setState({calendarType:this.props.calendarType});
    this.setState({todaysDate:todaysDate});


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

//decomissioned
 getDayData(calendarType,d) {  


    if(calendarType==='alcohol' && this.props.acct_activity_data) {
    var ctr = 0;
  
    while (ctr < this.props.acct_activity_data.length) {
      if (this.props.acct_activity_data[ctr].date === d) {
        return this.props.acct_activity_data[ctr].activity_data.alcoholDrinksHad;
      }
      ctr++;
    }
    return null;
  }

  else if(calendarType==='diet' && this.props.acct_activity_data) {
    var ctr = 0;
    if( this.props.acct_activity_data.length)
    while (ctr<this.props.acct_activity_data.length){
        if(this.props.acct_activity_data[ctr].date===d){
          return this.props.acct_activity_data[ctr].activity_data.followedDiet+this.props.acct_activity_data[ctr].activity_data.fastEnded;   
            
        
        }
        ctr++;
    }
    return null;
  }

  else if(calendarType==='workout' && this.props.acct_activity_data) {
    var ctr = 0;
    if( this.props.acct_activity_data.length)
     while (ctr<this.props.acct_activity_data.length){
    if(this.props.acct_activity_data[ctr].date===d){
      return this.props.acct_activity_data[ctr].activity_data.workOut;
    }
    ctr++;
  }
  return null;
  }

}

getDayDiv(d) {

  var bgColor = '#eeeeee'
  var isToday=false;
  if(d.dateString===this.state.todaysDate) {
    isToday=true;
    bgColor = '#00FFFF'
    }

  var emptyDivState = 
  <View style={{ height: '99%', width: '99%' }} >
    <div onClick={() => { this.handleClickDay(d) }} style={{ height: '95%', width: '100%', backgroundColor:bgColor }}></div>
  </View>
  

    if(this.state.calendarType==='alcohol' && this.props.acct_activity_data) {
    var ctr = 0;
  
    while (ctr < this.props.acct_activity_data.length) {
      if (this.props.acct_activity_data[ctr].date === d.dateString) {
        return (<FormattedDay isToday={isToday} calendarType={this.props.calendarType} dayData={this.props.acct_activity_data[ctr].activity_data.alcoholDrinksHad}>    
          </FormattedDay>);
      }
      ctr++;
    }
    return emptyDivState;
  }

  else if(this.state.calendarType==='diet' && this.props.acct_activity_data) {
    var ctr = 0;
    if( this.props.acct_activity_data.length)
    while (ctr<this.props.acct_activity_data.length){
        if(this.props.acct_activity_data[ctr].date===d.dateString){
          return (<FormattedDay isToday={isToday} calendarType={this.props.calendarType} dayData={this.props.acct_activity_data[ctr].activity_data.followedDiet+this.props.acct_activity_data[ctr].activity_data.fastEnded}>    
            </FormattedDay>);
        
        }
        ctr++;
    }
    return emptyDivState;
  }

  else if(this.state.calendarType==='workout' && this.props.acct_activity_data) {
    var ctr = 0;
    if( this.props.acct_activity_data.length)
     while (ctr<this.props.acct_activity_data.length){
    if(this.props.acct_activity_data[ctr].date===d.dateString){
      return (<FormattedDay isToday={isToday} calendarType={this.props.calendarType} dayData={this.props.acct_activity_data[ctr].activity_data.workOut}>    
        </FormattedDay>);
    }
    ctr++;
  }
  return emptyDivState;
  }

}


render(){
    return(<div>
       <CalModals clickedDateData={this.state.clickedDateData} acct_activity_data={this.props.acct_activity_data} updateData={this.props.updateData} closeModal={this.closeModal.bind(this)} clickedDate={this.state.clickedDate} modalVisible={this.state.modalVisible} calType={this.state.calendarType} ></CalModals>
         <CalendarList
         ref={this._refCalendarList}
        style={{ height: '600px' }}
     
        dayComponent={({ date, state }) => {
          return (
            //if not todays date
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