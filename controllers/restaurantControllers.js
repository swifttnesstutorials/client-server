const Restaurant = require('../models/restaurantModel.js');

const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find({});
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching restaurants', error });
    }
};

const getVegRestaurants = async (req, res) => {
    try {
        const vegRestaurants = await Restaurant.find({ category: 'veg' });
        res.json(vegRestaurants);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching veg restaurants', error });
    }
};

const getNonVegRestaurants = async (req, res) => {
    try {
        const nonVegRestaurants = await Restaurant.find({ category: 'non-veg' });
        res.json(nonVegRestaurants);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching non-veg restaurants', error });
    }
};

const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching restaurant', error });
    }
};

const postRestaurant = async (req, res) => {
    const data = req.body;
    const restaurant = new Restaurant(data);
    try {
        await restaurant.save();
        res.status(201).json(restaurant);
    } catch (error) {
        res.status(400).json({ message: 'Error creating restaurant', error });
    }
};

const updateRestaurant = async (req, res) => {
    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.restaurantId, req.body, { new: true });
        if (!updatedRestaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json(updatedRestaurant);
    } catch (error) {
        res.status(400).json({ message: 'Error updating restaurant', error });
    }
};

const deleteRestaurant = async (req, res) => {
  try {
      const restaurantId = req.params.restaurantId.trim(); // Ensure ID is trimmed
      const result = await Restaurant.findByIdAndDelete(restaurantId);
      
      if (!result) {
          return res.status(404).json({ message: 'Restaurant not found.' });
      }
      
      res.status(200).json({ message: 'Restaurant deleted successfully.' }); // or res.status(204).send();
  } catch (error) {
      res.status(500).json({
          message: 'Error deleting restaurant.',
          error: { details: error.message } // Optional: Include specific error details
      });
  }
};




module.exports = {
    getAllRestaurants,
    getVegRestaurants,
    getNonVegRestaurants,
    getRestaurantById,
    postRestaurant,
    updateRestaurant,
    deleteRestaurant
};
