import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import AddDonationForm from "./addDonationForm";
import { ref, get, child } from "firebase/database";
import { db } from "../../../firebaseConfig";
import Item from "./Item";
import "./business.css";

export default function Dashboard() {
  const { currentUser, userData, loading } = useAuth();
  const [donations, setDonations] = useState([]);
  const [loadingDonations, setLoadingDonations] = useState(true);
  const navigate = useNavigate();
  

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate("/Log-In");
    }
  }, [loading, currentUser, navigate]);

  useEffect(() => {
    const fetchDonations = async () => {
  if (!currentUser) return;

  const donationsRef = ref(db, "donations");
  try {
    const snapshot = await get(donationsRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log("Raw donations from Firebase:", data);
      console.log("currentUser.uid:", currentUser.uid);

      const userDonations = Object.values(data)
  .filter((d) => d.businessID === currentUser.uid)
  .map((d) => ({
    ...d,
    timestamp: d.timestamp || ""
  }))
  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      console.log("Filtered userDonations:", userDonations);
      setDonations(userDonations);
    } else {
      console.log(" No donations found in database.");
      setDonations([]);
    }
  } catch (err) {
    console.error("❌ Error fetching donations:", err);
  } finally {
    setLoadingDonations(false);
  }
};
 fetchDonations();
  }, [currentUser]);
  if (loading) {
    return <div className="loading-container">Loading business dashboard...</div>;
     }

const formatPickupWindow = (startDate, startTime, endDate, endTime) => {
    if (!startDate || !startTime || !endDate || !endTime) return "Unavailable";

    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);

    const options = {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    return `${start.toLocaleString("en-US", options)} until ${end.toLocaleString("en-US", options)}`;
  };



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
        {loadingDonations ? (
            <div className="loading-container">Loading donations...</div>
          ) : donations.length === 0 ? (
            <div className="no-donations">You don’t have any donations yet.</div>
          ) : (
            <div className="has-donations">
              {donations.map((donation, index) => (
                <Item
                  key={index}
                  image={donation.imageURL}
                  name={donation.foodName}
                  description={donation.description}
                  quantity={donation.quantity}
                  pickupWindow={formatPickupWindow(donation.pickupStartDate, donation.pickupStartTime, donation.pickupEndDate, donation.pickupEndTime)}
                  status={donation.status}
                  onEdit={() => console.log("Edit", donation)}  
                  onArchive={() => console.log("Archive", donation)} 
                />
              ))}
            </div>
          )}
      </div>
    </div>
  );
}
