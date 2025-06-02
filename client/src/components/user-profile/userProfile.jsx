import React, { useState, useEffect } from 'react';
import { ref, get, update } from 'firebase/database';
import { useAuth } from '../../../context/AuthContext';
import { db } from '../../../firebaseConfig';
import './user.css';

const UserProfile = () => {
  const { currentUser } = useAuth();
  const userId = currentUser?.uid;
  const [userInfo, setUserInfo] = useState(null);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const commonAllergies = [
    { id: 'dairy', name: 'Dairy' },
    { id: 'eggs', name: 'Eggs' },
    { id: 'fish', name: 'Fish' },
    { id: 'shellfish', name: 'Shellfish' },
    { id: 'tree_nuts', name: 'Tree Nuts' },
    { id: 'peanuts', name: 'Peanuts', },
    { id: 'wheat', name: 'Wheat/Gluten' },
    { id: 'soy', name: 'Soy' },
    { id: 'sesame', name: 'Sesame' },
    { id: 'sulfites', name: 'Sulfites' },
    { id: 'mustard', name: 'Mustard' },
    { id: 'celery', name: 'Celery' }
  ];

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const snapshot = await get(ref(db, `users/${userId}`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        setUserInfo(data);
        setSelectedAllergies(data.allergies || []);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAllergyChange = (allergyId) => {
    setSelectedAllergies(prev =>
      prev.includes(allergyId)
        ? prev.filter(id => id !== allergyId)
        : [...prev, allergyId]
    );
  };
  const handleSaveAllergies = async () => {
    setSaving(true);
    setMessage('');
    try {
      await update(ref(db, `users/${userId}`), {
        allergies: selectedAllergies
      });

      setUserInfo(prev => ({ ...prev, allergies: selectedAllergies }));
      setMessage('Allergies updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving allergies:", error);
      setMessage('Error updating allergies. Please try again.');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  if (loading) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="profile-page">
      <div className="container">
        <header className="profile-header">
          <button className="back-btn" onClick={() => window.history.back()}>
            ← Back
          </button>
          <h1>My Profile</h1>
          <div className="header-spacer"></div>
        </header>

        {/* Profile Info */}
        <section className="profile-info-section">
          <div className="profile-card">
            <div className="profile-avatar">
              <div className="avatar-placeholder">
                {userInfo?.fullName?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            </div>
            <div className="profile-details">
              <h2 className="profile-name">{userInfo?.fullName}</h2>
              <p className="profile-type">{userInfo?.userType} Account</p>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Email</span>
                  <span className="info-value">{userInfo?.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Phone</span>
                  <span className="info-value">{userInfo?.phone}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Member Since</span>
                  <span className="info-value">{formatDate(userInfo?.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="allergies-section">
          <div className="section-header">
            <h3>Food Allergies & Restrictions</h3>
            <p className="section-description">
              Help us show you safe food options by selecting your allergies
            </p>
            {!isEditing && (
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                 Edit
              </button>
            )}
          </div>
          <div className="allergies-card">
            {isEditing ? (
              <div className="allergies-edit">
                <div className="allergies-grid">
                  {commonAllergies.map(allergy => (
                    <label key={allergy.id} className="allergy-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedAllergies.includes(allergy.id)}
                        onChange={() => handleAllergyChange(allergy.id)}
                      />
                      <div className="checkbox-content">
                        <span className="allergy-name">{allergy.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="allergies-actions">
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setSelectedAllergies(userInfo?.allergies || []);
                      setIsEditing(false);
                    }}
                    disabled={saving}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleSaveAllergies}
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="allergies-display">
                {userInfo?.allergies?.length > 0 ? (
                  <div className="current-allergies">
                    {userInfo.allergies.map((id) => {
                      const allergy = commonAllergies.find(a => a.id === id);
                      return allergy ? (
                        <div key={id} className="allergy-tag">
                          <span className="allergy-icon">{allergy.icon}</span>
                          <span className="allergy-name">{allergy.name}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                ) : (
                  <div className="no-allergies">
                    <p>No allergies specified</p>
                    <p className="no-allergies-sub">
                      Add your allergies to get personalized food recommendations
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
