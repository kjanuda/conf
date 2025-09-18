const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER, // your Gmail
    pass: process.env.SMTP_PASS, // your App Password
  },
});

async function sendConfirmationEmail(to, name, formData = {}) {
  const currentYear = new Date().getFullYear();
  
  // Enhanced HTML email template with modern design
  const htmlTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Contacting Januda</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f5f7fa;
        color: #333333;
        line-height: 1.6;
      }
      
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      }
      
      .header {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        padding: 40px 30px;
        text-align: center;
        color: white;
        position: relative;
      }
      
      .header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.1)"/><circle cx="10" cy="60" r="0.5" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
        opacity: 0.3;
      }
      
      .logo-section {
        position: relative;
        z-index: 1;
      }
      
      .logo {
        font-size: 36px;
        font-weight: bold;
        letter-spacing: -1px;
        margin-bottom: 8px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      
      .tagline {
        font-size: 16px;
        opacity: 0.9;
        font-weight: 300;
      }
      
      .success-icon {
        width: 60px;
        height: 60px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px auto 0;
        backdrop-filter: blur(10px);
      }
      
      .checkmark {
        width: 30px;
        height: 30px;
        stroke: white;
        stroke-width: 3;
        fill: none;
        animation: checkmark 0.8s ease-in-out;
      }
      
      @keyframes checkmark {
        0% { stroke-dasharray: 0 50; }
        100% { stroke-dasharray: 50 0; }
      }
      
      .content {
        padding: 40px 30px;
      }
      
      .greeting {
        font-size: 24px;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 20px;
      }
      
      .message {
        font-size: 16px;
        color: #6b7280;
        margin-bottom: 30px;
        line-height: 1.7;
      }
      
      .info-card {
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        border-left: 4px solid #10b981;
        border-radius: 8px;
        padding: 20px;
        margin: 25px 0;
      }
      
      .info-title {
        font-size: 18px;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
      }
      
      .info-icon {
        width: 20px;
        height: 20px;
        margin-right: 8px;
        stroke: #10b981;
        stroke-width: 2;
        fill: none;
      }
      
      .info-details {
        font-size: 14px;
        color: #4b5563;
        line-height: 1.6;
      }
      
      .contact-info {
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 20px;
        margin: 25px 0;
      }
      
      .contact-item {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        font-size: 14px;
        color: #4b5563;
      }
      
      .contact-item:last-child {
        margin-bottom: 0;
      }
      
      .contact-icon {
        width: 16px;
        height: 16px;
        margin-right: 10px;
        stroke: #10b981;
        stroke-width: 2;
        fill: none;
        flex-shrink: 0;
      }
      
      .cta-section {
        text-align: center;
        margin: 35px 0;
        padding: 25px;
        background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%);
        border-radius: 8px;
        border: 1px solid #d1fae5;
      }
      
      .cta-text {
        font-size: 16px;
        color: #065f46;
        margin-bottom: 15px;
        font-weight: 500;
      }
      
      .footer {
        background: #f9fafb;
        padding: 30px;
        text-align: center;
        border-top: 1px solid #e5e7eb;
      }
      
      .footer-text {
        font-size: 12px;
        color: #9ca3af;
        margin-bottom: 15px;
      }
      
      .social-links {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin-bottom: 20px;
      }
      
      .social-link {
        width: 36px;
        height: 36px;
        background: #10b981;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        text-decoration: none;
        font-weight: bold;
        font-size: 14px;
        transition: transform 0.2s ease, background 0.2s ease;
      }
      
      .social-link:hover {
        transform: translateY(-2px);
        background: #059669;
      }
      
      .divider {
        height: 1px;
        background: linear-gradient(to right, transparent, #d1d5db, transparent);
        margin: 25px 0;
      }
      
      .highlight {
        color: #10b981;
        font-weight: 600;
      }
      
      @media (max-width: 600px) {
        .email-container {
          margin: 0;
          border-radius: 0;
        }
        
        .header, .content, .footer {
          padding: 25px 20px;
        }
        
        .logo {
          font-size: 28px;
        }
        
        .greeting {
          font-size: 20px;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <!-- Header -->
      <div class="header">
        <div class="logo-section">
          <div class="logo">Januda</div>
          <div class="tagline">Software Design & System Integration</div>
          <div class="success-icon">
            <svg class="checkmark" viewBox="0 0 50 50">
              <path d="M10 25l8 8 22-22" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      
      <!-- Main Content -->
      <div class="content">
        <div class="greeting">Hello ${name}! 👋</div>
        
        <div class="message">
          Thank you for reaching out to <strong class="highlight">Januda</strong>! We've successfully received your message and truly appreciate your interest in our software design and system integration solutions.
        </div>
        
        <!-- Information Card -->
        <div class="info-card">
          <div class="info-title">
            <svg class="info-icon" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            What Happens Next?
          </div>
          <div class="info-details">
            Our expert team will review your inquiry carefully and get back to you within <strong>24 hours</strong>. We're committed to providing you with personalized solutions that meet your specific needs.
          </div>
        </div>
        
        <!-- Contact Information -->
        <div class="contact-info">
          <div class="info-title" style="margin-bottom: 15px;">
            <svg class="info-icon" viewBox="0 0 24 24">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Need Immediate Assistance?
          </div>
          
          <div class="contact-item">
            <svg class="contact-icon" viewBox="0 0 24 24">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span><strong>Phone:</strong> +94773-007-426</span>
          </div>
          
          <div class="contact-item">
            <svg class="contact-icon" viewBox="0 0 24 24">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span><strong>Email:</strong> Janudakodi@gmail.com</span>
          </div>
          
          <div class="contact-item">
            <svg class="contact-icon" viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span><strong>Location:</strong> Hambantota, Sri Lanka</span>
          </div>
        </div>
        
        <!-- CTA Section -->
        <div class="cta-section">
          <div class="cta-text">
            Follow our journey and stay updated with the latest in software architecture! 💻
          </div>
        </div>
        
        <div class="divider"></div>
        
        <div class="message">
          We're excited about the opportunity to work with you and help transform your business operations with robust software architecture and seamless system integration solutions.
        </div>
      </div>
      
      <!-- Footer -->
      <div class="footer">
        <div class="social-links">
          <a href="#" class="social-link" title="Facebook">f</a>
          <a href="#" class="social-link" title="Twitter">@</a>
          <a href="#" class="social-link" title="WhatsApp">W</a>
        </div>
        
        <div class="footer-text">
          © ${currentYear} Januda. All rights reserved.<br>
          Software Design & System Integration | Designed by Januda
        </div>
        
        <div class="footer-text" style="margin-top: 10px; font-size: 11px;">
          This email was sent because you contacted us through our website.<br>
          If you have any questions, please don't hesitate to reach out.
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  const mailOptions = {
    from: `"Januda - Software Design & System Integration" <${process.env.SMTP_USER}>`,
    to,
    subject: "✅ Thank you for contacting Januda - We'll be in touch soon!",
    text: `Hello ${name},

Thank you for reaching out to Januda! 

We've successfully received your message and truly appreciate your interest in our software design and system integration solutions.

What happens next?
Our expert team will review your inquiry carefully and get back to you within 24 hours. We're committed to providing you with personalized solutions that meet your specific needs.

Need immediate assistance?
📞 Phone: +94773-007-426
📧 Email: Janudakodi@gmail.com
📍 Location: Hambantota, Sri Lanka

We're excited about the opportunity to work with you and help transform your business operations with robust software architecture and seamless system integration solutions.

Best regards,
The Januda Team

---
© ${currentYear} Januda. All rights reserved.
Software Design & System Integration | Designed by Januda`,
    html: htmlTemplate,
    priority: 'high',
    headers: {
      'X-Priority': '1',
      'X-MSMail-Priority': 'High',
      'Importance': 'high'
    }
  };

  return transporter.sendMail(mailOptions);
}

// Optional: Function to send internal notification to admin
async function sendAdminNotification(formData) {
  const currentYear = new Date().getFullYear();
  
  const adminHtml = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: #10b981; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
      .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
      .field { margin-bottom: 15px; }
      .label { font-weight: bold; color: #555; }
      .value { margin-top: 5px; padding: 8px; background: white; border-radius: 4px; border-left: 3px solid #10b981; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>🚨 New Contact Form Submission</h2>
        <p>You have received a new inquiry through the Januda website.</p>
      </div>
      <div class="content">
        <div class="field">
          <div class="label">👤 Full Name:</div>
          <div class="value">${formData.fullName || 'N/A'}</div>
        </div>
        <div class="field">
          <div class="label">📧 Email:</div>
          <div class="value">${formData.email || 'N/A'}</div>
        </div>
        <div class="field">
          <div class="label">📞 Phone:</div>
          <div class="value">${formData.phone || 'N/A'}</div>
        </div>
        <div class="field">
          <div class="label">🌍 Country:</div>
          <div class="value">${formData.country || 'N/A'}</div>
        </div>
        <div class="field">
          <div class="label">🎯 Interested In:</div>
          <div class="value">${formData.interested || 'N/A'}</div>
        </div>
        <div class="field">
          <div class="label">💬 Message:</div>
          <div class="value">${formData.message || 'N/A'}</div>
        </div>
        <div class="field">
          <div class="label">⏰ Submitted At:</div>
          <div class="value">${formData.submittedAt || new Date().toLocaleString()}</div>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  const adminMailOptions = {
    from: `"Januda Website" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL || process.env.SMTP_USER, // Admin email
    subject: `🚨 New Contact: ${formData.fullName} - ${formData.interested}`,
    html: adminHtml,
    priority: 'high'
  };

  return transporter.sendMail(adminMailOptions);
}

module.exports = { 
  sendConfirmationEmail,
  sendAdminNotification 
};