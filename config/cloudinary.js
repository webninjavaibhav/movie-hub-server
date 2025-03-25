const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config({path: "./config/config.env"});

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadImage(file) {
    // Upload an image
     const imageUrl = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'movies' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        uploadStream.end(file.buffer);
      });
    
    return imageUrl;
};


// Optimize delivery by resizing and applying auto-format and auto-quality
const optimizeUrl = cloudinary.url('movies', {
    fetch_format: 'auto',
    quality: 'auto'
});


// Transform the image: auto-crop to square aspect_ratio
 const autoCropUrl = cloudinary.url('movies', {
    crop: 'auto',
    gravity: 'auto',
    width: 500,
    height: 500,
});

module.exports = {
    uploadImage,
    optimizeUrl,
    autoCropUrl
};