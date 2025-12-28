const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

interface InquiryFormData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  productName: string;
  hsCode?: string;
  quantity: string;
  unit: string;
  targetPrice?: string;
  incoterms: string;
  paymentTerms?: string;
  destinationPort: string;
  requiredCertificates?: string;
  additionalRequirements?: string;
}

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

class ApiService {
  private static getHeaders() {
    return {
      'Content-Type': 'application/json',
    };
  }

  // Contact Form
  static async submitContact(formData: ContactFormData) {
    const response = await fetch(`${API_BASE_URL}/api/contact/submit`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(formData),
    });
    return response.json();
  }

  // Inquiry/Quotation Form
  static async submitInquiry(formData: InquiryFormData) {
    const response = await fetch(`${API_BASE_URL}/api/inquiry/submit`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(formData),
    });
    return response.json();
  }

  // Cookie Management
  static async getCookiePolicy() {
    const response = await fetch(`${API_BASE_URL}/api/cookie/policy`);
    return response.json();
  }

  static async getCookiePreferences() {
    const response = await fetch(`${API_BASE_URL}/api/cookie/preferences`, {
      credentials: 'include',
    });
    return response.json();
  }

  static async saveCookiePreferences(preferences: CookiePreferences) {
    const response = await fetch(`${API_BASE_URL}/api/cookie/preferences`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(preferences),
      credentials: 'include',
    });
    return response.json();
  }

  static async checkCookieStatus() {
    const response = await fetch(`${API_BASE_URL}/api/cookie/status`, {
      credentials: 'include',
    });
    return response.json();
  }

  // Health Check
  static async checkHealth() {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    return response.json();
  }
}

export { ApiService, type ContactFormData, type InquiryFormData, type CookiePreferences };