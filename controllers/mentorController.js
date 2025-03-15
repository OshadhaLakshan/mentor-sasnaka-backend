const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

// Register a Mentor
exports.registerMentor = async (req, res) => {
  try {
    const { name, email, phone, password, experience, expertise } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new mentor
    const mentor = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      district,
      nic,
      university,
      degree,
      year,
      result,
      experience,
      expertise,
      role: 'mentor',
      isApproved: false,
    });

    await mentor.save();
    res.status(201).json({ message: 'Mentor registration successful. Awaiting admin approval.' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering mentor.' });
  }
};
