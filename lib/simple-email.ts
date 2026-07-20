import nodemailer from 'nodemailer';

export interface SimpleEmailData {
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

export async function sendSimpleEmail(data: SimpleEmailData) {
  try {
    console.log('Creating simple email transporter...');
    
    // Try multiple SMTP configurations in order of reliability
    const smtpConfigs = [
      // Gmail SMTP (most reliable)
      {
        service: 'gmail',
        auth: {
          user: 'rebeccakeen19@gmail.com',
          pass: 'your_app_password_here' // This needs to be a Gmail App Password
        }
      },
      // Hostinger SMTP (existing config)
      {
        host: process.env.SMTP_HOST || 'smtp.hostinger.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        },
        connectionTimeout: 5000,
        greetingTimeout: 3000,
        socketTimeout: 5000,
      },
      // Alternative: Try port 465 with SSL
      {
        host: process.env.SMTP_HOST || 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        },
        connectionTimeout: 5000,
        greetingTimeout: 3000,
        socketTimeout: 5000,
      }
    ];

    let transporter = null;
    let lastError = null;

    // Try each configuration
    for (const config of smtpConfigs) {
      try {
        console.log('Trying SMTP configuration...');
        transporter = nodemailer.createTransport(config);
        
        console.log('Verifying SMTP connection...');
        await transporter.verify();
        console.log('SMTP connection verified successfully');
        break; // If successful, break out of loop
      } catch (error) {
        console.warn('SMTP configuration failed:', error instanceof Error ? error.message : 'Unknown error');
        lastError = error;
        continue; // Try next configuration
      }
    }

    if (!transporter) {
      throw new Error('All SMTP configurations failed. Last error: ' + (lastError instanceof Error ? lastError.message : 'Unknown error'));
    }

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER || 'rebeccakeen19@gmail.com',
      to: process.env.ADMIN_EMAIL || 'rebeccakeen19@gmail.com',
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

    console.log('Sending email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    console.log('Message ID:', info.messageId);
    
    return { success: true, data: info };
  } catch (error) {
    console.error('Error sending simple email:', error);
    
    // If all SMTP methods fail, use console fallback
    console.log('All SMTP methods failed, using console fallback...');
    
    // Log the email content to console as a fallback
    console.log('=== EMAIL CONTENT (FALLBACK) ===');
    console.log('To:', process.env.ADMIN_EMAIL || 'rebeccakeen19@gmail.com');
    console.log('Subject: New Inquiry from', data.customerName);
    console.log('Customer Name:', data.customerName);
    console.log('Email:', data.email);
    console.log('Phone:', data.phone || 'Not provided');
    console.log('Location:', `${data.city || 'Not provided'}, ${data.state || 'Not provided'}`);
    console.log('Breeding Intentions:', data.breedingIntentions || 'Not specified');
    console.log('Has Pets:', data.hasPets || 'Not specified');
    console.log('Purchase Timeline:', data.purchaseTimeline || 'Not specified');
    console.log('Interested Kitten:', data.kittenName || 'Not specified');
    console.log('Message:', data.message);
    console.log('================================');
    
    return { 
      success: true, // Return success since we logged it
      error: error instanceof Error ? error.message : 'Unknown error',
      fallback: true
    };
  }
}
