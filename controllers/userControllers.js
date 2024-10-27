const User=require('../models/userModel.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

const getAllUser=async(req, res) => {
    const users=await User.find({});
    res.json(users)
  }

 const getUserById= async(req, res) => {
  const user=await User.findById(req.params.userId).exec();
  res.json(user)
  }
  
  const userSignup = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  
    const user = new User({
      name,
      email,
      password: hashedPassword
    });
  
    await user.save();
  
    // Add name and email to the token payload
    const token = jwt.sign(
      { _id: user._id, role: 'user', name: user.name, email: user.email }, 
      '61b19ed193347d3a3c2b056ca3cf0af8639cea06a78ab8cb8c03a66f81c725634de8db004b5404e2f2418eae68f34b8ab1b1763a4a0cc2dcfd8a9a0dfc163719'
    );
    
    res.cookie("token", token,{
      sameSite:"None",
      secure: true,
      httpOnly:true,
    });
  
    // Include the user name and email in the response
    res.json({
      success: true,
      message: "User created successfully",
      token,
      name: user.name,
      email: user.email
    });
  };
  
  


  const updateUser=async (req, res) => {
    const updateduser=await User.findByIdAndUpdate(req.params.userId, req.body, {new:true})
    res.json(updateduser)
    } 
  
   const deleteUser=async (req, res) => {
    await User.findByIdAndDelete(req.params.userId)
      res.send('Deleted')
    }
    
    module.exports={
      getAllUser,
      getUserById,
      userSignup,
      updateUser,
      deleteUser
    };