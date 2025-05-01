const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: mongoose.Schema.Types.ObjectId, ref: "State", required: true },
  isActive: { type: Boolean, default: true },
});

const City = mongoose.model('City', citySchema);