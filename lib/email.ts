import nodemailer from 'nodemailer';

export interface InquiryEmailData {
  customerName: string;
  email: string;
  phone?: string;
  state?: string;
  city?: string;
  breedingIntentions?: string;
  hasPets?: string;
  purchaseTimeline?: string;
  message: string;
  kittenName?: string;
}

// Validate environment variables
const validateEmailConfig = () => {
  const requiredVars = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'ADMIN_EMAIL'];
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.error('Missing required environment variables:', missing);
    return false;
  }
  
  console.log('Email configuration validation passed');
  console.log('SMTP_HOST:', process.env.SMTP_HOST);
  console.log('SMTP_PORT:', process.env.SMTP_PORT || '587');
  console.log('SMTP_USER:', process.env.SMTP_USER);
  console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL);
  
  return true;
};

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  if (!validateEmailConfig()) {
    throw new Error('Email configuration is invalid');
  }

  const config = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // Add timeout and debug options
    connectionTimeout: 60000, // 60 seconds
    greetingTimeout: 30000, // 30 seconds
    socketTimeout: 60000, // 60 seconds
  };

  console.log('Creating SMTP transporter with config:', {
    host: config.host,
    port: config.port,
    secure: config.secure,
    user: config.auth.user,
  });

  return nodemailer.createTransport(config);
};

export async function sendInquiryNotification(data: InquiryEmailData) {
  try {
    console.log('Starting email send process...');
    console.log('Email data:', {
      customerName: data.customerName,
      email: data.email,
      phone: data.phone,
      state: data.state,
      city: data.city,
      breedingIntentions: data.breedingIntentions,
      hasPets: data.hasPets,
      purchaseTimeline: data.purchaseTimeline,
      kittenName: data.kittenName,
      messageLength: data.message.length,
    });

    const transporter = createTransporter();
    
    // Verify SMTP connection
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('SMTP connection verified successfully');

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Inquiry from ${data.customerName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Customer Inquiry</h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #555;">Customer Information</h3>
            <p><strong>Name:</strong> ${data.customerName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
            ${data.state ? `<p><strong>State:</strong> ${data.state}</p>` : ''}
            ${data.city ? `<p><strong>City:</strong> ${data.city}</p>` : ''}
            ${data.breedingIntentions ? `<p><strong>Breeding Intentions:</strong> ${data.breedingIntentions}</p>` : ''}
            ${data.hasPets ? `<p><strong>Has Pets:</strong> ${data.hasPets}</p>` : ''}
            ${data.purchaseTimeline ? `<p><strong>Purchase Timeline:</strong> ${data.purchaseTimeline}</p>` : ''}
            ${data.kittenName ? `<p><strong>Interested in:</strong> ${data.kittenName}</p>` : ''}
          </div>
          
          <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #555;">Message</h3>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px;">
              This inquiry was submitted through your PetCat website.
            </p>
          </div>
        </div>
      `,
    };

    console.log('Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
    });

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
    
    return { success: true, data: info };
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Provide more specific error information
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error 
    };
  }
} 