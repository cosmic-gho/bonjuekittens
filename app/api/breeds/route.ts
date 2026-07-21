import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const breeds = await prisma.breed.findMany({
      orderBy: { name: 'asc' },
    });
    return Response.json(breeds);
  } catch (error: any) {
    return new Response('Error fetching breeds', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const breed = await prisma.breed.create({ data });
    return Response.json(breed);
  } catch (error: any) {
    return new Response('Error creating breed', { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, ...update } = data;
    const breed = await prisma.breed.update({ where: { id }, data: update });
    return Response.json(breed);
  } catch (error: any) {
    return new Response('Error updating breed', { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.breed.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (error: any) {
    return new Response('Error deleting breed', { status: 500 });
  }
} 