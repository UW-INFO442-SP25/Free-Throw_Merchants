import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import "./Navbar.css";

const Navbar = () => {
  const useNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return { isMobileMenuOpen, mobileMenu };
};
  const location = useLocation();
  const navigate = useNavigate();
  const { isMobileMenuOpen, mobileMenu } = useNavigation();
  const { currentUser, isConsumer, isBusiness, loading } = useAuth();




  useEffect(() => {
    const pageClasses = {
      "/": "home-page",
      "/about": "about-page",
      "/team": "team-page",
      "/login": "login-page",
      "/signup": "signup-page",
      "/profile": "profile-page",
      "/dashboard": "dashboard",
    };

    document.body.classList.remove(
      "home-page",
      "about-page",
      "team-page",
      "login-page",
      "signup-page",
      "profile-page",
      "dashboard"
    );
    document.body.classList.add(pageClasses[location.pathname] || "home-page");
  }, [location]);

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigate("/");
      mobileMenu();
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
        <Link
          to="/"
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          onClick={mobileMenu}
        >
          Home
        </Link>

        {!loading && isBusiness && (
          <Link
            to="/dashboard"
            className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""}`}
            onClick={mobileMenu}
          >
            Dashboard
          </Link>
        )}

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
        {!currentUser ? (
          <>
            <Link
              to="/Log-In"
              className={`log-in-btn nav-link auth-link ${location.pathname === "/login" ? "active" : ""}`}
              onClick={mobileMenu}
            >
              Log In
            </Link>

            <Link
              to="/Signup"
              className={`nav-link auth-link signup-link ${location.pathname === "/signup" ? "active" : ""}`}
              onClick={mobileMenu}
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            {!loading && isConsumer && (
              <Link
                to="/profile"
                className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`}
                onClick={mobileMenu}
              >
                Profile
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
