import React from 'react';
import API from './containers/API.jsx';
import AUTH from './containers/AUTH.jsx';
import REGISTER from './containers/REGISTER.jsx';
import HOME from './containers/Home.jsx';
import Welcome from './containers/Welcome.jsx'
import { Menu,Alert, StyleSheet, Text, Pressable, View } from "react-native";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import NavBar from './components/NavBar.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './globalstyles.css'
import PAGE from './pages/page1.jsx'
require('dotenv').config()


export default function App() {
  return (<div id='AppContainer'>
    
     
<NavBar></NavBar>
<div >
<Router>
    <Routes>
      <Route path='/api' element={<API/>} />
      <Route path='/auth' element={<AUTH/>} />
      <Route path='/welcome' element={<Welcome/>} />

      <Route path='/register' element={<REGISTER/>} />
      <Route path='/' element={<HOME/>} />
      <Route path='/page' element={<PAGE/>} />




    </Routes>
    </Router>
    </div>
    </div>
  );
}


