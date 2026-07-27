const router = require('express').Router();
const { auth } = require('../middleware/auth');
const { createOrder, captureOrder, getSubscriptionStatus, cancelSubscription } = require('../controllers/paymentController');

router.post('/create-order', auth, createOrder);
router.post('/capture-order', auth, captureOrder);
router.get('/status', auth, getSubscriptionStatus);
router.post('/cancel', auth, cancelSubscription);

module.exports = router;
