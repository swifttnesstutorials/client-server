const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddlewares.js');
const { getAllUser, getUserById, userSignup, updateUser, deleteUser } = require('../controllers/userControllers.js');

router.get('/',  getAllUser);

router.get('/:userId',verifyToken,  getUserById);

router.post('/user', userSignup);

router.patch('/:userId', verifyToken, updateUser);  // Fixed this line

router.delete('/:userId',  deleteUser);

module.exports = router;