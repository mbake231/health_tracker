import React from 'react';
import API from './containers/API.jsx';
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";

export default function App() {
  return (
    <Router>
    <Routes>
      <Route path='/api' element={<API/>} />

    </Routes>
    </Router>
  );
}


