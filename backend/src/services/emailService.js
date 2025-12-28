const { createTransporter, getAdminEmails } = require('../config/email');

class EmailService {
  constructor() {
    this.transporter = createTransporter();
    this.adminEmails = getAdminEmails();
  }

  async sendContactEmail(formData) {
    const { name, email, phone, subject, message } = formData;
    
    const adminMailOptions = {
      from: process.env.EMAIL_FROM,
      to: this.adminEmails,
      replyTo: email,
      subject: subject || `New Contact Form Submission from ${name}`,
      html: this.getContactAdminTemplate(formData),
      text: this.getContactAdminText(formData)
    };

    const userMailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Thank you for contacting Team Global Logistics',
      html: this.getContactUserTemplate(formData),
      text: this.getContactUserText(formData)
    };

    try {
      await this.transporter.sendMail(adminMailOptions);
      await this.transporter.sendMail(userMailOptions);
      return { success: true };
    } catch (error) {
      console.error('Email sending error:', error);
      return { success: false, error: error.message };
    }
  }

  async sendInquiryEmail(formData) {
    const adminMailOptions = {
      from: process.env.EMAIL_FROM,
      to: this.adminEmails,
      replyTo: formData.email,
      subject: `New Quotation Request: ${formData.productName || 'Product Inquiry'}`,
      html: this.getInquiryAdminTemplate(formData),
      text: this.getInquiryAdminText(formData)
    };

    const userMailOptions = {
      from: process.env.EMAIL_FROM,
      to: formData.email,
      subject: 'Team Global Logistics - Quotation Request Received',
      html: this.getInquiryUserTemplate(formData),
      text: this.getInquiryUserText(formData)
    };

    try {
      await this.transporter.sendMail(adminMailOptions);
      await this.transporter.sendMail(userMailOptions);
      return { success: true };
    } catch (error) {
      console.error('Email sending error:', error);
      return { success: false, error: error.message };
    }
  }

  // Templates (simplified versions)
  getContactAdminTemplate(data) {
    return `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        ${data.subject ? `<p><strong>Subject:</strong> ${data.subject}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      </div>
    `;
  }

  getContactUserTemplate(data) {
    return `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Thank You for Contacting Team Global Logistics!</h2>
        <p>Dear ${data.name},</p>
        <p>We have received your message and will respond within 24 hours.</p>
      </div>
    `;
  }

  getInquiryAdminTemplate(data) {
    return `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>NEW QUOTATION REQUEST</h2>
        <h3>Company Information</h3>
        <p><strong>Company:</strong> ${data.companyName}</p>
        <p><strong>Contact:</strong> ${data.contactPerson}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        
        <h3>Product Details</h3>
        <p><strong>Product:</strong> ${data.productName}</p>
        <p><strong>Quantity:</strong> ${data.quantity} ${data.unit}</p>
        <p><strong>Destination:</strong> ${data.destinationPort}</p>
      </div>
    `;
  }

  getInquiryUserTemplate(data) {
    return `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Quotation Request Received</h2>
        <p>Dear ${data.contactPerson},</p>
        <p>We have received your quotation request for <strong>${data.productName}</strong>.</p>
        <p>We will send you the quotation within 24 hours.</p>
      </div>
    `;
  }

  getContactAdminText(data) { return 'Contact form text'; }
  getContactUserText(data) { return 'Contact user text'; }
  getInquiryAdminText(data) { return 'Inquiry admin text'; }
  getInquiryUserText(data) { return 'Inquiry user text'; }
}

module.exports = new EmailService();