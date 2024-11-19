const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Ensure Stripe secret key is set in the environment
const router = express.Router();

// POST request to create a checkout session
router.post('/create-checkout-session', async (req, res) => {
  const { amount, currency = 'inr', description, cartItems } = req.body; // Get amount, currency, and cart items from the request body
  
  const amountInPaisa = amount * 100; // Stripe works with the smallest currency unit (e.g., paisa for INR)

  try {
    // Create the Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // Accept card payments
      line_items: cartItems.map(item => ({
        price_data: {
          currency, // Currency (INR by default)
          product_data: {
            name: item.name, // Use the product's name from the cart item
            description: item.description || description, // Use description if provided
          },
          unit_amount: item.price * 100, // Amount in paisa
        },
        quantity: item.quantity, // Quantity of items
      })),
      mode: 'payment', // Use 'payment' mode for one-time payment
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`, // Ensure correct success URL
      cancel_url: `${process.env.FRONTEND_URL}/cart`, // Ensure correct cancel URL
    });

    // Send back the session URL for Stripe Checkout redirection
    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET request to verify the payment session status
router.get('/payment/verify-session', async (req, res) => {
  const { session_id } = req.query;

  try {
    // Retrieve the session details from Stripe using the session_id
    const session = await stripe.checkout.sessions.retrieve(session_id);

    // Check if the payment was successful
    if (session.payment_status === 'paid') {
      res.json({ paymentStatus: 'succeeded' });
    } else {
      res.json({ paymentStatus: 'failed' });
    }
  } catch (error) {
    console.error('Error verifying session:', error);
    res.status(500).json({ error: 'Failed to verify session' });
  }
});

module.exports = router;
