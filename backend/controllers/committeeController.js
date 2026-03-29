const Committee = require('../models/Committee');

const getCommitteeMembers = async (req, res) => {
  try {
    const members = await Committee.find({});
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCommitteeMember = async (req, res) => {
  try {
    const { name, role, phone } = req.body;
    const member = new Committee({ name, role, phone });
    const createdMember = await member.save();
    res.status(201).json(createdMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCommitteeMember = async (req, res) => {
  try {
    const { name, role, phone } = req.body;
    const member = await Committee.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Committee Member not found' });
    
    member.name = name || member.name;
    member.role = role || member.role;
    member.phone = phone || member.phone;
    
    const updatedMember = await member.save();
    res.json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCommitteeMember = async (req, res) => {
  try {
    const member = await Committee.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Committee Member not found' });
    
    await member.deleteOne();
    res.json({ message: 'Member removed from Committee' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCommitteeMembers, createCommitteeMember, updateCommitteeMember, deleteCommitteeMember };
