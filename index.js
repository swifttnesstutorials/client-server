const express = require('express');
const foodRoutes = require('./routes/foodRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const roleRoutes = require('./routes/roleRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const couponRoutes = require('./routes/couponRoutes');  // ✅ Import coupon routes
const orderRoutes = require('./routes/orderRoutes');  // ✅ Import order routes


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Use environment variable

const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// List of allowed origins (both local and deployed frontend)
const allowedOrigins = ['https://client-ten-nu-42.vercel.app', 'http://localhost:5173'];

// CORS configuration to allow both origins
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      console.error(`Blocked by CORS: ${origin}`);
      callback(new Error('Request blocked by CORS policy.'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// Handle pre-flight requests
app.options('*', (req, res) => {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.sendStatus(200); // Respond with a 200 OK for pre-flight requests
});

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
app.use('/coupons', couponRoutes);  // ✅ New Coupon Route
app.use('/orders', orderRoutes);  // ✅ New Order Route

// Connect to MongoDB and start the server
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      
    });
    console.log('Connected to MongoDB successfully');

    app.listen(port, '0.0.0.0', () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

main();
