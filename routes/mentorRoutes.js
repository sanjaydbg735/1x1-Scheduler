const express = require('express');
const { getMentors, createMentor, setAvailability } = require('../controllers/mentorController');
const router = express.Router();

router.get('/', getMentors);
router.post('/', createMentor);
router.post('/availability', setAvailability);

module.exports = router;
