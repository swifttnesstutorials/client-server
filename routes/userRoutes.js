const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddlewares');
const { getUserProfile, userSignup, userLogin, updateUser, deleteUser } = require('../controllers/usercontrollers');

router.post('/signup', userSignup);
router.post('/login', userLogin);

// Profile route for authenticated users
router.get('/profile', verifyToken, getUserProfile); // New profile route

router.patch('/:userId', verifyToken, updateUser);
router.delete('/:userId', verifyToken, deleteUser);

module.exports = router;
