const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'leader', 'mentor', 'mentee'],
      required: true,
    },
    district: { type: String, default: null },
    nic: { type: String, default: null },
    university: { type: String, default: null },
    degree: { type: String, default: null },
    year: { type: String, default: null },
    result: { type: String, default: null },
    experience: { type: String, default: null }, // Optional, relevant for mentors
    expertise: { type: String, default: null }, // Optional, relevant for mentors
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', default: null },
    isApproved: { type: Boolean, default: false }, // Relevant for mentors
    createdAt: { type: Date, default: Date.now }, // Automatically tracks creation time
    updatedAt: { type: Date, default: Date.now }, // Automatically tracks last update
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

module.exports = mongoose.model('User', userSchema);
