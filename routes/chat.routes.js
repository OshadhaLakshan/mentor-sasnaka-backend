const express = require('express');
const router = express.Router();
const Group = require('../models/group.model');
const { authenticateUser } = require('../middlewares/authMiddleware');

// Send Message
router.post('/group/:groupId/send-message', authenticateUser, async (req, res) => {
  try {
    const { groupId } = req.params;
    const { text } = req.body;
    const senderId = req.user.id;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    const message = { sender: senderId, text };
    group.messages.push(message);
    await group.save();

    res.status(200).json({ message: 'Message sent successfully', chat: group.messages });
  } catch (error) {
    res.status(500).json({ error: 'Error sending message' });
  }
});

// Get Messages
router.get('/group/:groupId/messages', authenticateUser, async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId).populate('messages.sender', 'name');

    if (!group) return res.status(404).json({ message: 'Group not found' });

    res.status(200).json({ messages: group.messages });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching messages' });
  }
});

module.exports = router;
