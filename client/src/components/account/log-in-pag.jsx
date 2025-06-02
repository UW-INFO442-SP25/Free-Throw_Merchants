import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



export const LogInPage = () => {
  const [activeTab, setActiveTab] = useState('consumer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        alert(`Logged in as ${activeTab}`);
    } catch (error) {
        console.error("Login error:", error);
        alert(error.message);
    }
  };
    

    return(
        <main className="log-in-page">
            <div className="login-container">
                <h1 className="login-title">Log In</h1>
                <div className="login-tabs">
                    <button  className={`tab-button ${activeTab === 'consumer' ? 'active' : ''}`}  onClick={() => handleTabChange('consumer')}>
                        Consumer
                    </button>
                    <button className={`tab-button ${activeTab === 'business' ? 'active' : ''}`}  onClick={() => handleTabChange('business')}>
                        Business
                    </button>
                </div>
                <div className="login-description"> 
                    {activeTab === 'consumer' ? (<p>Sign in as a consumer to claim available food and reduce waste.</p>) : (<p>Access your dashboard to manage food donations</p>)}
                </div>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">
                        Log In as {activeTab === 'consumer' ? 'Consumer' : 'Business'}
                    </button>
                </form>  
                <div className="login-links">
                    <Link to="/forgot-password" className="forgot-password-link">Forgot password?</Link>
                </div>
                <div className="account-benefits">
                    <h2>Account Benefits</h2>
                    <p>
                        Sign in to claim food, receive notifications, and track your
                        impact on reducing food waste in your community.
                    </p>
                    <div className="help-link">
                        <Link to="/contact">Need help? Contact support</Link>
                    </div>
                </div>
                <div className="signup-prompt">
                    <p>New to FoodSaver?</p>
                    <Link to={`/signup/${activeTab}`} className="create-account-link"> Create Account</Link>
                </div>
            </div>
        </main>
    )
} 

export default LogInPage;