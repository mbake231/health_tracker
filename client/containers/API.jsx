import React, { Component } from 'react';
import axios from 'axios';


export class API extends Component {
  state = {
    user_api: null,
    acct_api: null

  };


  componentDidMount() {

    //test user api
    var url;
        if(process.env.NODE_ENV=='production')
            url='';
        else
            url='http://localhost:3000'
    axios.get(url+'/User', { withCredentials: true } )
      .then(res => {
        const res_data = res.data;
        this.setState({ user_api: JSON.stringify(res.data) })
        console.log(res_data)
      })

    //test account api
    var url;
        if(process.env.NODE_ENV=='production')
            url='';
        else
            url='http://localhost:3000'
    axios.get(url+'/Account',{ withCredentials: true  })
      .then(res => {
        const res_data = res.data;
        this.setState({ acct_api: JSON.stringify(res.data) })
        console.log(res_data)
      })

      var json = ({
        activity_type : "alcohol",
        date : "2022-02-14",
        activity_data : {
            alcoholDrinksHad : "14"
        }
        });

        var url;
        if(process.env.NODE_ENV=='production')
            url='';
        else
            url='http://localhost:3000'
      axios.post(url+'/Activity/edit', json,{ withCredentials: true },{
        headers: {'Content-Type': 'application/json'}})
      .then(res => {
        const res_data = res.data;
        this.setState({ acct_api: JSON.stringify(res.data) })
        console.log(res_data)
      })

      
  }


  render() {
    return (<div>
      USER API<br /><br />{this.state.user_api}<br /><br />
      <br /><br />ACCT API<br /><br /><br />{this.state.acct_api}
    </div>

    );
  }
}
export default API