import React, { Component } from 'react';
import MyCalendar from '../components/MyCalendar';

import axios from 'axios';
import { Tabs, Tab } from "@tarragon/swipeable-tabs";

export class home extends Component {

    state = {
        account: null,
        selectedTab: "Drinks"
    };

    

    updateData() {
        var url;
        if(process.env.NODE_ENV=='production')
            url='';
        else
            url='http://localhost:3000'

        axios.get(url+'/Account', { withCredentials: true })
            .then(res => {
                if (res) {

                    const res_data = res.data;
                    this.setState({ account: (res.data) })
                    console.log(res.data)

                }

            }).catch((error) => {
                console.log(error); //Logs a string: Error: Request failed with status code 404
             //   window.location.href='/welcome';

            });
    }
    componentDidMount() {
        this.updateData();

    }

    changeTab(label) {
        this.setState({ selectedTab: label });
    }


    render() {
        return (<div>
            
            <Tabs tabItemCSS={{color:'#8C1C13', fontWeight:'bold'}}
             tabBarCSS={{backgroundColor:'white',color:'#8C1C13'}} value={this.state.selectedTab} onChange={updateTab => this.changeTab(updateTab.label)}>
                <Tab  label="Drinks" key={0}>
                        <MyCalendar calendarType={'alcohol'} updateData={this.updateData.bind(this)} acct_activity_data={(this.state.account ? this.state.account.activity_data.alcohol_data : {})}
                        />
                      </Tab>
                <Tab label="Eating" key={1}>
                    <MyCalendar calendarType={'diet'} updateData={this.updateData.bind(this)} acct_activity_data={(this.state.account ? this.state.account.activity_data.diet_data : {})}
                        />
                    </Tab>
                <Tab label="Workout" key={2}>
                <MyCalendar calendarType={'workout'} updateData={this.updateData.bind(this)} acct_activity_data={(this.state.account ? this.state.account.activity_data.workout_data : {})}
                        />
                </Tab>
               
            </Tabs>

        </div>

        );
    }
}
export default home