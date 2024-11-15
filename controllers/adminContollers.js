const Admin=require('../models/adminModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

const getAllAdmin=async(req, res) => {
    const admins=await Admin.find({});
    res.json(admins)
  }

 const getAdminById= async(req, res) => {
  const admin=await Admin.findById(req.params.adminId).exec();
  res.json(admin)
  }
  
  const adminSignup = async (req, res) => {
    const { name, email, password, mobile, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const admin = new Admin({ name, email, password: hashedPassword, mobile, role });
    
    await admin.save();
    
    const token = jwt.sign({ _id: admin._id, role: admin.role },  '61b19ed193347d3a3c2b056ca3cf0af8639cea06a78ab8cb8c03a66f81c725634de8db004b5404e2f2418eae68f34b8ab1b1763a4a0cc2dcfd8a9a0dfc163719');
    
    // Return both token and role in response
    res.json({ success: true, message: "admin created successfully", token, role: admin.role });
  };


  const updateAdmin=async (req, res) => {
    const updatedadmin=await Admin.findByIdAndUpdate(req.params.adminId, req.body, {new:true})
    res.json(updatedadmin)
    } 
  
   const deleteAdmin=async (req, res) => {
    await Admin.findByIdAndDelete(req.params.adminId)
      res.send('Deleted')
    }
    
    module.exports={
      getAllAdmin,
      getAdminById,
      adminSignup,
      updateAdmin,
      deleteAdmin
    }
