const express = require("express");
const Mentor = require("../models/user.model");
const router = express.Router();

// Register a new mentor
router.post("/register", async (req, res) => {
  try {
    const { 
      name,
      email,
      phone,
      password,
      district,
      nic,
      university,
      degree,
      year,
      result,
      experience,
      expertise,
     } = req.body;
    const newMentor = new Mentor({ 
      name,
      email,
      phone,
      password,
      district,
      nic,
      university,
      degree,
      year,
      result,
      experience,
      expertise,
      role: "mentor",
      isApproved: false,
     });
    await newMentor.save();
    res.status(201).json({ message: "Mentor registered successfully", mentor: newMentor });
  } catch (error) {
    res.status(500).json({ message: "Error registering mentor", error });
  }
});

// Approve mentor
router.patch("/approve/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMentor = await Mentor.findByIdAndUpdate(
      id,
      { isApproved: true, status: "accepted" },
      { new: true }
    );
    if (!updatedMentor) return res.status(404).json({ message: "Mentor not found" });
    res.status(200).json({ message: "Mentor approved", mentor: updatedMentor });
  } catch (error) {
    res.status(500).json({ message: "Error approving mentor", error });
  }
});

// Promote mentor to leader
router.patch("/promote/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMentor = await Mentor.findByIdAndUpdate(
      id,
      { role: "leader" },
      { new: true }
    );
    if (!updatedMentor) return res.status(404).json({ message: "Mentor not found" });
    res.status(200).json({ message: "Mentor promoted to leader", mentor: updatedMentor });
  } catch (error) {
    res.status(500).json({ message: "Error promoting mentor", error });
  }
});

// Remove mentor
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMentor = await Mentor.findByIdAndDelete(id);
    if (!deletedMentor) return res.status(404).json({ message: "Mentor not found" });
    res.status(200).json({ message: "Mentor removed", mentor: deletedMentor });
  } catch (error) {
    res.status(500).json({ message: "Error removing mentor", error });
  }
});

module.exports = router;
