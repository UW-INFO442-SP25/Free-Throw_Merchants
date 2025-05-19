const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// For debugging: See if routes are loaded properly
try {
    const authRoutes = require('./routes/auth');
    console.log('Auth routes loaded successfully');
    
    const app = express();
    
    const PORT = process.env.PORT || 3000;
    
    // Middleware
    app.use(cors());
    app.use(bodyParser.json()); 
    app.use(express.static(path.join(__dirname, '../client/')));
    
    // Basic routes
    app.get("/", (req, res) => {
        res.send("Welcome to the API server!");
    });
    
    app.get("/api", (req, res) => {
        console.log("GET /api hit");
        res.json({ users: ["userOne", "userTwo", "userThree"] });
    });
    
    // Auth routes
    app.use('/api/auth', authRoutes);
    
    // Static file fallback
    app.get(/^\/(?!api).*/, (req, res) => {
        res.sendFile(path.join(__dirname, '../client/', 'index.html'));
    });
    
    // Error handler
    app.use((err, req, res, next) => {
        console.error('Express error handler triggered:', err.stack);
        res.status(500).json({ message: 'Something went wrong!', error: err.message });
    });
    
    // Start server
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
} catch (error) {
    console.error('Server initialization error:', error);
}