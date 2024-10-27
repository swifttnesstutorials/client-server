
// imageUpload.js
const { cloudinaryInstance } = require('../config/cloudinaryConfig.js'); // Importing the cloudinaryInstance

const handleimageupload = async (path) => {
    try {
        const imageresult = await cloudinaryInstance.uploader.upload(path); // Using cloudinaryInstance to upload image
        return imageresult.url;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Failed to upload image');
    }
};

module.exports = { handleimageupload };
