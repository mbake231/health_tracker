import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import SubmitPhone from '../components/SubmitPhone.jsx';
import VerifyOTP from '../components/VerifyOTP.jsx';

export class Welcome extends Component {

    
    
  state = {
    view:'submitPhone',
    phone:null,
    hash:null,
    otp:null

  };

  handlePhoneSubmit(phone,hash) {
         this.setState({hash:hash});
        this.setState({phone:phone});
        this.setState({view:'submitOTP'});
  }

  devhandlePhoneSubmit(phone,hash,otp) {
    this.setState({hash:hash});
   this.setState({phone:phone});
   this.setState({otp:otp});
   this.setState({view:'submitOTP'});
}

  componentDidMount() {


      
  }


  render() {
    return (<div> 
        {(this.state.view==='submitPhone'?
        
       
        <SubmitPhone handlePhoneSubmit={this.handlePhoneSubmit.bind(this)} devhandlePhoneSubmit={this.devhandlePhoneSubmit.bind(this)}></SubmitPhone> :
        <VerifyOTP phone={this.state.phone} hash={this.state.hash} otp={this.state.otp}></VerifyOTP>
        )}
    </div>

    );
  }
}
export default Welcome