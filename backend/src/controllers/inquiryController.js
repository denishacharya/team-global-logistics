const emailService = require('../services/emailService');

const submitInquiryForm = async (req, res) => {
  try {
    const formData = req.body;
    
    // Send email
    const result = await emailService.sendInquiryEmail(formData);
    
    if (result.success) {
      res.json({
        success: true,
        message: 'Quotation request submitted successfully! We will send you the quotation within 24 hours.',
        referenceId: `#${Date.now().toString().slice(-8)}`
      });
    } else {
      console.error('Email sending failed:', result.error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit quotation request. Please try again later.'
      });
    }
  } catch (error) {
    console.error('Inquiry form error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again.'
    });
  }
};

module.exports = { submitInquiryForm };