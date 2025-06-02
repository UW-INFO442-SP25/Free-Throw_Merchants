import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useEffect, useState } from 'react';
import Home from './components/Home/home';
import NavBar from './components/Navbar/navbar';
import LogInPage from './components/account/log-in-pag';
import SignUp from './components/account/sign-up';
import Dashboard from './components/business/dashboard';
import About from './components/About/about';
import Team from './components/Team/team';
import AddDonationForm from './components/business/addDonationForm';
import DonationsList from './components/Listings/DonationsList';
import UserProfile from './components/user-profile/UserProfile';
import Footer from './components/Home/footer';


export default function App() {


  return (
      <Router>
        <div>
          <NavBar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/Home' element={<Home />} />
            <Route path='/add-donation' element={<AddDonationForm/>}/>
            <Route path='/Log-In' element={<LogInPage/>}/>
            <Route path='/Signup' element={<SignUp/>}/>
            <Route path='/Dashboard' element={<Dashboard/>}/>
            <Route path='/About' element={<About />} />
            <Route path='/Team' element={<Team />} />
            <Route path='/donation-listings' element={<DonationsList/>}/>
            <Route path='/profile' element={<UserProfile/>}/>
          </Routes>
          <Footer/>
        </div>
      </Router> 
  );
};

