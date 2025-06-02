import React from 'react';
import './listing.css';

const DonationItem = ({
  id,
  image,
  status = 'Available',
  quantity,
  businessName,
  foodName,
  description,
  distance,
  timeWindow,
  onViewDetails
}) => {
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(id);
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'status-available';
      case 'claimed':
        return 'status-claimed';
      case 'expired':
        return 'status-expired';
      default:
        return 'status-default';
    }
  };

  return (
    <div className="donation-item">
      <div className="donation-item-image">
        <img 
          src={image || '/placeholder-food.jpg'} 
          alt={description}
          onError={(e) => {
            e.target.src = '/placeholder-food.jpg';
          }}
        />
        <div className={`status-badge ${getStatusClass(status)}`}>
          {status}
          <span className="quantity">- Amount: {quantity}</span>
        </div>
      </div>
      
      <div className="donation-item-content">
        <div className="donation-item-info">
          <h3 className="business-name">{businessName}</h3>
          <p className="food-description">
            <strong>{foodName}</strong> – {description}
          </p>
          
          <div className="donation-item-meta">
            <div className="meta-item">
              <span className="icon"></span>
              <span className="text">{distance}</span>
            </div>
            <div className="meta-item">
              <span className="icon"></span>
              <span className="text">{timeWindow}</span>
            </div>
          </div>
        </div>
        
        <button 
          className="view-details-btn"
          onClick={handleViewDetails}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default DonationItem;