// models/foodModel.js
const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Ensure name is required
    },
    description: {
        type: String,
        required: true, // Ensure description is required
    },
    price: {
        type: Number,
        required: true, // Ensure price is required
    },
    image: {
        type: String,
        required: true, // Ensure image URL is required
    },
    category: {
        type: String,
        required: true, // Ensure category is required
    },
    isVeg: {
        type: Boolean,
        required: true, // Ensure isVeg is required
    }
});

const Food = mongoose.model('Food', foodSchema);
module.exports = Food;
