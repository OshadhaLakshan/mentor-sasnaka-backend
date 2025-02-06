const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Group = require('../models/group.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mentee Registration
router.post('/register-mentee', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if mentee already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: 'Mentee already registered' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new mentee
    user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role: 'mentee',
      isApproved: true
    });

    await user.save();

    // Auto-assign to group
    await assignMenteeToGroup(user._id);

    res.status(201).json({ message: 'Mentee registered successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Error registering mentee' });
  }
});

module.exports = router;
