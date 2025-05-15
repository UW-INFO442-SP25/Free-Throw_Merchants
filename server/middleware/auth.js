const admin = require('../config/firebaseAdmin');

const authenticateUser = async (req, res, next) => {
    try {
        const idToken = req.headers.authorization?.split('Bearer ')[1];

        if (!idToken) {
            return res.status(401).json({ message: 'No authentication token provided' });
        }
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch(error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

const isConsumer = async (req, res, next) => {
    try {
        const userRef = admin.database().ref(`users/${req.user.uid}`);
        const snapshot = await userRef.once('value');
        const userData = snapshot.val();

        if (!userData || userData.userType !== 'consumer') {
            return res.status(403).json({message: 'Access denied: Consumer Access Required'});
        }

        req.userData = userData;
        next();
    } catch (error) {
        console.error('Consumer check error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const isBusiness = async (req, res, next) => {
    try {
        const userRef = admin.database().ref(`users/${req.user.uid}`);
        const snapshot = await userRef.once('value');
        const userData = snapshot.val();
      
        if (!userData || userData.userType !== 'business') {
            return res.status(403).json({ message: 'Access denied: Business access required' });
        }
      
        req.userData = userData;
        next();
    } catch (error) {
        console.error('Business check error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    authenticateUser,
    isConsumer,
    isBusiness
};