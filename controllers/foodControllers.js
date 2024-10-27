// controllers/foodControllers.js
const Food = require('../models/foodModel');

const getAllFood = async (req, res) => {
    try {
        const { vegOnly } = req.query;  // Capture query parameter for filtering
        let filter = {};
        
        if (vegOnly === 'true') {
            filter.isVeg = true;
        } else if (vegOnly === 'false') {
            filter.isVeg = false;
        }

        const foods = await Food.find(filter);
        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.foodId).exec();
        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }
        res.json(food);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const postFood = async (req, res) => {
    try {
        const data = req.body;
        const food = new Food(data);
        await food.save();
        res.status(201).json(food); // Return created status
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateFood = async (req, res) => {
    try {
        const updatedFood = await Food.findByIdAndUpdate(req.params.foodId, req.body, { new: true });
        if (!updatedFood) {
            return res.status(404).json({ message: 'Food not found' });
        }
        res.json(updatedFood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteFood = async (req, res) => {
    try {
        const deletedFood = await Food.findByIdAndDelete(req.params.foodId);
        if (!deletedFood) {
            return res.status(404).json({ message: 'Food not found' });
        }
        res.send('Deleted');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllFood,
    getFoodById,
    postFood,
    updateFood,
    deleteFood
};
