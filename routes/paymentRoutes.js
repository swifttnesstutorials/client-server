const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Securely use secret key
const router = express.Router();
const { verifyToken, isAdmin } = require('../middlewares/authMiddlewares.js'); // ✅ Correct import
const Order = require('../models/orderModel.js'); // ✅ Import Order model
const Coupon = require('../models/couponModel.js'); // ✅ Import Coupon Model

// 🟢 Route: Create Payment Intent
router.post('/create-payment-intent', async (req, res) => {
  const { amount, couponCode } = req.body; // Include couponCode if provided

  let discountedAmount = amount; // Default to original amount

  try {
    // Apply discount if couponCode is provided
    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode });

      if (!coupon) {
        return res.status(400).json({ message: "Invalid coupon code" });
      }

      // Calculate discount based on type (percentage or fixed)
      if (coupon.discountType === "percentage") {
        discountedAmount = amount - (amount * coupon.discountValue) / 100;
      } else if (coupon.discountType === "fixed") {
        discountedAmount = amount - coupon.discountValue;
      }

      // Ensure the discounted amount is not negative
      discountedAmount = Math.max(discountedAmount, 0);
    }

    // Convert INR to paisa (100 paisa = 1 INR)
    const amountInPaisa = discountedAmount * 100;

    if (amountInPaisa < 5000) {
      return res.status(400).json({
        message: "The amount is too low. Please ensure it's above the minimum allowed (50 INR).",
      });
    }

    // Create the Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInPaisa,  // Amount in paisa
      currency: 'inr',        // Currency set to INR
      payment_method_types: ['card'], // Allow card payments
    });

    // Return the client secret and the discounted amount
    res.send({ 
      clientSecret: paymentIntent.client_secret, 
      finalAmount: discountedAmount // Send updated amount
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ message: "Payment failed", error: error.message });
  }
});

// 🟢 Route: Place Order (Save Order After Payment)
router.post('/place-order', verifyToken, async (req, res) => {
  try {
    const { items, finalAmount, paymentId, couponCode } = req.body;
    const userId = req.user.id; // Get user from authMiddleware

    let discountedAmount = finalAmount; // Start with original finalAmount

    // Apply discount if a coupon code is provided
    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode });

      if (!coupon) {
        return res.status(400).json({ message: "Invalid coupon code" });
      }

      // Calculate discount (percentage or fixed)
      if (coupon.discountType === "percentage") {
        discountedAmount = finalAmount - (finalAmount * coupon.discountValue) / 100;
      } else if (coupon.discountType === "fixed") {
        discountedAmount = finalAmount - coupon.discountValue;
      }

      // Ensure the discounted amount is not negative
      discountedAmount = Math.max(discountedAmount, 0);
    }

    // Create a new order with the updated amount
    const newOrder = new Order({
      userId,
      items,
      finalAmount: discountedAmount, // Store the discounted amount
      paymentId,
      status: "Processing",
      appliedCoupon: couponCode || null, // Save the applied coupon if any
    });

    await newOrder.save(); // Save to DB

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Order failed", error: error.message });
  }
});

// 🟢 Route: Get User's Orders
router.get('/my-orders', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const orders = await Order.find({ userId })
      .populate("items.foodId", "name price image") // Get food details
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
});

module.exports = router;
