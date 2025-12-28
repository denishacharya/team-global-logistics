const express = require('express');
const router = express.Router();
const cookieController = require('../controllers/cookieController');

// Get cookie policy
router.get('/policy', cookieController.getCookiePolicy);

// Get user's cookie preferences
router.get('/preferences', cookieController.getPreferences);

// Save cookie preferences
router.post('/preferences', cookieController.savePreferences);

// Check if preferences are set
router.get('/status', cookieController.getStatus);

module.exports = router;