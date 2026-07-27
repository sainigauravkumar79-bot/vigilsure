const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  company: String,
  status: { type: String, enum: ['active', 'inactive', 'expired'], default: 'active' },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vendor', vendorSchema);
