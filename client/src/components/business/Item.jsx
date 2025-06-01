import React from "react";
import './Item.css';

const Item = ({
  image,
  name,
  description,
  quantity,
  pickupWindow,
  status,
  onEdit,
  onArchive
}) => {
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'status-available';
      case 'claimed':
        return 'status-claimed';
      default:
        return 'status-default';
    }
  };

  return (
    <div className="item-container">
      <div className="item-main">
        <img src={image || "/default-image.jpg"} alt={name} className="item-image" />
        <div className="item-info">
          <h3 className="item-name">{name}</h3>
          <p className="item-description">{description}</p>
        </div>
        
        <div className="item-details">
          <div className="detail-group">
            <span className="detail-label">Quantity</span>
            <span className="detail-value">{quantity}</span>
          </div>
          
          <div className="detail-group">
            <span className="detail-label">Pickup Window</span>
            <div className="pickup-window">
              <span className="clock-icon"></span>
              <span className="detail-value">{pickupWindow}</span>
            </div>
          </div>
          
          <div className="detail-group">
            <span className="detail-label">Status</span>
            <span className={`status-badge ${getStatusClass(status)}`}>
              {status}
            </span>
          </div>
        </div>
      </div>
      
      <div className="item-actions">
        <button className="action-btn edit-btn" onClick={onEdit}>
          <span className="action-icon"></span>
          <span className="action-text">Edit</span>
        </button>
        <button className="action-btn archive-btn" onClick={onArchive}>
          <span className="action-icon"></span>
          <span className="action-text">Archive</span>
        </button>
      </div>
    </div>
  );
};

export default Item;