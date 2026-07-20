import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const breeds = await prisma.breed.findMany({
      orderBy: { name: 'asc' },
    })
    
    return NextResponse.json({
      count: breeds.length,
      breeds: breeds.map(breed => ({
        id: breed.id,
        name: breed.name,
        description: breed.description,
      })),
      uniqueIds: [...new Set(breeds.map(b => b.id))].length,
      uniqueNames: [...new Set(breeds.map(b => b.name))].length,
    })
  } catch (error) {
    console.error('Error fetching breeds:', error)
    return NextResponse.json({ error: 'Failed to fetch breeds' }, { status: 500 })
  }
} 