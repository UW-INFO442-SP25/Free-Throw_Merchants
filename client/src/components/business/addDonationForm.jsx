import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, push, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { ArrowLeft, Upload, MapPin } from "lucide-react"; 
import "./business.css";

const AddDonationForm = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getDatabase();
  const user = auth.currentUser;

  const [formData, setFormData] = useState({
    foodItemName: '',
    category: '',
    description: '',
    quantity: '',
    pickupStartDate: '',
    pickupStartTime: '',
    pickupEndDate: '',
    pickupEndTime: '',
    pickupLocation: '',
    specialInstructions: '',
    ingredients: '',
    allergens: {
      gluten: false,
      dairy: false,
      nuts: false,
      eggs: false,
      soy: false,
      fish: false,
      shellfish: false
    }
  });

  const [uploadedImage, setUploadedImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAllergenChange = (allergen) => {
    setFormData(prev => ({
      ...prev,
      allergens: {
        ...prev.allergens,
        [allergen]: !prev.allergens[allergen]
      }
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setUploadedImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (action) => {
    if (!user) {
      alert("You must be signed in to post a donation.");
      return;
    }

    const donationData = {
      ...formData,
      image: uploadedImage || null,
      status: action === 'draft' ? 'draft' : 'posted',
      createdAt: new Date().toISOString(),
      businessId: user.uid
    };

    try {
      const donationRef = ref(db, `donations/${user.uid}`);
      await push(donationRef, donationData);

      if (action === "post") {
        alert("Donation posted successfully!");
      } else {
        alert("Donation saved as draft.");
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Error posting donation:", error);
      alert("There was an error posting the donation.");
    }
  };

  return (
    <div className="food-donation-container">
      <div className="main-container">
        <button className="back-button" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="back-icon" />
          Back to Dashboard
        </button>
        <h1 className="page-title">Add New Food Donation</h1>
      </div>
      <div className="form-container">
        <div className="form-content">
          <section className="form-section">
            <h2 className="section-title">Food Details</h2>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Food Item Name</label>
                <input type="text" name="foodItemName" value={formData.foodItemName} onChange={handleInputChange} placeholder="e.g., Fresh Bagels" className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Quantity</label>
                <input type="text" name="quantity" value={formData.quantity} onChange={handleInputChange} placeholder="e.g., 12 pieces, 2 kg" className="form-input" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select name="category" value={formData.category} onChange={handleInputChange} className="form-select">
                <option value="">Select a category</option>
                <option value="bakery">Bakery</option>
                <option value="produce">Produce</option>
                <option value="dairy">Dairy</option>
                <option value="meat">Meat</option>
                <option value="prepared">Prepared Food</option>
                <option value="canned">Canned Goods</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Describe the food items you're donating..." rows={4} className="form-textarea" />
            </div>
          </section>
          <section className="form-section">
            <h2 className="section-title">Image</h2>
            <div className="image-upload-area">
              {uploadedImage ? (
                <div className="image-preview">
                  <img src={uploadedImage} alt="Uploaded food" />
                  <button onClick={() => setUploadedImage(null)} className="remove-image-btn">Remove Image</button>
                </div>
              ) : (
                <div>
                  <Upload className="upload-icon" />
                  <p className="upload-text">Upload an image of the food items</p>
                  <label className="upload-button">
                    Upload Image
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden-input" />
                  </label>
                </div>
              )}
            </div>
          </section>
          <section className="form-section">
            <h2 className="section-title">Pickup Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Pickup Start Time</label>
                <div className="time-input-group">
                  <input type="date" name="pickupStartDate" value={formData.pickupStartDate} onChange={handleInputChange} className="form-input" />
                  <input type="time" name="pickupStartTime" value={formData.pickupStartTime} onChange={handleInputChange} className="form-input" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Pickup End Time</label>
                <div className="time-input-group">
                  <input type="date" name="pickupEndDate" value={formData.pickupEndDate} onChange={handleInputChange} className="form-input" />
                  <input type="time" name="pickupEndTime" value={formData.pickupEndTime} onChange={handleInputChange} className="form-input" />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label"><MapPin className="location-icon" /> Pickup Location</label>
              <input type="text" name="pickupLocation" value={formData.pickupLocation} onChange={handleInputChange} className="form-input" placeholder="Street address, city, state" />
            </div>

            <div className="form-group">
              <label className="form-label">Special Instructions</label>
              <textarea name="specialInstructions" value={formData.specialInstructions} onChange={handleInputChange} rows={3} className="form-textarea" />
            </div>
          </section>
          <section className="form-section">
            <h2 className="section-title">Nutritional Information</h2>
            <div className="form-group">
              <label className="form-label">Ingredients List</label>
              <textarea name="ingredients" value={formData.ingredients} onChange={handleInputChange} rows={3} className="form-textarea" />
              <p className="help-text">Help recipients identify potential allergens.</p>
            </div>
            <div className="form-group">
              <label className="form-label">Common Allergens</label>
              <div className="allergen-grid">
                {Object.entries(formData.allergens).map(([allergen, checked]) => (
                  <label key={allergen} className="allergen-item">
                    <input type="checkbox" checked={checked} onChange={() => handleAllergenChange(allergen)} className="allergen-checkbox" />
                    <span className="allergen-label">{allergen}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>
        </div>
        <div className="form-actions">
          <button onClick={() => navigate("/dashboard")} className="action-button btn-cancel">Cancel</button>
          <button onClick={() => handleSubmit('draft')} className="action-button btn-draft">Save as Draft</button>
          <button onClick={() => handleSubmit('post')} className="action-button btn-primary">Post Donation</button>
        </div>
      </div>
    </div>
  );
};

export default AddDonationForm;
