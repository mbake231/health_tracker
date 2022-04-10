import React, { Component } from 'react';
import axios from 'axios';


export class REGISTER extends Component {
  state = {
    user_api: null,
    reg_api: null

  };

register(){
    var json = ({
        first : "Bob",
        last : "Fog",
        email:"bobfog@mail.com"
        
        });
        var url;
        if(process.env.NODE_ENV=='production')
            url='prod';
        else
            url='http://localhost:3000'
      axios.post(url+'/register', json,{ withCredentials: true },{
        headers: {'Content-Type': 'application/json'}})
      .then(res => {
        const res_data = res.data;
        this.setState({reg_api: JSON.stringify(res.data) })
        console.log(res_data)
      })
}
  componentDidMount() {

    //test user api
    var url;
        if(process.env.NODE_ENV=='production')
            url='prod';
        else
            url='http://localhost:3000'
    axios.get(url+'/User', { withCredentials: true } )
      .then(res => {
        const res_data = res.data;
        this.setState({ user_api: JSON.stringify(res.data) })
        console.log(res_data)
      })





      
  }


  render() {
    return (<div>
        REGISTER
      USER API<br /><br />{this.state.user_api}<br /><br />
      REG API<br /><br />{this.state.reg_api}<br /><br />
      <button onClick={this.register.bind(this)}>register</button>;

    </div>

    );
  }
}
export default REGISTER