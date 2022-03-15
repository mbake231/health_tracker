import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";


export class API extends Component {

    
    
  state = {
    hash:null,
    value:"h",
    otp:0

  };

  home(){
    axios.post('http://localhost:3000/home',{ withCredentials: true },{
        headers: {'Content-Type': 'application/json'}})
      .then(res => {
        const res_data = res.data;
        console.log(res_data)
      })

  }

  sendOTP(){
    var jsonPhone = ({
        phone:'+19738791234',
        hash:this.state.hash,
        otp:this.state.value
      
    });
    axios.post('http://localhost:3000/verifyOTP', jsonPhone,{ withCredentials: true },{
        headers: {'Content-Type': 'application/json'}})
      .then(res => {
        const res_data = res.data;
        console.log(res_data)
        console.log(!res_data.registered)

        if(!res_data.registered)
        window.location.href='/register';

      })
  }

  handleChange(e){
      this.setState({value:e.target.value})
  }

  txtOTP(){

    var jsonPhone = ({
        phone:'+19738791234'
        });

      axios.post('http://localhost:3000/sendOTP',jsonPhone,{ withCredentials: true }, {
        headers: {'Content-Type': 'application/json'}})
      .then(res => {
        const res_data = res.data;
        this.setState({hash:res_data.hash})
        if (res_data.otp)
            this.setState({value:res_data.otp})
        console.log(res_data)
      })
  }
  componentDidMount() {


      
  }


  render() {
    return (<div> 
        
      <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
         />
         <button onClick={this.sendOTP.bind(this)}>submit code</button>;
         <button onClick={this.txtOTP.bind(this)}>get code</button>;
         <button onClick={this.home.bind(this)}>try login</button>;

        {this.state.hash}
    </div>

    );
  }
}
export default API