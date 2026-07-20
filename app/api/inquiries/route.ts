import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { sendInquiryNotification } from '@/lib/email';
import { sendSimpleEmail } from '@/lib/simple-email';
import { sendEmailWebhook } from '@/lib/email-webhook';
import { sendEmailService } from '@/lib/email-service';
import { sendRealEmail } from '@/lib/real-email';
import { sendEmailBackup } from '@/lib/email-backup';

export async function GET(req: NextRequest) {
  try {
    const inquiries = await prisma.inquiry.findMany({
      include: { kitten: true },
      orderBy: { createdAt: 'desc' },
    });
    return Response.json(inquiries);
  } catch (error: any) {
    return new Response('Error fetching inquiries', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log('Received inquiry data:', data);
    
    // Log inquiry details to console for admin review
    console.log('=== NEW INQUIRY RECEIVED ===');
    console.log('Customer Name:', data.customerName);
    console.log('Email:', data.email);
    console.log('Phone:', data.phone || 'Not provided');
    console.log('Location:', `${data.city || 'Not provided'}, ${data.state || 'Not provided'}`);
    console.log('Breeding Intentions:', data.breedingIntentions || 'Not specified');
    console.log('Has Pets:', data.hasPets || 'Not specified');
    console.log('Purchase Timeline:', data.purchaseTimeline || 'Not specified');
    console.log('Interested Kitten:', data.kittenName || 'Not specified');
    console.log('Message:', data.message);
    console.log('===========================');
    
    let savedInquiry = null;
    
    // Try to save to database first
    try {
      console.log('Attempting to save inquiry to database...');
      
      // Remove kittenName from data as it's not a database field
      const { kittenName, ...dbData } = data;
      console.log('Data being saved:', JSON.stringify(dbData, null, 2));
      
      savedInquiry = await prisma.inquiry.create({ 
        data: dbData,
        include: { kitten: true }
      });
      console.log('Inquiry saved to database with ID:', savedInquiry.id);
    } catch (dbError) {
      console.error('Failed to save inquiry to database:');
      console.error('Error type:', typeof dbError);
      console.error('Error message:', dbError instanceof Error ? dbError.message : 'Unknown error');
      console.error('Error details:', dbError);
      console.warn('Continuing with email notification despite database error...');
    }
    
    // Try to send real email notification with backup
    let emailSent = false;
    
    try {
      console.log('Attempting to send real email notification...');
      const emailResult = await sendRealEmail({
        customerName: data.customerName,
        email: data.email,
        phone: data.phone || undefined,
        state: data.state || undefined,
        city: data.city || undefined,
        breedingIntentions: data.breedingIntentions || undefined,
        hasPets: data.hasPets || undefined,
        purchaseTimeline: data.purchaseTimeline || undefined,
        message: data.message,
        kittenName: data.kittenName || undefined,
      });
      
      if (emailResult.success) {
        console.log('✅ Real email notification sent successfully!');
        emailSent = true;
      } else {
        console.warn('❌ Real email failed:', emailResult.error);
      }
    } catch (emailError) {
      console.warn('❌ Real email failed:', emailError);
    }
    
    // Use backup method if SMTP failed
    if (!emailSent) {
      try {
        console.log('📧 Using backup email method...');
        const backupResult = await sendEmailBackup({
          customerName: data.customerName,
          email: data.email,
          phone: data.phone || undefined,
          state: data.state || undefined,
          city: data.city || undefined,
          breedingIntentions: data.breedingIntentions || undefined,
          hasPets: data.hasPets || undefined,
          purchaseTimeline: data.purchaseTimeline || undefined,
          message: data.message,
          kittenName: data.kittenName || undefined,
        });
        
        if (backupResult.success) {
          console.log('✅ Backup email notification sent successfully!');
        } else {
          console.warn('❌ Backup email failed:', backupResult.error);
        }
      } catch (backupError) {
        console.warn('❌ Backup email failed:', backupError);
      }
    }

    // Return success response
    return Response.json({ 
      success: true, 
      message: 'Inquiry received successfully. We will contact you soon!',
      saved: !!savedInquiry,
      inquiryId: savedInquiry?.id || null
    });
    
  } catch (error: any) {
    console.error('Error processing inquiry:', error);
    
    // Provide more specific error information
    let errorMessage = 'Error processing inquiry';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      details: error instanceof Error ? error.stack : 'Unknown error'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, ...update } = data;
    const inquiry = await prisma.inquiry.update({ where: { id }, data: update });
    return Response.json(inquiry);
  } catch (error: any) {
    return new Response('Error updating inquiry', { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.inquiry.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (error: any) {
    return new Response('Error deleting inquiry', { status: 500 });
  }
} 