const express = require('express');
const getUserModel = require('../models/user');
const router = express.Router();

// Controller logic can be separated here, for now, we'll have a simple response
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Node.js Boilerplate API!' });
});

router.get('/test', async(req, res) => {
  const User = await getUserModel();

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
  
  res.json({ message: 'Protected route accessed successfully' });
});

module.exports = router;

