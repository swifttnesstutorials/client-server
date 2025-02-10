const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middlewares/authMiddlewares.js');
const { getAllAdmin, getAdminById, adminSignup, updateAdmin, deleteAdmin } = require('../controllers/adminControllers.js');

router.get('/',verifyToken, isAdmin, getAllAdmin);

router.get('/:adminId',verifyToken, isAdmin, getAdminById);

router.post('/admin', adminSignup);

router.patch('/:adminId',verifyToken, isAdmin, updateAdmin);  // Fixed this line

router.delete('/:adminId',verifyToken, isAdmin, deleteAdmin);

module.exports = router;