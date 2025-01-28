require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user.model'); // Adjust the path to your User model

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Create admin function
const createAdmin = async () => {
  try {
    const email = 'oshadhaen@gmail.com'; // Set the admin email
    const password = '123456'; // Set the admin password

    // Check if the admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the admin
    const admin = new User({
      email,
      password: hashedPassword,
      role: 'admin', // Ensure 'role' field supports 'admin'
      name: 'Oshadha Lakshan', // Replace with desired admin name
      phone: '0769022600', // Replace with a valid phone number
    });

    await admin.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run script
(async () => {
  await connectDB();
  await createAdmin();
})();
