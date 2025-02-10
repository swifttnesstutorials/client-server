const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel.js");
const Coupon = require("../models/couponModel.js");

const { placeOrder, cancelOrder, getMyOrders } = require("../controllers/orderControllers.js");
const { verifyToken } = require("../middlewares/authMiddlewares.js");

// 🛒 Place an Order
router.post("/place", verifyToken, placeOrder);

// ❌ Cancel an Order
router.put("/cancel/:id", verifyToken, cancelOrder);

// 📦 Get Logged-in User's Orders
router.get("/my-orders", verifyToken, getMyOrders);

module.exports = router;
