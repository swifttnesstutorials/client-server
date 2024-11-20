const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Securely use secret key
const router = express.Router();

// POST request to create payment intent
router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body; // The amount in INR that the user will pay

  // Convert INR to paisa (100 paisa = 1 INR)
  const amountInPaisa = amount * 100;

  if (amountInPaisa < 5000) {
    return res.status(400).json({
      message: "The amount is too low. Please ensure it's above the minimum allowed (50 INR).",
    });
  }

  try {
    // Create the Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInPaisa,  // Amount in paisa
      currency: 'inr',        // Currency set to INR
      payment_method_types: ['card'], // Allow card payments
    });

    // Return the client secret to the frontend to complete the payment
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ message: "Payment failed", error: error.message });
  }
});

module.exports = router;