
const express = require('express');
const router = express.Router();
const { submitContactForm } = require('../controllers/contactController');
const { validateContactForm, validateRequest } = require('../middleware/validation');

// Submit contact form
router.post('/submit', validateContactForm, validateRequest, submitContactForm);

module.exports = router;