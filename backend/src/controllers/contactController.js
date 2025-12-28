const emailService = require('../services/emailService');

const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    // Send email
    const result = await emailService.sendContactEmail({
      name, email, phone, subject, message
    });
    
    if (result.success) {
      res.json({
        success: true,
        message: 'Thank you for contacting us! We will get back to you shortly.'
      });
    } else {
      console.error('Email sending failed:', result.error);
      res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again later.'
      });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again.'
    });
  }
};

module.exports = { submitContactForm };