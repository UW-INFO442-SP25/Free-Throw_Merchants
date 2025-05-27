import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useEffect, useState } from 'react';
import Home from './components/Home/home';
import user_profile from './components/User_Profile/user_profile';
import restaurant_profile from './components/Restaurant_Profile/restaurant_profile';
import NavBar from './components/Navbar/navbar';
import LogInPage from './components/account/log-in-pag';
import SignUp from './components/account/sign-up';
import Dashboard from './components/business/dashboard';
import About from './components/About/about';
import Team from './components/Team/team';

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
            <Route path='/Log-In' element={<LogInPage/>}/>
            <Route path='/Signup' element={<SignUp/>}/>
            {/* <Route path='/Dashboard' element={<Dashboard/>}/> */}
            <Route path='/About' element={<About />} />
            <Route path='/Team' element={<Team />} />
          </Routes>
        </div>
      </Router> 
  );
};