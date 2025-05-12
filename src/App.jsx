import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useState } from 'react';
import Home from './components/Home/home';
import user_profile from './components/User_Profile/user_profile';
import restaurant_profile from './components/Restaurant_Profile/restaurant_profile';

export default function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Home' element={<Home />} />
          <Route path='/User_Profile' element={<user_profile />} />
          <Route path='/Restaurant_Profile' element={<restaurant_profile />} />
        </Routes>
      </Router> 
    </div>
  );
};