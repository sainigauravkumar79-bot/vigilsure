const Vendor = require('../models/Vendor');

exports.createVendor = async (req, res) => {
  try {
    const vendor = new Vendor({ ...req.body, user: req.user._id });
    await vendor.save();
    res.status(201).json(vendor);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find({ user: req.user._id });
    res.json(vendors);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ _id: req.params.id, user: req.user._id });
    if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
    res.json(vendor);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
    res.json(vendor);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.deleteVendor = async (req, res) => {
  try {
    const result = await Vendor.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!result) return res.status(404).json({ error: 'Vendor not found' });
    res.json({ message: 'Vendor deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
