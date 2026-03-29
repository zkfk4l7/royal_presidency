const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUsers, deleteUser, updateUserRole, adminCreateUser, updateUser } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/admin', protect, admin, adminCreateUser);
router.post('/login', authUser);
router.route('/:id').delete(protect, admin, deleteUser).put(protect, admin, updateUser);
router.route('/:id/role').put(protect, admin, updateUserRole);

module.exports = router;
