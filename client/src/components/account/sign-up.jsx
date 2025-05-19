import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { db } from "../../../firebaseConfig";



const SignUp = () => {
    const [activeTab, setActiveTab] = useState('consumer');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [fullName, setFullName] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
   
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const auth = getAuth();
            try{
                const userInfo = await createUserWithEmailAndPassword(auth, email, password)
                const user = userInfo.user

                const userRef = ref(db, `users/${user.uid}`)

                if(activeTab === 'consumer'){
                    await set(userRef, {
                        userType: 'consumer',
                        fullName, 
                        phone: phoneNumber,
                        email, 
                        createdAt: new Date().toString()
                    })
                }else{
                    await set(userRef, {
                        userType: 'business',
                        businessName,
                        businessAddress,
                        phone: phoneNumber,
                        email,
                        createdAt: new Date().toString()
                    })
                }

                alert("Account created sucessfully!")
            }catch(error){
                console.error("Signup error:", error);
                alert(error.message)
            }
    };


    return(
        <main className="signup-page">
            <div className="signup-container">
                <h1 className="signup-title">Create Account</h1>
                <p className="signup-subtitle">Join FoodSaver to reduce waste and fight hunger</p>
                
                <div className="signup-tabs">
                    <button className={`tab-button ${activeTab === 'consumer' ? 'active' : ''}`} onClick={() => handleTabChange('consumer')}>
                        Consumer
                    </button>
                    <button className={`tab-button ${activeTab === 'business' ? 'active' : ''}`} onClick={() => handleTabChange('business')}>
                        Business
                    </button>
                </div>
                <div className="signup-description">
                    {activeTab === 'consumer' ? ( <p>Sign in as a consumer to claim available food and reduce waste.</p> ) : (
                    <p>Sign in to manage your food donations and track your impact.</p>)}
                </div>
                <form onSubmit={handleSubmit} className="signup-form">
                    {activeTab === 'consumer' && (
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                        type="text"
                        id="fullName"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        />
                    </div>
                    )}
                    {activeTab === 'business' && (
                    <>
                        <div className="form-group">
                            <label htmlFor="businessName">Business Name</label>
                            <input
                                type="text"
                                id="businessName"
                                placeholder="Your Business Name"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="businessAddress">Business Address</label>
                            <input
                                type="text"
                                id="businessAddress"
                                placeholder="123 Main St, City, State"
                                value={businessAddress}
                                onChange={(e) => setBusinessAddress(e.target.value)}
                                required />
                        </div>
                    </>
                    )}
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            placeholder="(555) 555-5555"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                    </div>
                    <button type="submit" className="signup-button"> Create {activeTab === 'consumer' ? 'Consumer' : 'Business'} Account </button>
                </form>
                <div className="login-prompt">
                    <p>Already have an account? <Link to="/login" className="login-link">Log In</Link></p>
                </div>
                </div>
        </main>
    )
}

export default SignUp;