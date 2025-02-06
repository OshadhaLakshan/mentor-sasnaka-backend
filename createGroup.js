exports.createGroup = async (req, res) => {
    try {
      const { name, leaderId, mentorIds, menteeIds } = req.body;
  
      const leader = await User.findById(leaderId);
      const mentors = await User.find({ _id: { $in: mentorIds }, role: 'mentor', isApproved: true });
      const mentees = await User.find({ _id: { $in: menteeIds }, role: 'mentee' });
  
      if (!leader || leader.role !== 'leader') {
        return res.status(400).json({ error: 'Invalid leader.' });
      }
  
      if (mentors.length !== 3) {
        return res.status(400).json({ error: 'A group must have exactly 3 approved mentors.' });
      }
  
      if (mentees.length !== 10) {
        return res.status(400).json({ error: 'A group must have exactly 10 mentees.' });
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
  