import React, { Component } from 'react';
import AlcoholCalendar from '../components/AlcoholCalendar';
import EatingCalendar from '../components/EatingCalendar';
import WorkoutCalendar from '../components/WorkoutCalendar';
import axios from 'axios';
import { Tabs, Tab } from "@tarragon/swipeable-tabs";
import Config from "react-native-config";

export class home extends Component {

    state = {
        account: null,
        selectedTab: "Tab 1"
    };

    updateData() {
        console.log('updating data')
        var url;
        if(process.env.NODE_ENV=='production')
            url='https://health-track-949.herokuapp.com/';
        else
            url='http://localhost:3000'

        axios.get(url+'/Account', { withCredentials: true })
            .then(res => {
                if (res) {

                    const res_data = res.data;
                    this.setState({ account: (res.data) })
                    console.log(this.state.account)

                }

            }).catch((error) => {
                console.log(error); //Logs a string: Error: Request failed with status code 404
                //  window.location.href='/auth';

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
            
            <Tabs value={this.state.selectedTab} onChange={updateTab => this.changeTab(updateTab.label)}>
                <Tab label="Drinks" key={0}>
                        <AlcoholCalendar updateData={this.updateData.bind(this)} alcohol_data={(this.state.account ? this.state.account.activity_data.alcohol_data : {})}
                        />
                      </Tab>
                <Tab label="Eating" key={1}>
                    <EatingCalendar updateData={this.updateData.bind(this)} diet_data={(this.state.account ? this.state.account.activity_data.diet_data : {})}
                        />
                    </Tab>
                <Tab label="Workout" key={2}>
                <WorkoutCalendar updateData={this.updateData.bind(this)} workout_data={(this.state.account ? this.state.account.activity_data.workout_data : {})}
                        />
                </Tab>
               
            </Tabs>

        </div>

        );
    }
}
export default home