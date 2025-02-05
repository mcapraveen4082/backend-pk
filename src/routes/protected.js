const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const getUserModel = require('../models/user');

// Protected route - Get user profile

router.get('/profile', auth, async (req, res) => {
    try {
        // Use read replica for GET operations
        const User = await getUserModel(true);
        const user = await User.findById(req.user.id);
        
        res.json({
            message: 'Protected route accessed successfully',
            userId: user._id,
            email: user.email
        });
    } catch (error) {
        logger.error(`Profile fetch error: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
});

// Protected route - Get user data
router.get('/data', auth, async (req, res) => {
    try {
        // Use read replica for GET operations
        const User = await getUserModel(true);
        const userData = await User.findById(req.user.id)
            .select('stats')
            .lean();

        res.json({
            stats: userData?.stats || {
                visits: 100,
                actions: 50,
                lastLogin: new Date()
            }
        });
    } catch (error) {
        logger.error(`Data fetch error: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
});

// Example of a write operation
router.post('/update-profile', auth, async (req, res) => {
    try {
        // Use write connection for POST/PUT/DELETE operations
        const User = await getUserModel(false);
        await User.findByIdAndUpdate(req.user.id, req.body);
        
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        logger.error(`Profile update error: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;