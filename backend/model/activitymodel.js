const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  ipAddress: {
    type: String,
    required: true
  },

  action: {
    type: String,
    enum: ['login', 'logout', 'signup'],
    required: true
  },
  location:{
  type: String,
 
},
  device: {
  type: String
}

}, { versionKey: false, timestamps: true });

module.exports = mongoose.model('Activity', ActivitySchema);
