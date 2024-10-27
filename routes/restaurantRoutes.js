const express = require('express');
const router = express.Router();
const {
    getAllRestaurants,
    getVegRestaurants,
    getNonVegRestaurants,
    getRestaurantById,
    postRestaurant,
    updateRestaurant,
    deleteRestaurant
} = require('../controllers/restaurantControllers.js');

router.get('/', getAllRestaurants);
router.get('/veg', getVegRestaurants); // Route for veg restaurants
router.get('/non-veg', getNonVegRestaurants); // Route for non-veg restaurants
router.get('/:restaurantId', getRestaurantById);
router.post('/', postRestaurant);
router.patch('/:restaurantId', updateRestaurant);  // Fixed this line
router.delete('/:restaurantId', deleteRestaurant);

module.exports = router;
