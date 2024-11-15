const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddlewares.js');
const { getUserProfile, userSignup, userLogin, updateUser, deleteUser } = require('../controllers/userControllers.js');  // Corrected import path

// Routes
router.post('/signup', userSignup);
router.post('/login', userLogin);

// Profile route for authenticated users
router.get('/profile', verifyToken, getUserProfile);

router.patch('/:userId', verifyToken, updateUser);
router.delete('/:userId', verifyToken, deleteUser);

module.exports = router;
