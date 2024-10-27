const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: String,
    restaurent:String,
    items: String,
    quantity: Number,
    totalprice:Number,
    status:String
    
  });
  const Cart = mongoose.model('Cart', cartSchema);
  module.exports=Cart;