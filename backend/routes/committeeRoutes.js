const express = require('express');
const router = express.Router();
const { getCommitteeMembers, createCommitteeMember, updateCommitteeMember, deleteCommitteeMember } = require('../controllers/committeeController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getCommitteeMembers).post(protect, admin, createCommitteeMember);
router.route('/:id').put(protect, admin, updateCommitteeMember).delete(protect, admin, deleteCommitteeMember);

module.exports = router;
