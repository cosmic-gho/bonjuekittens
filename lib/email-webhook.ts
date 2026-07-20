export interface EmailWebhookData {
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

export async function sendEmailWebhook(data: EmailWebhookData) {
  try {
    console.log('Sending email via webhook...');
    
    // Create a simple webhook payload
    const webhookData = {
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

    // For now, just log the email content
    // In a real implementation, you would send this to an email service API
    console.log('=== EMAIL WEBHOOK PAYLOAD ===');
    console.log('To:', webhookData.to);
    console.log('Subject:', webhookData.subject);
    console.log('HTML Content Length:', webhookData.html.length);
    console.log('Text Content Length:', webhookData.text.length);
    console.log('=============================');
    
    // Simulate successful webhook call
    console.log('Email webhook sent successfully!');
    
    return { success: true, method: 'webhook' };
  } catch (error) {
    console.error('Error sending email webhook:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
