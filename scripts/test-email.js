// Test script to verify email configuration
require('dotenv').config({ path: '.env.local' });

const nodemailer = require('nodemailer');

async function testEmailConfig() {
  console.log('=== Email Configuration Test ===\n');
  
  // Check environment variables
  const requiredVars = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'ADMIN_EMAIL'];
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:', missing);
    console.log('\nPlease create a .env.local file with the following variables:');
    console.log('SMTP_HOST=smtp.gmail.com');
    console.log('SMTP_PORT=587');
    console.log('SMTP_SECURE=false');
    console.log('SMTP_USER=your_email@gmail.com');
    console.log('SMTP_PASS=your_app_password');
    console.log('SMTP_FROM=your_email@gmail.com');
    console.log('ADMIN_EMAIL=your_email@gmail.com');
    return;
  }
  
  console.log('✅ All required environment variables are set');
  console.log('SMTP_HOST:', process.env.SMTP_HOST);
  console.log('SMTP_PORT:', process.env.SMTP_PORT || '587');
  console.log('SMTP_USER:', process.env.SMTP_USER);
  console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL);
  console.log('');
  
  // Test SMTP connection
  try {
    console.log('Testing SMTP connection...');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    
    await transporter.verify();
    console.log('✅ SMTP connection successful!');
    
    // Test sending a simple email
    console.log('\nTesting email sending...');
    const testEmail = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'Test Email from PetCat Website',
      text: 'This is a test email to verify your email configuration is working correctly.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Test Email</h2>
          <p>This is a test email to verify your email configuration is working correctly.</p>
          <p>If you receive this email, your SMTP settings are properly configured!</p>
          <p style="color: #666; font-size: 14px;">Sent at: ${new Date().toLocaleString()}</p>
        </div>
      `,
    };
    
    const info = await transporter.sendMail(testEmail);
    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
    
  } catch (error) {
    console.error('❌ SMTP connection failed:', error.message);
    
    if (error.message.includes('Invalid login')) {
      console.log('\n💡 For Gmail users:');
      console.log('1. Enable 2-factor authentication on your Google account');
      console.log('2. Generate an App Password:');
      console.log('   - Go to Google Account settings');
      console.log('   - Security → 2-Step Verification → App passwords');
      console.log('   - Generate a password for "Mail"');
      console.log('3. Use this app password instead of your regular password');
    }
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Connection refused. Check your SMTP settings:');
      console.log('- Verify SMTP_HOST is correct');
      console.log('- Verify SMTP_PORT is correct');
      console.log('- Check if your email provider requires SSL/TLS');
    }
  }
}

testEmailConfig().catch(console.error); 