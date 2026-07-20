import nodemailer from 'nodemailer';

export interface RealEmailData {
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

export async function sendRealEmail(data: RealEmailData) {
  try {
    console.log('Attempting to send real email...');
    
    // Create transporter using your existing SMTP configuration with multiple fallbacks
    const smtpConfigs = [
      // Try SSL on port 465 first (most reliable for Hostinger)
      {
        host: process.env.SMTP_HOST || 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        },
        connectionTimeout: 30000,
        greetingTimeout: 15000,
        socketTimeout: 30000,
        tls: {
          rejectUnauthorized: false
        }
      },
      // Try TLS on port 587
      {
        host: process.env.SMTP_HOST || 'smtp.hostinger.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        },
        connectionTimeout: 30000,
        greetingTimeout: 15000,
        socketTimeout: 30000,
        tls: {
          rejectUnauthorized: false
        }
      },
      // Try port 25 as last resort
      {
        host: process.env.SMTP_HOST || 'smtp.hostinger.com',
        port: 25,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        },
        connectionTimeout: 30000,
        greetingTimeout: 15000,
        socketTimeout: 30000,
        tls: {
          rejectUnauthorized: false
        }
      }
    ];

    let transporter = null;
    let lastError = null;

    // Try each configuration
    for (let i = 0; i < smtpConfigs.length; i++) {
      const config = smtpConfigs[i];
      try {
        console.log(`Trying SMTP configuration ${i + 1}/${smtpConfigs.length} (port ${config.port}, secure: ${config.secure})...`);
        transporter = nodemailer.createTransport(config);
        
        console.log('Verifying SMTP connection...');
        await transporter.verify();
        console.log(`✅ SMTP connection verified successfully on port ${config.port}!`);
        break; // If successful, break out of loop
      } catch (error: any) {
        console.warn(`❌ SMTP configuration ${i + 1} failed:`, error.message);
        lastError = error;
        continue; // Try next configuration
      }
    }

    if (!transporter) {
      throw new Error(`All SMTP configurations failed. Last error: ${lastError?.message || 'Unknown error'}`);
    }

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL || 'rebeccakeen19@gmail.com',
      subject: `New Inquiry from ${data.customerName} - PetCat Website`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h1 style="margin: 0; font-size: 24px;">🐱 New PetCat Inquiry</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Customer inquiry received from your website</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
            <h2 style="margin-top: 0; color: #333; font-size: 18px;">👤 Customer Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Name:</td><td style="padding: 8px 0;">${data.customerName}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #667eea;">${data.email}</a></td></tr>
              ${data.phone ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td><td style="padding: 8px 0;"><a href="tel:${data.phone}" style="color: #667eea;">${data.phone}</a></td></tr>` : ''}
              ${data.state ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">State:</td><td style="padding: 8px 0;">${data.state}</td></tr>` : ''}
              ${data.city ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">City:</td><td style="padding: 8px 0;">${data.city}</td></tr>` : ''}
              ${data.breedingIntentions ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Breeding Intentions:</td><td style="padding: 8px 0;">${data.breedingIntentions}</td></tr>` : ''}
              ${data.hasPets ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Has Pets:</td><td style="padding: 8px 0;">${data.hasPets}</td></tr>` : ''}
              ${data.purchaseTimeline ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Purchase Timeline:</td><td style="padding: 8px 0;">${data.purchaseTimeline}</td></tr>` : ''}
              ${data.kittenName ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Interested in:</td><td style="padding: 8px 0;">${data.kittenName}</td></tr>` : ''}
            </table>
          </div>
          
          <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2196f3;">
            <h2 style="margin-top: 0; color: #333; font-size: 18px;">💬 Customer Message</h2>
            <div style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">
              <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${data.message}</p>
            </div>
          </div>
          
          <div style="background-color: #f1f8e9; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4caf50;">
            <h3 style="margin-top: 0; color: #2e7d32; font-size: 16px;">📧 Quick Actions</h3>
            <p style="margin: 5px 0; color: #555;">
              <a href="mailto:${data.email}?subject=Re: Your PetCat Inquiry&body=Hi ${data.customerName},%0D%0A%0D%0AThank you for your inquiry about our kittens..." 
                 style="color: #4caf50; text-decoration: none; font-weight: bold;">📧 Reply to Customer</a>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              This inquiry was submitted through your PetCat website at ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
      text: `
New PetCat Inquiry

Customer Information:
Name: ${data.customerName}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}
${data.state ? `State: ${data.state}` : ''}
${data.city ? `City: ${data.city}` : ''}
${data.breedingIntentions ? `Breeding Intentions: ${data.breedingIntentions}` : ''}
${data.hasPets ? `Has Pets: ${data.hasPets}` : ''}
${data.purchaseTimeline ? `Purchase Timeline: ${data.purchaseTimeline}` : ''}
${data.kittenName ? `Interested in: ${data.kittenName}` : ''}

Customer Message:
${data.message}

This inquiry was submitted through your PetCat website at ${new Date().toLocaleString()}
      `
    };

    console.log('Sending email to:', mailOptions.to);
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
    
    return { success: true, data: info };
  } catch (error: any) {
    console.error('❌ Error sending real email:', error);
    
    // Fallback: Log to console with detailed information
    console.log('📧 EMAIL FALLBACK - Inquiry Details:');
    console.log('=====================================');
    console.log('To:', process.env.ADMIN_EMAIL || 'rebeccakeen19@gmail.com');
    console.log('Subject: New Inquiry from', data.customerName);
    console.log('Customer Name:', data.customerName);
    console.log('Customer Email:', data.email);
    console.log('Phone:', data.phone || 'Not provided');
    console.log('Location:', `${data.city || 'Not provided'}, ${data.state || 'Not provided'}`);
    console.log('Breeding Intentions:', data.breedingIntentions || 'Not specified');
    console.log('Has Pets:', data.hasPets || 'Not specified');
    console.log('Purchase Timeline:', data.purchaseTimeline || 'Not specified');
    console.log('Interested Kitten:', data.kittenName || 'Not specified');
    console.log('Message:', data.message);
    console.log('Timestamp:', new Date().toLocaleString());
    console.log('=====================================');
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      fallback: true
    };
  }
}
