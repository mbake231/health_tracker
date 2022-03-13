import React, { Component } from 'react';
import axios from 'axios';


export class API extends Component {
    state = {
        user_api:null,
        acct_api:null

      };

     
      componentDidMount(){

        //test user api
        axios.get('http://localhost:3000/User',{params:{uid:'12345'},})
        .then(res => {
          const res_data = res.data;
          this.setState({user_api:JSON.stringify(res.data)})
          console.log(res_data)
        })

        //test account api
        axios.get('http://localhost:3000/Account',{params:{uid:'12345'},})
        .then(res => {
          const res_data = res.data;
          this.setState({acct_api:JSON.stringify(res.data)})
          console.log(res_data)
        })

 
  
      }


  render() {
    return (<div>
      USER API<br/><br/>{this.state.user_api}<br/><br/>
       <br/><br/>ACCT API<br/><br/><br/>{this.state.acct_api}
    </div>
      
    );
  }
}
export default API