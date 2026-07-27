const router = require('express').Router();
const { auth } = require('../middleware/auth');
const { getStats, getExpiryChart } = require('../controllers/dashboardController');

router.get('/stats', auth, getStats);
router.get('/chart', auth, getExpiryChart);

module.exports = router;
