// controllers/foodControllers.js
const Food=require('../models/foodModel')

const getAllFood=async(req, res) => {

  const { vegOnly } = req.query;  // Capture query parameter for filtering...veg or non veg filteration happens here
  let filter = {};
  
  if (vegOnly === 'true') {
      filter.isVeg = true;
  } else if (vegOnly === 'false') {
      filter.isVeg = false;
  }

  const foods = await Food.find(filter);
    res.json(foods)
  }

 const getFoodById= async(req, res) => {
  const food=await Food.findById(req.params.foodId).exec();
  res.json(food)
  }
  
 const postFood=async(req, res) => {
  const data=req.body
  const food = new Food(data)
  await food.save()
  res.json(food)
 
  }

 const updateFood=async (req, res) => {
  const updatedfood=await Food.findByIdAndUpdate(req.params.foodId, req.body, {new:true})
  res.json(updatedfood)
  } 

 const deleteFood=async (req, res) => {
  await Food.findByIdAndDelete(req.params.foodId)
    res.send('Deleted')
  }
  
  module.exports={
    getAllFood,
    getFoodById,
    postFood,
    updateFood,
    deleteFood
  }