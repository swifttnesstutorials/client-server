// controllers/foodControllers.js
const Food = require('../models/foodModel.js');

const getAllFood = async (req, res) => {
    try {
        const foods = await Food.find({}, 'name description price image'); // ✅ Select only required fields
        res.json(foods);
    } catch (error) {
        console.error("Error fetching food items:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.foodId).select('name description price image'); // ✅ Select only required fields
        if (!food) {
            return res.status(404).json({ error: "Food item not found" });
        }
        res.json(food);
    } catch (error) {
        console.error("Error fetching food item:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const postFood = async (req, res) => {
    try {
        const { name, description, price, image } = req.body;
        
        if (!name || !description || !price || !image) {
            return res.status(400).json({ error: "All fields (name, description, price, image) are required." });
        }

        const food = new Food({ name, description, price, image }); // ✅ Only storing required fields
        await food.save();
        res.status(201).json(food);
    } catch (error) {
        console.error("Error adding food item:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateFood = async (req, res) => {
    try {
        const { name, description, price, image } = req.body;

        const updatedFood = await Food.findByIdAndUpdate(
            req.params.foodId,
            { name, description, price, image }, // ✅ Only updating required fields
            { new: true, runValidators: true }
        ).select('name description price image');

        if (!updatedFood) {
            return res.status(404).json({ error: "Food item not found" });
        }

        res.json(updatedFood);
    } catch (error) {
        console.error("Error updating food item:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteFood = async (req, res) => {
    try {
        const deletedFood = await Food.findByIdAndDelete(req.params.foodId);
        if (!deletedFood) {
            return res.status(404).json({ error: "Food item not found" });
        }
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("Error deleting food item:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    getAllFood,
    getFoodById,
    postFood,
    updateFood,
    deleteFood
};
