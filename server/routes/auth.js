const express = require('express');
const router = express.Router();
const admin = require('../config/firebaseAdmin');
const { authenticateUser } = require('../middleware/auth');

// Test route without middleware to verify basic routing works
router.get('/test', (req, res) => {
    return res.json({ message: 'Auth routes working!' });
});

router.get('/check', authenticateUser, async (req, res) => {
    try {
        const userRef = admin.database().ref(`users/${req.user.uid}`);
        const snapshot = await userRef.once('value');
        const userData = snapshot.val();

        if (!userData) {
            return res.status(404).json({message: 'User data not found'});
        }

        return res.json({
            uid: req.user.uid,
            email: req.user.email,
            userType: userData.userType,
            name: userData.name || userData.businessName,
            createdAt: userData.createdAt
        });
    } catch (error) {
        console.error('Error getting user data:', error);
        return res.status(500).json({message: 'Server Error'});
    }
});

router.get('/profile', authenticateUser, async (req, res) => {
    try {
        const userRef = admin.database().ref(`users/${req.user.uid}`);
        const snapshot = await userRef.once('value');
        const userData = snapshot.val();
        
        if (!userData) {
            return res.status(404).json({ message: 'User profile not found' });
        }
        
        if (userData.userType === 'consumer') {
            return res.json({
                name: userData.name,
                email: req.user.email,
                phone: userData.phone || '',
                userType: userData.userType
            });
        } else if (userData.userType === 'business') {
            return res.json({
                businessName: userData.businessName,
                email: req.user.email,
                address: userData.address,
                description: userData.description || '',
                phone: userData.phone || '',
                userType: userData.userType
            });
        }
        
        return res.status(400).json({ message: 'Invalid user type' });     
    } catch (error) {
        console.error('Error getting user profile:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.put('/profile', authenticateUser, async (req, res) => {
    try {
        const updates = req.body;
      
        delete updates.userType;
      
        const userRef = admin.database().ref(`users/${req.user.uid}`);
        const snapshot = await userRef.once('value');
      
        if (!snapshot.exists()) {
            return res.status(404).json({ message: 'User not found' });
        }
      
        await userRef.update({
            ...updates,
            updatedAt: new Date().toISOString()
        });
      
        return res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;