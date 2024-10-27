const express = require('express');
const foodRoutes = require('./routes/foodRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const roleRoutes = require('./routes/roleRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

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

// Start server and connect to MongoDB
async function main() {
    try {
        await mongoose.connect('mongodb+srv://aryanandhaaryanandha5:4Bh1827PvvzBJv2V@cluster0.rwrcn.mongodb.net/', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB successfully");
        
        app.listen(port, '0.0.0.0', () => {
            console.log(`Example app listening on port ${port}`);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

main();
