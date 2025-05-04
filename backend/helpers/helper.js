const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = async (buffer, originalname) => {
  try {
    
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "hotel_rooms",
          resource_type: "image",
          allowed_formats: ["jpg", "png", "jpeg"],
          public_id: `${Date.now()}_${originalname.replace(/\s+/g, "_")}`,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

module.exports = { uploadToCloudinary };