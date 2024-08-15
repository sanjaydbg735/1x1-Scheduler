const express = require('express');
const {getPaymentDetails} = require('../controllers/paymentController');
const router = express.Router();

router.get('/', getPaymentDetails);

module.exports = router;
