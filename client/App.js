import React from 'react';
import API from './containers/API.jsx';
import AUTH from './containers/AUTH.jsx';
import REGISTER from './containers/REGISTER.jsx';


import { BrowserRouter as Router,Route,Routes } from "react-router-dom";

export default function App() {
  return (
    <Router>
    <Routes>
      <Route path='/api' element={<API/>} />
      <Route path='/auth' element={<AUTH/>} />
      <Route path='/register' element={<REGISTER/>} />


    </Routes>
    </Router>
  );
}


