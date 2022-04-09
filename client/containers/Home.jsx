import React, { Component } from 'react';
import AlcoholCalendar from '../components/AlcoholCalendar';
import EatingCalendar from '../components/EatingCalendar';

import axios from 'axios';
import { Tabs, Tab } from "@tarragon/swipeable-tabs";

export class home extends Component {

    state = {
        account: null,
        selectedTab: "Tab 1"
    };

    updateData() {
        console.log('updating data')
        axios.get('http://localhost:3000/Account', { withCredentials: true })
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
            home
            <button onClick={e => this.updateData()}>update data</button>

            <Tabs value={this.state.selectedTab} onChange={updateTab => this.changeTab(updateTab.label)}>
                <Tab label="Drinks" key={0}>
                        <AlcoholCalendar updateData={this.updateData.bind(this)} alcohol_data={(this.state.account ? this.state.account.activity_data.alcohol_data : {})}
                        />
                      </Tab>
                <Tab label="Eating" key={1}>
                    <EatingCalendar updateData={this.updateData.bind(this)} diet_data={(this.state.account ? this.state.account.activity_data.diet_data : {})}
                        />
                    </Tab>
                <Tab label="Tab 3" key={2}>
                    <div>Tab 3 content</div>
                </Tab>
                <Tab label="Tab 4" key={3}>
                    <div>Tab 4 content</div>
                </Tab>
            </Tabs>

        </div>

        );
    }
}
export default home