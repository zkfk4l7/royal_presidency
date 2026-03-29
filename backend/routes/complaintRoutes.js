const express = require('express');
const router = express.Router();
const { getComplaints, createComplaint, updateComplaintStatus, deleteComplaint } = require('../controllers/complaintController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, getComplaints).post(protect, createComplaint);
router.route('/:id/status').put(protect, admin, updateComplaintStatus);
router.route('/:id').delete(protect, admin, deleteComplaint);

module.exports = router;
