import React, { useState } from 'react';
import axios from 'axios';

export default function SubmitPhone(props) {

    const [phone, setPhone] = useState("+19738790000");


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
                //production method
               // props.handlePhoneSubmit(res_data.phone,res_data.hash,res_data.otp);

               //dev method
                props.devhandlePhoneSubmit(res_data.phone,res_data.hash,res_data.otp);
                console.log(res_data.phone,res_data.hash);
            }
                
          })
    
      } 


 function handleChange(e){
    setPhone(e.target.value)
}


return(<div> 
    Welcome! To sign in or join enter your phone number below<br/><br/><br/>
    <input
    type="phone"
    value={phone}
    onChange={e=>handleChange(e)}
 />

 <button onClick={e=>submitPhone()}>Submit phone number</button>
 </div>);

}
