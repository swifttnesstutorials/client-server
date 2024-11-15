const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51QHozPIiBslsh4IXfqKOhSUNWO4lCKJajwYr1WAgGB2dhSgCAcuhSN3HSmVFIE9sojYBcvIvICnag9EunZTSkTu400pbcvLqe0');

router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount, 
      currency: 'INR',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;