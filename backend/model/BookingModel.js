const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  members: {
    type: Number,
    required: true,
    min: 1,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  hasChild: {
    type: Boolean,
    required: true,
  },
  phone: {
    type: String,
    required: true,

  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  checkedIn: { type: Boolean, default: false }, 
});

module.exports = mongoose.model("Booking", bookingSchema);