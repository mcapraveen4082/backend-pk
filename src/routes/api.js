const express = require('express');
const getUserModel = require('../models/user');
const logger = require('../utils/logger');
const router = express.Router();

// Controller logic can be separated here, for now, we'll have a simple response
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Node.js Boilerplate API!' });
});

router.get('/test', async(req, res) => {
    try {
        logger.info('Starting test API execution');
        const User = await getUserModel();
        logger.info('User model initialized successfully');

        const newUser = new User({
            email: "john.doe@example.com",
            firstName: "John",
            lastName: "Doe",
            phone: "+1-555-123-4567",
            address: {
                street: "123 Main Street",
                city: "San Francisco",
                state: "CA",
                zipCode: "94105",
                country: "USA"
            },
            age: 30,
            occupation: "Software Engineer",
            company: "Tech Corp",
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const savedUser = await newUser.save();
        logger.info(`User created successfully with ID: ${savedUser._id}`);
        
        res.json({ 
            message: 'Protected route accessed successfully',
            userId: savedUser._id 
        });
    } catch (error) {
        logger.error(`Test API Error: ${error.message}`);
        res.status(500).json({ 
            message: 'Error in test API', 
            error: error.message 
        });
    }
});

module.exports = router;

