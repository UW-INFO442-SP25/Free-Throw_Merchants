import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

export default function Home() {
    return (
        <div className="home-container">
            {/* Main Section */}
            <section className="main-section">
                <div className="main-content">
                    <h1>Connect Excess Food with<br />Those Who Need It</h1>
                    <p>Fighting hunger and reducing waste in the U-District, one meal<br />at a time.</p>
                    
                    <div className="main-buttons">
                        <Link to="/find-food" className="primary-button">Find Food</Link>
                        <Link to="/donate-food" className="secondary-button">Donate Food</Link>
                    </div>
                    
                    <div className="helped-counter">
                        <div className="avatar-group">
                            <div className="avatar" style={{backgroundImage: "url('/public/user1.jpg')"}}></div>
                            <div className="avatar" style={{backgroundImage: "url('/public/user2.jpg')"}}></div>
                            <div className="avatar" style={{backgroundImage: "url('/public/user3.jpg')"}}></div>
                            <div className="avatar" style={{backgroundImage: "url('/public/user4.jpg')"}}></div>
                        </div>
                        <p>130+ people helped this week</p>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works-section">
                <h2>How FoodSaver Works</h2>
                <p className="section-subtitle">
                    Our platform makes it easy to connect excess food with the people who need it most,
                    reducing waste and fighting hunger in our community.
                </p>

                <div className="feature-cards">
                    {/* For Those Seeking Food */}
                    <div className="feature-card">
                        <div className="icon search-icon"></div>
                        <h3>For Those Seeking Food</h3>
                        <ol className="feature-list">
                            <li>Browse available food donations on the map or list view</li>
                            <li>Claim food items that meet your needs</li>
                            <li>Pick up your food at the specified location and time</li>
                        </ol>
                    </div>

                    {/* For Businesses Donating */}
                    <div className="feature-card">
                        <div className="icon business-icon"></div>
                        <h3>For Businesses Donating</h3>
                        <ol className="feature-list">
                            <li>List excess food with details on quantity and pickup time</li>
                            <li>Receive notifications when food is claimed</li>
                            <li>Prepare food for pickup and track your impact</li>
                        </ol>
                    </div>

                    {/* How the Platform Connects */}
                    <div className="feature-card">
                        <div className="icon connect-icon"></div>
                        <h3>How the Platform Connects</h3>
                        <ol className="feature-list">
                            <li>Real-time updates on food availability</li>
                            <li>Map-based interface showing nearby options</li>
                            <li>Manages food safety and timing information</li>
                        </ol>
                    </div>
                </div>
            </section>

            {/* Find Food Near You Section */}
            <section className="find-food-section">
                <h2>Find Food Near You</h2>
                <p>Browse available food donations in the U-District area</p>

                <div className="food-map-container">
                    <div className="food-map-card">
                        <h3>5 Food Locations Available Now</h3>
                        <p>View the full map to see all available food options in your area</p>
                        <Link to="/view-map" className="map-button">View Full Map</Link>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="cta-section">
                <h2>Ready to Join FoodSaver?</h2>
                <p>Whether you need food or have food to donate, getting started is simple.</p>

                <div className="cta-columns">
                    {/* Looking for Food */}
                    <div className="cta-column">
                        <h3>Looking for Food?</h3>
                        <ol className="cta-list">
                            <li>Create a free account in under a minute</li>
                            <li>Browse available food on the map</li>
                            <li>Claim and pick up your food</li>
                        </ol>
                        <Link to="/find-food-now" className="cta-button find-food-button">Find Food Now</Link>
                    </div>

                    {/* Got Food to Donate */}
                    <div className="cta-column">
                        <h3>Got Food to Donate?</h3>
                        <ol className="cta-list">
                            <li>Register your business on FoodSaver</li>
                            <li>List available food with a few taps</li>
                            <li>Prepare for pickup when claimed</li>
                        </ol>
                        <Link to="/start-donating" className="cta-button donate-button">Start Donating</Link>
                    </div>
                </div>

                <div className="help-link">
                    <p>Need help getting started? <a href="/contact">Contact our support team</a></p>
                </div>
            </section>

            {/* Footer */}
            <footer className="home-footer">
                <p>© 2025 FoodSaver. All rights reserved.</p>
                <p>FoodSaver is a project addressing UN Sustainable Development Goal 2: Zero Hunger</p>
            </footer>
        </div>
    );
}