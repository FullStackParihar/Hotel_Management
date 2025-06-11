const mongoose = require('mongoose');
const contactUsSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ContactUs', contactUsSchema); 