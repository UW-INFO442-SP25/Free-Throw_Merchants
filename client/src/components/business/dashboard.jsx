import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import AddDonationForm from "./addDonationForm";
import "./business.css";

export default function Dashboard() {
  const { currentUser, userData, loading } = useAuth();
  const navigate = useNavigate();
  

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate("/Log-In");
    }
  }, [loading, currentUser, navigate]);

  if (loading) {
    return <div className="loading-container">Loading business dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1 className="business-name">
            {userData?.businessName || "Business Dashboard"}
          </h1>
          <p className="business-address">{userData?.businessAddress || ""}</p>
          <p className="dashboard-subtitle">My Donations</p>
        </div>

        <Link to="/add-donation" style={{ textDecoration: "none" }}>
          <button className="add-donation-btn">
            + Add Donation
          </button>
        </Link>
      </div>

      <div className="donations-container">
        <div className="donations-header">
          <h2>Active Listings</h2>
          <p>Manage your current donations</p>
        </div>
        <div className="no-donations">
          You don’t have any donations yet.
        </div>
      </div>
    </div>
  );
}
