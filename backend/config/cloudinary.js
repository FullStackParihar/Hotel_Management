const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dwvt8pq94", // Replace with your Cloudinary cloud name
  api_key: "216446426953217", // Replace with your API key
  api_secret: "T9SbHOzVWLtT4kg0Y7EVYn2AK_4", // Replace with your API secret
});

module.exports = cloudinary;