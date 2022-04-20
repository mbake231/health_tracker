import React, { useState } from 'react';
import axios from 'axios';

export default function VerifyOTP(props) {

    const [OTP, setOTP] = useState("");


  function submitOTP(){
    var jsonPhone = ({
        phone:props.phone,
        hash:props.hash,
        otp:OTP
      
    });
    var url;
        if(process.env.NODE_ENV=='production')
            url='';
        else
            url='http://localhost:3000'
    axios.post(url+'/verifyOTP', jsonPhone,{ withCredentials: true },{
        headers: {'Content-Type': 'application/json'}})
      .then(res => {
        const res_data = res.data;
        console.log(res_data)
        window.location.href='/';

      })
  }

 function handleChange(e){
    setOTP(e.target.value)
}


return(<div style={{textAlign:'center',textSize:'40px'}}> 
     
    <h1 style={{paddingTop:'30px',fontWeight:'bold',fontSize:'30px', fontFamily: 'Source Sans Pro', fontFamily:'S'}}>Verify the code sent to your phone</h1> <br/><br/><br/>

    <input
    type="text"
    value={OTP}
    onChange={e=>handleChange(e)}
    style={{margin:'0 auto',
        width:'300px'
        }}
 /><br/><br/>

 <button onClick={e=>submitOTP()}>Submit OTP </button>
 <br/><br/><br/><br/>Dev stuff
 Hash={props.hash}<br></br>
 Phone={props.phone}<br></br>
 OTP={props.otp}
 </div>);

}
