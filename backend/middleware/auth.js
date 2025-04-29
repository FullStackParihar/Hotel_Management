 
const jwt = require("jsonwebtoken");
const secret = process.env.secretKey;
const userModel = require("../model/userModel");

module.exports = async (req, res, next) => {
  const barreToken = req.headers.authorization;

  if (!barreToken || !barreToken.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid or missing token" });
  }

  const token = barreToken.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  try {
    const decode = jwt.verify(token, secret);

    // Fetch user from database after decoding the token
    const user = await userModel.findOne({ email: decode.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Set the user info on the req object
    req.user = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Authentication failed. Please log in again." });
  }
};
