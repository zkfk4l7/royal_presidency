const Complaint = require('../models/Complaint');

const getComplaints = async (req, res) => {
  try {
    let complaints;
    if (req.user.role === 'admin') {
      complaints = await Complaint.find({}).populate('user', 'name flatNumber').sort({ createdAt: -1 });
    } else {
      complaints = await Complaint.find({ user: req.user._id }).sort({ createdAt: -1 });
    }
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createComplaint = async (req, res) => {
  try {
    const { title, description } = req.body;
    const complaint = new Complaint({
      title,
      description,
      user: req.user._id,
    });
    const createdComplaint = await complaint.save();
    res.status(201).json(createdComplaint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateComplaintStatus = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    complaint.status = req.body.status || complaint.status;
    const updatedComplaint = await complaint.save();
    res.json(updatedComplaint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    await complaint.deleteOne();
    res.json({ message: 'Complaint removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getComplaints, createComplaint, updateComplaintStatus, deleteComplaint };
