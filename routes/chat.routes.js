const express = require("express");
const router = express.Router();
const Group = require("../models/group.model");
const authenticate = require("../middleware/authMiddleware"); // ✅ Ensure correct import

// Send Message
router.post("/group/:groupId/send-message", authenticate, async (req, res) => {
  try {
    const { groupId } = req.params;
    const { text } = req.body;
    const senderId = req.user?.id; // ✅ Ensure `req.user` is defined

    if (!text) {
      return res.status(400).json({ message: "Message text is required" });
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const message = { sender: senderId, text };
    group.messages.push(message);
    await group.save();

    res.status(200).json({ message: "Message sent successfully", chat: group.messages });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Error sending message", details: error.message });
  }
});

// Get Messages
router.get("/group/:groupId/messages", authenticate, async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId).populate("messages.sender", "name");

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json({ messages: group.messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Error fetching messages", details: error.message });
  }
});

module.exports = router;
