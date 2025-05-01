const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
  address: String,
  rating: Number,
  amenities: [String],
  priceRange: { min: Number, max: Number },
  contact: { phone: String, email: String },
  isActive: { type: Boolean, default: true },
});

const Hotel = mongoose.model('Hotel', hotelSchema);