import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
// import { signOut } from "../../services/authService";
import "./Navbar.css";

// Custom hook for navigation
export const useNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  
  return { isMobileMenuOpen, mobileMenu };
};

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isMobileMenuOpen, mobileMenu } = useNavigation();
  const { currentUser, isConsumer, isBusiness } = useAuth();

  useEffect(() => {
    const pageClasses = {
      "/": "home-page",
      "/about": "about-page",
      "/team": "team-page",
      "/login": "login-page",
      "/signup": "signup-page",
      "/profile": "profile-page",
      "/dashboard": "dashboard-page",
    };

    document.body.classList.remove(
      "home-page",
      "about-page",
      "team-page",
      "login-page",
      "signup-page",
      "profile-page",
      "dashboard-page"
    );
    document.body.classList.add(pageClasses[location.pathname] || "home-page");
  }, [location]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
      mobileMenu(); // Close mobile menu if open
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="nav-bar">
      <div className="nav-bar-brand-logo">
        <Link to="/" className="nav-bar-link-logo">FOODSAVER</Link>
      </div>
      
      <button className="mobile-menu-toggle" onClick={mobileMenu}>
        ☰
      </button>

      {isMobileMenuOpen && <div className="menu-overlay" onClick={mobileMenu}></div>}
      
      <div className={`main-nav-links ${isMobileMenuOpen ? "open" : ""}`}>
        <button className="close-menu" onClick={mobileMenu}>✕</button>
        
        {/* Main Navigation Links */}
        <Link
          to="/"
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          onClick={mobileMenu}
        >
          Home
        </Link>
        
        <Link
          to="/about"
          className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
          onClick={mobileMenu}
        >
          About
        </Link>
        
        <Link
          to="/team"
          className={`nav-link ${location.pathname === "/team" ? "active" : ""}`}
          onClick={mobileMenu}
        >
          Meet The Team
        </Link>

        {/* Authentication Links */}
        {!currentUser ? (
          <>
            <Link
              to="/login"
              className={`nav-link auth-link ${location.pathname === "/login" ? "active" : ""}`}
              onClick={mobileMenu}
            >
              Log In
            </Link>
            
            <Link
              to="/signup"
              className={`nav-link auth-link signup-link ${location.pathname === "/signup" ? "active" : ""}`}
              onClick={mobileMenu}
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            {isConsumer && (
              <Link
                to="/profile"
                className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`}
                onClick={mobileMenu}
              >
                Profile
              </Link>
            )}
            
            {isBusiness && (
              <Link
                to="/dashboard"
                className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""}`}
                onClick={mobileMenu}
              >
                Dashboard
              </Link>
            )}
            
            <button className="nav-link logout-btn" onClick={handleLogout}>
              Log Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;