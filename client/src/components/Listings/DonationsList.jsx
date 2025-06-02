import React, { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '../../../firebaseConfig';
import DonationItem from './DonationItem';
import './listing.css';

const DonationsList = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [foodTypeFilter, setFoodTypeFilter] = useState('All Food Types');
  const [sortBy, setSortBy] = useState('Time');
  const [viewMode, setViewMode] = useState('list');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const [donationSnap, userSnap] = await Promise.all([
        get(ref(db, 'donations')),
        get(ref(db, 'users'))
      ]);

      if (!donationSnap.exists() || !userSnap.exists()) {
        setDonations([]);
        setFilteredDonations([]);
        setLoading(false);
        return;
      }

      const donationsData = donationSnap.val();
      const usersData = userSnap.val();

     const enriched = Object.entries(donationsData)
        .filter(([_, d]) => d.status === 'posted')
        .map(([id, d]) => {
            const user = usersData[d.businessID] || {};

            const startDate = new Date(`${d.pickupStartDate}T${d.pickupStartTime}`);
            const endDate = new Date(`${d.pickupEndDate}T${d.pickupEndTime}`);

            const now = new Date();
            const isToday = startDate.toDateString() === now.toDateString();
            const isSameDay = startDate.toDateString() === endDate.toDateString();

            const timeFormatter = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
            });

            const dateFormatter = new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
            });

            const timeWindow = isToday
            ? `Today at ${timeFormatter.format(startDate)} – ${timeFormatter.format(endDate)}`
            : isSameDay
                ? `${dateFormatter.format(startDate)} at ${timeFormatter.format(startDate)} – ${timeFormatter.format(endDate)}`
                : `${dateFormatter.format(startDate)} at ${timeFormatter.format(startDate)} – ${dateFormatter.format(endDate)} at ${timeFormatter.format(endDate)}`;

            return {
            id,
            image: d.imageURL,
            status: d.status,
            quantity: d.quantity,
            foodName: d.foodItemName,
            businessName: user.businessName || 'Unknown Business',
            description: d.description,
            timeWindow,
            pickupStartDate: d.pickupStartDate,
            pickupStartTime: d.pickupStartTime
            };
        });

      setDonations(enriched);
      setFilteredDonations(enriched);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...donations];

    if (searchTerm) {
      filtered = filtered.filter((d) =>
        d.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (foodTypeFilter !== 'All Food Types') {
      filtered = filtered.filter(d =>
        d.category?.toLowerCase() === foodTypeFilter.toLowerCase()
      );
    }

    if (sortBy === 'Time') {
      filtered.sort((a, b) => {
        if (!a.pickupStartDate || !a.pickupStartTime || !b.pickupStartDate || !b.pickupStartTime) return 0;
        const aDate = new Date(`${a.pickupStartDate}T${a.pickupStartTime}`);
        const bDate = new Date(`${b.pickupStartDate}T${b.pickupStartTime}`);
        return aDate - bDate;
      });
    }

    setFilteredDonations(filtered);
  }, [donations, searchTerm, foodTypeFilter, sortBy]);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleFoodTypeChange = (e) => setFoodTypeFilter(e.target.value);
  const handleSortChange = (e) => setSortBy(e.target.value);

  const handleViewDetails = (id) => {
    console.log("View Details for", id);
  };

  return (
    <div className="donations-page">
      <main className="main-content">
        <div className="container">
          <div className="page-title">
            <h1>Available Food Near You</h1>
          </div>
          <div className="view-controls">
            <div className="view-toggle">
              <button className={`toggle-btn ${viewMode === 'map' ? 'active' : ''}`}>📍 Map View</button>
              <button className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}>📋 List View</button>
            </div>
          </div>

          <div className="search-filters">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search food or business name"
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
            </div>
            <div className="filters">
              <select value={foodTypeFilter} onChange={handleFoodTypeChange} className="filter-select">
                <option>All Food Types</option>
                <option>Bakery Items</option>
                <option>Sandwiches</option>
                <option>Fresh Produce</option>
                <option>Prepared Meals</option>
              </select>
              <select value={sortBy} onChange={handleSortChange} className="filter-select">
                <option>Time</option>
              </select>
            </div>
          </div>

          <div className="donations-container">
            {loading ? (
              <div className="loading">
                <div className="loading-spinner"></div>
                <p>Loading available donations...</p>
              </div>
            ) : (
              <>
                <div className="donations-list">
                  {filteredDonations.map((donation) => (
                    <DonationItem key={donation.id} {...donation} onViewDetails={handleViewDetails} />
                  ))}
                </div>
                {filteredDonations.length === 0 && (
                  <div className="no-results">
                    <p>No donations found matching your criteria.</p>
                  </div>
                )}
              </>
            )}
          </div>

          {!loading && (
            <div className="results-summary">
              <span className="results-count">{filteredDonations.length} food items found</span>
              <span className="filters-applied">
                {searchTerm || foodTypeFilter !== 'All Food Types' ? 'Filters applied' : 'No filters applied'}
              </span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DonationsList;