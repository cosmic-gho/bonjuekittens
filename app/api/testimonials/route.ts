import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // Check if this is an admin request by looking for a query parameter
    const { searchParams } = new URL(req.url);
    const isAdmin = searchParams.get('admin') === 'true';
    
    const testimonials = await prisma.testimonial.findMany({
      where: isAdmin ? {} : { status: 'published' }, // Show all for admin, only published for public
      orderBy: { createdAt: 'desc' },
    });
    return Response.json(testimonials);
  } catch (error: any) {
    return new Response('Error fetching testimonials', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const testimonial = await prisma.testimonial.create({ data });
    return Response.json(testimonial);
  } catch (error: any) {
    return new Response('Error creating testimonial', { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, ...update } = data;
    const testimonial = await prisma.testimonial.update({ where: { id }, data: update });
    return Response.json(testimonial);
  } catch (error: any) {
    return new Response('Error updating testimonial', { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.testimonial.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (error: any) {
    return new Response('Error deleting testimonial', { status: 500 });
  }
} 