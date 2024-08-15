const express = require('express');
const { bookMentor } = require('../controllers/bookingController');
const router = express.Router();

router.post('/book', bookMentor);

module.exports = router;
