const User = require('../models/User');
const paypalService = require('../services/paypalService');

const PLANS = {
  pro: {
    name: 'Pro',
    monthly: { price: 29, vendors: 50 },
    yearly: { price: 199, vendors: 50 }
  },
  enterprise: {
    name: 'Enterprise',
    monthly: { price: 99, vendors: 'Unlimited' },
    yearly: { price: 699, vendors: 'Unlimited' }
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { plan, period = 'monthly' } = req.body;
    const user = req.user;

    if (!PLANS[plan]) return res.status(400).json({ error: 'Invalid plan' });
    const planData = PLANS[plan][period];
    if (!planData) return res.status(400).json({ error: 'Invalid period' });

    const amount = planData.price.toFixed(2);
    const description = `VigilSure ${PLANS[plan].name} (${period}) - $${amount}`;

    const order = await paypalService.createOrder(amount, description);

    await User.findByIdAndUpdate(user._id, {
      pendingPlan: plan,
      pendingPeriod: period,
      pendingOrderId: order.id
    });

    res.json({
      orderId: order.id,
      approvalUrl: order.links.find(l => l.rel === 'approve').href
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.captureOrder = async (req, res) => {
  try {
    const { orderId, plan, period } = req.body;
    const user = req.user;

    if (user.pendingOrderId !== orderId) {
      return res.status(400).json({ error: 'Order mismatch' });
    }

    const capture = await paypalService.captureOrder(orderId);
    if (capture.status !== 'COMPLETED') {
      throw new Error('Payment not completed');
    }

    const planConfig = PLANS[plan][period];
    if (!planConfig) return res.status(400).json({ error: 'Invalid plan' });

    const credits = plan === 'enterprise' ? 999999 : (period === 'yearly' ? 600 : 50);

    await User.findByIdAndUpdate(user._id, {
      plan: plan,
      planPeriod: period,
      credits: credits,
      $unset: { pendingPlan: '', pendingPeriod: '', pendingOrderId: '' }
    });

    res.json({
      success: true,
      message: `Upgraded to ${PLANS[plan].name} (${period})`,
      plan,
      period
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSubscriptionStatus = async (req, res) => {
  try {
    const user = req.user;
    const planConfig = PLANS[user.plan]?.[user.planPeriod || 'monthly'] || null;
    res.json({
      plan: user.plan,
      period: user.planPeriod || 'monthly',
      planName: planConfig ? PLANS[user.plan].name : 'Free',
      credits: user.plan === 'enterprise' ? 'Unlimited' : user.credits,
      vendorLimit: planConfig ? planConfig.vendors : 5
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancelSubscription = async (req, res) => {
  try {
    const user = req.user;
    if (user.plan === 'free') {
      return res.status(400).json({ error: 'Already on free plan' });
    }
    await User.findByIdAndUpdate(user._id, {
      plan: 'free',
      planPeriod: 'monthly',
      credits: 5
    });
    res.json({ message: 'Cancelled, downgraded to Free' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
