const express = require('express');
const foodRoutes = require('./routes/foodRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const roleRoutes = require('./routes/roleRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const stripe = require('stripe')('sk_test_51QHozPIiBslsh4IXfqKOhSUNWO4lCKJajwYr1WAgGB2dhSgCAcuhSN3HSmVFIE9sojYBcvIvICnag9EunZTSkTu400pbcvLqe0'); // Replace with your Stripe Secret Key
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// List of allowed origins (both local and deployed frontend)
const allowedOrigins = ['http://localhost:5173', 'https://client-ten-nu-42.vercel.app'];

// CORS configuration to allow both origins
app.use(cors({
  origin: function(origin, callback) {
    // Check if the origin is in the allowed list or if there is no origin (e.g., Postman)
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Block the request if the origin is not in the allowed list
    }
  },
  methods: ['GET', 'POST', 'DELETE'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));

app.use(express.json());
app.use(bodyParser.json());

// Define routes
app.use('/foods', foodRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/carts', cartRoutes);
app.use('/usersignup', userRoutes);
app.use('/adminsignup', adminRoutes);
app.use('/login', authRoutes);
app.use('/logout', authRoutes);
app.use('/checkRole', roleRoutes);
app.use('/payments', paymentRoutes);

app.post('/api/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  // Ensure amount is converted to paisa (smallest unit of INR)
  const amountInPaisa = amount * 100; // Convert INR to paisa

  try {
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInPaisa, // Amount in paisa (smallest unit of INR)
      currency: 'inr', // Use INR currency code
      payment_method_types: ['card'],
    });

    // Send the client secret to the frontend
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    
    // Send a more descriptive error message
    if (error.type === 'StripeInvalidRequestError' && error.code === 'amount_too_small') {
      res.status(400).json({ message: 'Amount must be at least 50 cents (INR 50) in the smallest unit (paisa).' });
    } else {
      res.status(500).json({ message: "Payment failed", error: error.message });
    }
  }
});

async function main() {
  try {
    await mongoose.connect('mongodb+srv://aryanandhaaryanandha5:4Bh1827PvvzBJv2V@cluster0.rwrcn.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");

    app.listen(port, '0.0.0.0', () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

main();
