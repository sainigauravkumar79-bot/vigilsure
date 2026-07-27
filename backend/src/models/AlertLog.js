const mongoose = require('mongoose');

const alertLogSchema = new mongoose.Schema({
  insurance: { type: mongoose.Schema.Types.ObjectId, ref: 'Insurance', required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['30_days', '15_days', '7_days', '1_day', 'expired'], required: true },
  sentTo: { vendor: { type: Boolean, default: true }, user: { type: Boolean, default: true } },
  sentAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AlertLog', alertLogSchema);
