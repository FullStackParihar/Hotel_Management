const mongoose = require('mongoose');
const contact = require('../model/contactusmodel');

exports.addContactUs = async (req, res) => {
  try {
    const contactUs = new contact(req.body);
    await contactUs.save();
    res.status(201).json({ message: "Contact Us entry created successfully", data: contactUs });
  } catch (err) {
    console.error("POST /api/contactus - Error:", err);
    res.status(500).json({ message: "Failed to create Contact Us entry", error: err.message });
  }
}