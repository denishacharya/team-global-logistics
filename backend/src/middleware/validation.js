const { body, validationResult } = require('express-validator');

const validateContactForm = [
  body('name').trim().notEmpty().withMessage('Name is required').escape(),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').optional().trim().escape(),
  body('subject').optional().trim().escape(),
  body('message').trim().notEmpty().withMessage('Message is required').escape()
];

const validateInquiryForm = [
  body('companyName').trim().notEmpty().withMessage('Company name is required').escape(),
  body('contactPerson').trim().notEmpty().withMessage('Contact person is required').escape(),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').trim().notEmpty().withMessage('Phone number is required').escape(),
  body('country').trim().notEmpty().withMessage('Country is required').escape(),
  body('productName').trim().notEmpty().withMessage('Product name is required').escape(),
  body('quantity').trim().notEmpty().withMessage('Quantity is required').escape(),
  body('destinationPort').trim().notEmpty().withMessage('Destination port is required').escape()
];

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

module.exports = { validateContactForm, validateInquiryForm, validateRequest };