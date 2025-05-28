const express = require('express');
const router = express.Router();
const admin = require('../config/firebaseAdmin');
const { authenticateUser } = require('../middleware/auth');

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

// router.get('/profile', authenticateUser, async (req, res) => {
//     try {
//         const userRef = admin.database().ref(`users/${req.user.uid}`);
//         const snapshot = await userRef.once('value');
//         const userData = snapshot.val();
        
//         if (!userData) {
//             return res.status(404).json({ message: 'User profile not found' });
//         }
        
//         if (userData.userType === 'consumer') {
//             return res.json({
//                 name: userData.name,
//                 email: req.user.email,
//                 phone: userData.phone || '',
//                 userType: userData.userType
//             });
//         } else if (userData.userType === 'business') {
//             return res.json({
//                 businessName: userData.businessName || "",
//                 businessAddress: userData.businessAddress || userData.address || "",
//                 email: req.user.email,
//                 phone: userData.phone || "",
//                 description: userData.description || "",
//                 userType: userData.userType,
//         });
//         }
        
//         return res.status(400).json({ message: 'Invalid user type' });     
//     } catch (error) {
//         console.error('Error getting user profile:', error);
//         return res.status(500).json({ message: 'Server error' });
//     }
// });

router.get("/profile", authenticateUser, async (req, res) => {
  try {
    console.log("HIT /api/auth/profile");
    console.log("Decoded Firebase UID:", req.user?.uid);

    const userRef = admin.database().ref(`users/${req.user.uid}`);
    console.log("Fetching from:", `users/${req.user.uid}`);

    const snapshot = await userRef.once("value");

    if (!snapshot.exists()) {
      console.log("No user data found");
      return res.status(404).json({ error: "User not found" });
    }

    const userData = snapshot.val();
    console.log("Got user data:", userData);

    res.json({
      email: userData.email,
      userType: userData.userType,
      businessName: userData.businessName,
      businessAddress: userData.businessAddress,
    });
  } catch (error) {
    console.error("Error in /profile route:", error);
    res.status(500).json({ error: "Server error", detail: error.message });
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