import React from 'react';
import API from './containers/API.jsx';
import AUTH from './containers/AUTH.jsx';
import REGISTER from './containers/REGISTER.jsx';
import HOME from './containers/Home.jsx';


import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
require('dotenv').config()

export default function App() {
  return (
    <Router>
    <Routes>
      <Route path='/api' element={<API/>} />
      <Route path='/auth' element={<AUTH/>} />
      <Route path='/register' element={<REGISTER/>} />
      <Route path='/' element={<HOME/>} />


    </Routes>
    </Router>
  );
}


