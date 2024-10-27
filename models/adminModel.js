const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: String,
    role:  String,
    email: String,
    password: String, 
    mobile:  Number
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;  // Fix: Exporting the correct constant
