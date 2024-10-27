const mongoose = require("mongoose");
console.log(process.env.MONGO_URI)
const connectdb = async (req,res) => {
    try {
        await mongoose.connect("mongodb+srv://aryanandhaaryanandha5:4Bh1827PvvzBJv2V@cluster0.rwrcn.mongodb.net");
        console.log("Connected to the database");
    } catch (error) {
        console.log("Database connection error:", error);
     
        throw error;
    }
};

module.exports = { connectdb };