const User = require('../models/user.model');
const Group = require('../models/group.model');

// Approve Mentor
exports.approveMentor = async (req, res) => {
  try {
    const { id } = req.params;
    const mentor = await User.findById(id);
    if (!mentor) return res.status(404).json({ error: 'Mentor not found' });

    mentor.isApproved = true;
    await mentor.save();
    res.status(200).json({ message: 'Mentor approved successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error approving mentor.' });
  }
};

// Create Group
exports.createGroup = async (req, res) => {
  try {
    const { name, leaderId, mentorIds, menteeIds } = req.body;

    // Ensure leader, mentors, and mentees exist
    const leader = await User.findById(leaderId);
    const mentors = await User.find({ _id: { $in: mentorIds }, role: 'mentor', isApproved: true });
    const mentees = await User.find({ _id: { $in: menteeIds }, role: 'mentee' });

    if (!leader || mentors.length !== 3 || mentees.length !== 10) {
      return res.status(400).json({ error: 'Invalid leader, mentors, or mentees.' });
    }

    const group = new Group({ name, leader: leaderId, mentors: mentorIds, mentees: menteeIds });
    await group.save();

    // Assign groupId to members
    await Promise.all(
      [...mentorIds, ...menteeIds, leaderId].map((id) =>
        User.findByIdAndUpdate(id, { groupId: group._id })
      )
    );

    res.status(201).json({ message: 'Group created successfully.', group });
  } catch (error) {
    res.status(500).json({ error: 'Error creating group.' });
  }
};

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const newUser = require('../models/user.model');

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find user with the admin role
    const admin = await newUser.findOne({ email, role: 'admin' });
    if (!admin) {
      console.log(`Admin not found: ${email}`);
      return res.status(401).json({ message: 'Admin not found.' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      console.log(`Invalid password for admin: ${email}`);
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate token
    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log(`Login successful for admin: ${email}`);
    res.status(200).json({ message: 'Login successful.', token });
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ error: 'An unexpected error occurred during login.' });
  }
};

