const Insurance = require('../models/Insurance');
const Vendor = require('../models/Vendor');
const parserService = require('../services/paperService');

// POST /api/insurance/upload  (multipart/form-data, field: "file", body: vendorId)
exports.uploadCOI = async (req, res) => {
  try {
    const { vendorId } = req.body;
    if (!vendorId) return res.status(400).json({ error: 'vendorId is required' });
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const vendor = await Vendor.findOne({ _id: vendorId, user: req.user._id });
    if (!vendor) return res.status(404).json({ error: 'Vendor not found' });

    const { rawText, parsed } = await parserService.processCOI(req.file.buffer, req.file.mimetype);

    if (!parsed.policyNumber || !parsed.expiryDate) {
      return res.status(422).json({
        error: 'Could not extract required fields (policy number / expiry date) from the document',
        parsed,
        rawText
      });
    }

    const expiryDate = new Date(parsed.expiryDate);
    const effectiveDate = parsed.effectiveDate ? new Date(parsed.effectiveDate) : undefined;

    const insurance = new Insurance({
      vendor: vendor._id,
      user: req.user._id,
      policyNumber: parsed.policyNumber,
      insuredName: parsed.insuredName || vendor.name,
      insurerName: parsed.insurerName,
      effectiveDate,
      expiryDate,
      coverageLimits: parsed.coverageLimits,
      status: expiryDate < new Date() ? 'expired' : 'active'
    });

    await insurance.save();
    res.status(201).json(insurance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/insurance/vendor/:vendorId
exports.getInsurancesForVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ _id: req.params.vendorId, user: req.user._id });
    if (!vendor) return res.status(404).json({ error: 'Vendor not found' });

    const insurances = await Insurance.find({ vendor: vendor._id, user: req.user._id }).sort({ expiryDate: 1 });
    res.json(insurances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/insurance
exports.getAllInsurances = async (req, res) => {
  try {
    const insurances = await Insurance.find({ user: req.user._id })
      .populate('vendor', 'name email company status')
      .sort({ expiryDate: 1 });
    res.json(insurances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
