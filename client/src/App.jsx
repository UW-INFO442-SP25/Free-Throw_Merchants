import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useEffect, useState } from 'react';
import Home from './components/Home/home';
import user_profile from './components/User_Profile/user_profile';
import restaurant_profile from './components/Restaurant_Profile/restaurant_profile';
import NavBar from './components/Navbar/navbar';
import About from './components/About/about';

export default function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
      <Router>
        <div>
          <NavBar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/Home' element={<Home />} />
            <Route path='/User_Profile' element={<user_profile />} />
            <Route path='/Restaurant_Profile' element={<restaurant_profile />} />
            <Route path='/About' element={<About />} />
          </Routes>
        </div>
      </Router> 
  );
};