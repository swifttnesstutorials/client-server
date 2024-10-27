//import { v2 as cloudinary } from 'cloudinary';
const { v2 } = require('cloudinary');
console.log("hlo")
 // Configuration
v2.config({
    cloud_name: process.env.CLOUD_NAME, //dm6o67zru
    api_key: process.env.CLOUD_API_KEY, //246592999647538
    api_secret: process.env.CLOUD_API_SECRET, //W8Cr6pR71iakMqFVWrGRYZ6tFiw
});

const cloudinaryInstance = v2; // Fix typo in instance name
console.log("haiii",cloudinaryInstance)
module.exports = { cloudinaryInstance };
