const User = require("../models/userModel.js");
const Admin=require("../models/adminModel.js")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec();
  
  if (!user) {
    return res.status(404).json({ success: false, message: "Unauthorized access" });
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);
  
  if (passwordMatch) {
    const token = jwt.sign({ _id: user._id, role: 'user', name: user.name, email: user.email }, '61b19ed193347d3a3c2b056ca3cf0af8639cea06a78ab8cb8c03a66f81c725634de8db004b5404e2f2418eae68f34b8ab1b1763a4a0cc2dcfd8a9a0dfc163719');
    res.cookie("token", token,{
      sameSite:"None",
      secure: true,
      httpOnly:true,
    });
  

    // Include the user name in the response
    res.json({
      success: true,
      message: "User Logged in",
      token,
      name: user.name, // Send name in response
      email: user.email
    });
  } else {
    return res.status(401).json({ success: false, message: "Unauthorized access" });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email }).exec();

  if (!admin) {
    return res.status(404).json({ success: false, message: "Unauthorized access" });
  }

  const passwordMatch = bcrypt.compareSync(password, admin.password);

  if (passwordMatch) {
    const token = jwt.sign({ _id: admin._id, role: 'admin' }, '61b19ed193347d3a3c2b056ca3cf0af8639cea06a78ab8cb8c03a66f81c725634de8db004b5404e2f2418eae68f34b8ab1b1763a4a0cc2dcfd8a9a0dfc163719');
    res.cookie("token", token,{
      sameSite:"None",
      secure: true,
      httpOnly:true,
    });
  
    // Include the admin name in the response
    res.json({
      success: true,
      message: "Admin Logged in",
      token,
      name: admin.name // Send name in response
    });
  } else {
    return res.status(401).json({ success: false, message: "Unauthorized access" });
  }
};


  const userLogout = (req, res) => {
    res.clearCookie("token"); // Clear the cookie containing the JWT
    res.json({ success: true, message: "User Logged out successfully" });
  }
  const adminLogout = (req, res) => {
    res.clearCookie("token"); // Clear the cookie containing the JWT
    res.json({ success: true, message: "Admin Logged out successfully" });
  }
     
    module.exports={
      
      userLogin,
      adminLogin,
      userLogout,
      adminLogout
      
    }