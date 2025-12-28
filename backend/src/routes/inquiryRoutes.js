const express = require('express');
const router = express.Router();
const { submitInquiryForm } = require('../controllers/inquiryController');
const { validateInquiryForm, validateRequest } = require('../middleware/validation');

// Submit inquiry/quotation form
router.post('/submit', validateInquiryForm, validateRequest, submitInquiryForm);

module.exports = router;