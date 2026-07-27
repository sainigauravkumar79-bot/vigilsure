const Vendor = require('../models/Vendor');
const Insurance = require('../models/Insurance');

exports.getStats = async (req, res) => {
  try {
    const totalVendors = await Vendor.countDocuments({ user: req.user._id });
    const activeInsurances = await Insurance.countDocuments({ user: req.user._id, status: 'active' });
    const expiredInsurances = await Insurance.countDocuments({ user: req.user._id, status: 'expired' });
    const expiringSoon = await Insurance.countDocuments({
      user: req.user._id,
      expiryDate: { $gte: new Date(), $lte: new Date(Date.now() + 7*24*60*60*1000) },
      status: 'active'
    });
    res.json({ totalVendors, activeInsurances, expiredInsurances, expiringSoon });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getExpiryChart = async (req, res) => {
  try {
    const data = await Insurance.aggregate([
      { $match: { user: req.user._id } },
      { $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$expiryDate' } },
          count: { $sum: 1 }
      }},
      { $sort: { _id: 1 } },
      { $limit: 30 }
    ]);
    res.json(data);
  } catch (err) { res.status(500).json({ error: err.message }); }
};
