const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  policyNumber: { type: String, required: true },
  insuredName: { type: String, required: true },
  insurerName: String,
  effectiveDate: Date,
  expiryDate: { type: Date, required: true },
  coverageLimits: String,
  status: { type: String, enum: ['active', 'expired', 'pending_renewal'], default: 'active' },
  remindersSent: [Date],
  createdAt: { type: Date, default: Date.now }
});

insuranceSchema.index({ expiryDate: 1 });

module.exports = mongoose.model('Insurance', insuranceSchema);
