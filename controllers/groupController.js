const assignMenteeToGroup = async (menteeId) => {
    try {
      let group = await Group.findOne({ mentees: { $size: { $lt: 10 } } });
  
      if (!group) {
        // Find an available leader
        const leader = await User.findOne({ role: 'leader', groupId: null });
        if (!leader) return console.log('No available leader');
  
        // Find 3 approved mentors
        const mentors = await User.find({ role: 'mentor', isApproved: true, groupId: null }).limit(3);
        if (mentors.length < 3) return console.log('Not enough mentors available');
  
        // Create new group
        group = new Group({
          name: `Group-${Date.now()}`,
          leader: leader._id,
          mentors: mentors.map(m => m._id),
          mentees: [menteeId]
        });
  
        await group.save();
  
        // Update members with groupId
        await User.findByIdAndUpdate(leader._id, { groupId: group._id });
        await Promise.all(mentors.map(m => User.findByIdAndUpdate(m._id, { groupId: group._id })));
      } else {
        // Add mentee to existing group
        group.mentees.push(menteeId);
        await group.save();
      }
  
      // Update mentee with groupId
      await User.findByIdAndUpdate(menteeId, { groupId: group._id });
  
      console.log(`Mentee ${menteeId} added to group ${group._id}`);
    } catch (error) {
      console.error('Error assigning mentee to group:', error);
    }
  };
  