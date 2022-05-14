import React, { useState, useEffect } from 'react';

import ModalTest from './ModalTest.jsx'

export default function FormattedDay(props) {

 
function getBgColor(){
  if(props.isToday)
      return '#00FFFF'
  return '#d6fdd6'
}

function alcoholDayFormats(num){
  

    if(num==0)
    return <div style={{ fontSize:'40px', backgroundColor: getBgColor(),height:'100%',width:'100%' , display: 'flex', margin: 'auto', justifyContent: 'center', paddingTop:'0px' }}>
    &#129304;	
   </div>
   if(num>0)
   return <div style={{ fontWeight:'bold',backgroundColor: getBgColor(),height:'100%',width:'100%' , display: 'flex', margin: 'auto', justifyContent: 'center', paddingTop:'15px'   }}>
   {num}
  </div>


}

function dietDayFormats(data){
  
    if(data=='truetrue')
    return <div style={{ fontSize:'30px', backgroundColor: getBgColor(),height:'100%',width:'100%' , display: 'flex', margin: 'auto', justifyContent: 'center', paddingTop:'7px' }}>
    &#9989;	
   </div>
   else
   return <div style={{ fontSize:'30px',fontWeight:'bold',backgroundColor: getBgColor(),height:'100%',width:'100%' , display: 'flex', margin: 'auto', justifyContent: 'center', paddingTop:'7px'   }}>
   &#10060;
  </div>
}

function workoutDayFormats(data){
      if(data=='strength')
      return <div style={{ fontSize:'30px', backgroundColor: getBgColor(),height:'100%',width:'100%' , display: 'flex', margin: 'auto', justifyContent: 'center', paddingTop:'7px' }}>
      &#127947;	
     </div>
     else if(data=='cardio')
     return <div style={{ fontSize:'30px',fontWeight:'bold',backgroundColor: getBgColor(),height:'100%',width:'100%' , display: 'flex', margin: 'auto', justifyContent: 'center', paddingTop:'7px'   }}>
     &#127939;
    </div>
    
    else
    return <div style={{ fontSize:'30px',fontWeight:'bold',backgroundColor: getBgColor(),height:'100%',width:'100%' , display: 'flex', margin: 'auto', justifyContent: 'center', paddingTop:'7px'   }}>
    &#10060;
    </div>
  }

function routeToRightDayType(type, data){
    if(type==='alcohol')
        return alcoholDayFormats(data);

   else if(type==='diet')
        return dietDayFormats(data);

    else if(type==='workout')
        return workoutDayFormats(data);

}

  return (
   <div style={{  height:'95%',width:'100%' }}>
     {routeToRightDayType(props.calendarType,props.dayData)}
      
    </div>
  )
}


