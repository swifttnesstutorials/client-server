const express = require('express');
const router = express.Router();
const { userLogin, adminLogin, userLogout, adminLogout } = require('../controllers/authControllers.js');

// Use POST for login and logout
router.post('/userlogin', userLogin);
router.post('/adminlogin', adminLogin);
router.post('/userlogout', userLogout); // Changed to POST
router.post('/adminlogout', adminLogout); // Changed to POST

module.exports = router;
