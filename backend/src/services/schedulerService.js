const cron = require('node-cron');
const Insurance = require('../models/Insurance');
const AlertLog = require('../models/AlertLog');
const { sendExpiryAlert } = require('./emailService');

exports.startScheduler = () => {
  cron.schedule('0 8 * * *', async () => {
    console.log('⏰ Running daily expiry check...');
    const today = new Date();
    const insurances = await Insurance.find({ status: 'active' }).populate('vendor').populate('user');
    for (const insurance of insurances) {
      const diffDays = Math.ceil((new Date(insurance.expiryDate) - today) / (1000*60*60*24));
      const alertTypes = { 30: '30_days', 15: '15_days', 7: '7_days', 1: '1_day', 0: 'expired' };
      const type = alertTypes[diffDays] || null;
      if (type) {
        const existing = await AlertLog.findOne({ insurance: insurance._id, type });
        if (!existing) {
          await sendExpiryAlert(insurance.vendor, insurance, diffDays < 0 ? 0 : diffDays, insurance.user);
          await new AlertLog({ insurance: insurance._id, vendor: insurance.vendor._id, user: insurance.user._id, type }).save();
          console.log(`✅ Alert sent for ${insurance.vendor.name} - ${type}`);
        }
      }
    }
  });
  console.log('⏰ Scheduler started – will run daily at 8:00 AM.');
};
