const express = require('express');
const router = express.Router();
const multer = require('multer');

// Capture attachments up to 15MB securely
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 }
});

const { getNotices, createNotice, updateNotice, deleteNotice } = require('../controllers/noticeController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, getNotices).post(protect, admin, upload.single('attachment'), createNotice);
router.route('/:id').delete(protect, admin, deleteNotice).put(protect, admin, upload.single('attachment'), updateNotice);

module.exports = router;
