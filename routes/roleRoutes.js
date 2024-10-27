const express = require('express');
const {verifyToken} = require('../middlewares/authMiddlewares.js')
const router = express.Router();

router.get('/checkRole', verifyToken, (req, res) => {
  const role = req.user.role; // Extracting the role from JWT
  res.json({ success: true, role });
});

module.exports = router;