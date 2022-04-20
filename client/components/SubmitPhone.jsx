import React, { useState } from 'react';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function SubmitPhone(props) {

    const [phone, setPhone] = useState('');


  function submitPhone(){
        var jsonPhone = ({
            phone:phone
            });
            var url;
            if(process.env.NODE_ENV=='production')
                url='';
            else
                url='http://localhost:3000'
                
          axios.post(url+'/sendOTP',jsonPhone,{ withCredentials: true }, {
            headers: {'Content-Type': 'application/json'}})
          .then(res => {
            const res_data = res.data;
            if (res_data.otp) {
                

               //dev method
                props.devhandlePhoneSubmit(res_data.phone,res_data.hash,res_data.otp);
                //console.log(res_data.phone,res_data.hash);
            }
            else if(res_data){
                //production method
                props.handlePhoneSubmit(res_data.phone,res_data.hash);
            }
                
          })
    
      } 


 function handleChange(e){
     console.log(e)
    setPhone(e)
}


return(<div style={{textAlign:'center',textSize:'40px'}}> 
    <h1 style={{paddingTop:'30px',fontWeight:'bold',fontSize:'30px', fontFamily: 'Source Sans Pro', fontFamily:'S'}}>Welcome!</h1> <br/>
    <div style={{paddingTop:'30px',fontWeight:'bold',fontSize:'30px', fontFamily: 'Source Sans Pro', fontFamily:'S'}}>To join or sign in enter your phone number below<br/><br/><br/>

 <PhoneInput
  country={'us'}
  value={phone}
  onChange={(e)=>handleChange(e)}
    style={{margin:'0 auto',
        width:'300px'
        }}
/></div>
<br/><br/>
 <button onClick={e=>submitPhone()}>Submit</button>
 </div>);

}
