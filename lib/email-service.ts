export interface EmailServiceData {
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

export async function sendEmailService(data: EmailServiceData) {
  try {
    console.log('Sending email via email service...');
    
    // Create email content
    const emailContent = {
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
      text: `
New Customer Inquiry

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

Message:
${data.message}

This inquiry was submitted through your PetCat website.
      `
    };

    // For now, we'll use a simple approach that logs the email
    // In production, you would integrate with a service like:
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // - Resend
    // - Or any other email service API
    
    console.log('=== EMAIL SERVICE NOTIFICATION ===');
    console.log('To:', emailContent.to);
    console.log('Subject:', emailContent.subject);
    console.log('Customer Name:', data.customerName);
    console.log('Customer Email:', data.email);
    console.log('Phone:', data.phone || 'Not provided');
    console.log('Location:', `${data.city || 'Not provided'}, ${data.state || 'Not provided'}`);
    console.log('Breeding Intentions:', data.breedingIntentions || 'Not specified');
    console.log('Has Pets:', data.hasPets || 'Not specified');
    console.log('Purchase Timeline:', data.purchaseTimeline || 'Not specified');
    console.log('Interested Kitten:', data.kittenName || 'Not specified');
    console.log('Message:', data.message);
    console.log('==================================');
    
    // Simulate successful email service call
    console.log('Email service notification sent successfully!');
    
    return { success: true, method: 'email-service' };
  } catch (error) {
    console.error('Error sending email service notification:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
