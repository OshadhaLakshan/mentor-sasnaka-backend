const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  leader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  mentors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  mentees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Group', groupSchema);
