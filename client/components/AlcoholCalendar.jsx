import React, { useState } from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Drawer from "react-bottom-drawer";
import axios from 'axios';

export default function AlcoholCalendar(props) {

  const [drinkValue, setDrinkValue] = useState("");
  const [drawerVisibile, setDrawyerVisible] = useState(false);
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

function submitNewAlcoholData(e){
  e.preventDefault();
  console.log(drinkValue+' '+date);

  var json = ({
    activity_type : "alcohol",
    date : date,
    activity_data : {
        alcoholDrinksHad : drinkValue
    }
    });
console.log(JSON.stringify(json))
  axios.post('http://localhost:3000/Activity/edit', json,{ withCredentials: true },{
        headers: {'Content-Type': 'application/json'}})
      .then(
        setTimeout(() => {
          props.updateData()
       }, 500)

        
        );
  setDrawyerVisible(false);
  
}


function handleClickDay(d){
  console.log(d.dateString)
  setDrawyerVisible(true);
  setDate(d.dateString);
}

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
   onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
   // Max amount of months allowed to scroll to the past. Default = 50
   pastScrollRange={3}
   // Max amount of months allowed to scroll to the future. Default = 50
   futureScrollRange={2}
   // Enable or disable scrolling of calendar list
   scrollEnabled={true}
   // Enable or disable vertical scroll indicator. Default = false
   showScrollIndicator={true}
  
 />
 <Drawer
        isVisible={drawerVisibile}
        >
           <input type="text" value={drinkValue} onChange={e => setDrinkValue(e.target.value)} />
          <button onClick={(e)=>{submitNewAlcoholData(e)}}>Submit</button>
            </Drawer></div>
          )
      }


