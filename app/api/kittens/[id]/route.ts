import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    
    if (isNaN(id)) {
      return new Response('Invalid kitten ID', { status: 400 });
    }

    const kitten = await prisma.kitten.findUnique({
      where: { id },
      include: { breed: true },
    });

    if (!kitten) {
      return new Response('Kitten not found', { status: 404 });
    }

    return Response.json(kitten);
  } catch (error: any) {
    console.error('Error fetching kitten:', error);
    return new Response(`Error fetching kitten: ${error.message}`, { status: 500 });
  }
} 