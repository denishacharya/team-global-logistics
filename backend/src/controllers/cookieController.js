const { v4: uuidv4 } = require('uuid');

// In-memory storage for cookie preferences
const cookiePreferences = new Map();

const COOKIE_CATEGORIES = {
  necessary: { name: 'Necessary', required: true },
  analytics: { name: 'Analytics', required: false },
  marketing: { name: 'Marketing', required: false },
  preferences: { name: 'Preferences', required: false }
};

const getCookiePolicy = (req, res) => {
  res.json({
    success: true,
    categories: COOKIE_CATEGORIES,
    policy: {
      lastUpdated: new Date().toISOString().split('T')[0],
      compliance: ['GDPR', 'CCPA']
    }
  });
};

const getPreferences = (req, res) => {
  const userId = req.cookies.userId || uuidv4();
  
  let preferences = cookiePreferences.get(userId) || {
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  };
  
  // Set user ID cookie if not present
  if (!req.cookies.userId) {
    res.cookie('userId', userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 365 * 24 * 60 * 60 * 1000 // 1 year
    });
  }
  
  res.json({
    success: true,
    preferences,
    userId
  });
};

const savePreferences = (req, res) => {
  const userId = req.cookies.userId || uuidv4();
  const { analytics, marketing, preferences } = req.body;
  
  const userPreferences = {
    necessary: true,
    analytics: analytics || false,
    marketing: marketing || false,
    preferences: preferences || false,
    timestamp: new Date().toISOString()
  };
  
  cookiePreferences.set(userId, userPreferences);
  
  // Set preference cookies
  if (analytics) {
    res.cookie('analytics_consent', 'granted', {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  } else {
    res.clearCookie('analytics_consent');
  }
  
  if (marketing) {
    res.cookie('marketing_consent', 'granted', {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  } else {
    res.clearCookie('marketing_consent');
  }
  
  if (preferences) {
    res.cookie('preferences_consent', 'granted', {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  } else {
    res.clearCookie('preferences_consent');
  }
  
  // Mark that preferences have been set
  res.cookie('cookie_preferences_set', 'true', {
    maxAge: 365 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  
  res.json({
    success: true,
    message: 'Cookie preferences saved',
    preferences: userPreferences
  });
};

const getStatus = (req, res) => {
  res.json({
    success: true,
    preferencesSet: req.cookies.cookie_preferences_set === 'true',
    consents: {
      analytics: req.cookies.analytics_consent === 'granted',
      marketing: req.cookies.marketing_consent === 'granted',
      preferences: req.cookies.preferences_consent === 'granted'
    }
  });
};

module.exports = {
  getCookiePolicy,
  getPreferences,
  savePreferences,
  getStatus
};