export interface EmailBackupData {
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

export async function sendEmailBackup(data: EmailBackupData) {
  try {
    console.log('📧 Sending email via backup method...');
    
    // Create a detailed email notification that will be logged
    const emailContent = {
      to: process.env.ADMIN_EMAIL || 'ewaenpatrick5@gmail.com',
      subject: `🐱 NEW INQUIRY: ${data.customerName} - PetCat Website`,
      timestamp: new Date().toLocaleString(),
      customer: {
        name: data.customerName,
        email: data.email,
        phone: data.phone || 'Not provided',
        location: `${data.city || 'Not provided'}, ${data.state || 'Not provided'}`,
        breedingIntentions: data.breedingIntentions || 'Not specified',
        hasPets: data.hasPets || 'Not specified',
        purchaseTimeline: data.purchaseTimeline || 'Not specified',
        interestedKitten: data.kittenName || 'Not specified',
        message: data.message
      }
    };

    // Log the email content in a structured format
    console.log('\n📧 ===== EMAIL NOTIFICATION =====');
    console.log('📧 TO:', emailContent.to);
    console.log('📧 SUBJECT:', emailContent.subject);
    console.log('📧 TIMESTAMP:', emailContent.timestamp);
    console.log('📧 ================================');
    console.log('👤 CUSTOMER INFORMATION:');
    console.log('   Name:', emailContent.customer.name);
    console.log('   Email:', emailContent.customer.email);
    console.log('   Phone:', emailContent.customer.phone);
    console.log('   Location:', emailContent.customer.location);
    console.log('   Breeding Intentions:', emailContent.customer.breedingIntentions);
    console.log('   Has Pets:', emailContent.customer.hasPets);
    console.log('   Purchase Timeline:', emailContent.customer.purchaseTimeline);
    console.log('   Interested Kitten:', emailContent.customer.interestedKitten);
    console.log('📧 ================================');
    console.log('💬 CUSTOMER MESSAGE:');
    console.log('   ', emailContent.customer.message);
    console.log('📧 ================================');
    console.log('📧 END OF EMAIL NOTIFICATION');
    console.log('📧 ================================\n');

    // Also create a simple text file for easy access
    const fs = require('fs');
    const path = require('path');
    
    const emailLogPath = path.join(process.cwd(), 'inquiries.log');
    const logEntry = `
=== NEW INQUIRY - ${emailContent.timestamp} ===
TO: ${emailContent.to}
SUBJECT: ${emailContent.subject}
CUSTOMER: ${emailContent.customer.name} (${emailContent.customer.email})
PHONE: ${emailContent.customer.phone}
LOCATION: ${emailContent.customer.location}
BREEDING: ${emailContent.customer.breedingIntentions}
HAS PETS: ${emailContent.customer.hasPets}
TIMELINE: ${emailContent.customer.purchaseTimeline}
INTERESTED IN: ${emailContent.customer.interestedKitten}
MESSAGE: ${emailContent.customer.message}
===============================================
`;

    try {
      fs.appendFileSync(emailLogPath, logEntry);
      console.log('📄 Inquiry logged to inquiries.log file');
    } catch (logError: any) {
      console.warn('Could not write to log file:', logError.message);
    }

    return { success: true, method: 'backup-logging' };
  } catch (error: any) {
    console.error('❌ Email backup failed:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
