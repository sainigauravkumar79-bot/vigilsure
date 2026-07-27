const router = require('express').Router();
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { uploadCOI, getInsurancesForVendor, getAllInsurances } = require('../controllers/insuranceController');

router.post('/upload', auth, upload.single('file'), uploadCOI);
router.get('/vendor/:vendorId', auth, getInsurancesForVendor);
router.get('/', auth, getAllInsurances);

module.exports = router;
