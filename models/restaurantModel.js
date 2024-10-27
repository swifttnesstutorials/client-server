const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    place: {
        type: String,
        required: true
    },
    image: String,
    category: {
        type: String,
        enum: ['veg', 'non-veg'],
        required: true
    }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;
