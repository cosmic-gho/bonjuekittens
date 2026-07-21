require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('Configured with:', process.env.CLOUDINARY_CLOUD_NAME);

cloudinary.uploader.upload_stream({}, (error, result) => {
  if (error) console.error('Error:', error);
  else console.log('Success:', result.secure_url);
}).end(Buffer.from('test buffer, obviously invalid image'));
