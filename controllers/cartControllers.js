const Cart=require('../models/cartModel.js')

const getAllCart=async(req, res) => {
    const carts=await Cart.find({});
    res.json(carts)
  }

 const getCartById= async(req, res) => {
  const cart=await Cart.findById(req.params.cartId).exec();
  res.json(cart)
  }
  
 const postCart=async(req, res) => {
  const data=req.body
  const cart = new Cart(data)
  await cart.save()
  res.json(cart)
 
  }

  const updateCart=async (req, res) => {
    const updatedcart=await Cart.findByIdAndUpdate(req.params.cartId, req.body, {new:true})
    res.json(updatedcart)
    } 
  
   const deleteCart=async (req, res) => {
    await Cart.findByIdAndDelete(req.params.cartId)
      res.send('Deleted')
    }
    
    module.exports={
      getAllCart,
      getCartById,
      postCart,
      updateCart,
      deleteCart
    };