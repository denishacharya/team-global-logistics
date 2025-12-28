const nodemailer = require('nodemailer');
require('dotenv').config();

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT == 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

const getAdminEmails = () => {
  return process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',') : [];
};

module.exports = { createTransporter, getAdminEmails };