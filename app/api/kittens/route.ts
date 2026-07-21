import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    console.log('Fetching kittens from database...');
    const kittens = await prisma.kitten.findMany({
      include: { breed: true },
      orderBy: { createdAt: 'desc' },
    });
    console.log(`Found ${kittens.length} kittens`);
    return Response.json(kittens);
  } catch (error: any) {
    console.error('Error fetching kittens:', error);
    return new Response(`Error fetching kittens: ${error.message}`, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { breed, ...cleanData } = data;
    
    // Clean the data for creation
    const kittenData = {
      ...cleanData,
      breedId: cleanData.breedId || null,
      price: cleanData.price ? parseFloat(cleanData.price) : null,
      ageWeeks: cleanData.ageWeeks ? parseInt(cleanData.ageWeeks) : null,
    };
    
    const kitten = await prisma.kitten.create({ 
      data: kittenData,
      include: { breed: true }
    });
    return Response.json(kitten);
  } catch (error: any) {
    console.error('Error creating kitten:', error);
    return new Response(`Error creating kitten: ${error.message}`, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, breed, ...update } = data;
    console.log('Updating kitten:', { id, update });
    
    // Remove any nested objects that shouldn't be in the update
    const cleanUpdate = {
      ...update,
      breedId: update.breedId || null,
      price: update.price ? parseFloat(update.price) : null,
      ageWeeks: update.ageWeeks ? parseInt(update.ageWeeks) : null,
    };
    
    const kitten = await prisma.kitten.update({ 
      where: { id }, 
      data: cleanUpdate,
      include: { breed: true }
    });
    return Response.json(kitten);
  } catch (error: any) {
    console.error('Error updating kitten:', error);
    return new Response(`Error updating kitten: ${error.message}`, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.kitten.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (error: any) {
    return new Response('Error deleting kitten', { status: 500 });
  }
} 