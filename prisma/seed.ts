import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await hash('admin123', 12);
  await prisma.user.upsert({
    where: { email: 'admin@bonjuekittens.com' },
    update: {},
    create: {
      email: 'admin@bonjuekittens.com',
      passwordHash: hashedPassword,
      name: 'Admin User',
      role: 'admin',
    },
  });

  // Create breeds
  const breeds = await Promise.all([
    prisma.breed.create({
      data: {
        name: 'Persian',
        description: 'Known for their long, luxurious coat and sweet personality, Persian cats are gentle and calm companions.',
        characteristics: 'Long-haired, flat face, stocky build',
        colors: 'White, Black, Blue, Red, Cream, Silver, Golden',
        patterns: 'Solid, Tabby, Bicolor, Himalayan',
        temperament: 'Gentle, Calm, Affectionate',
        size: 'Medium to Large',
        lifespan: '12-17 years',
        imageUrl: '/placeholder.svg?height=300&width=400',
      },
    }),
    prisma.breed.create({
      data: {
        name: 'Maine Coon',
        description: 'Large, friendly cats with tufted ears and bushy tails. Known as gentle giants of the cat world.',
        characteristics: 'Large size, tufted ears, long tail, water-resistant coat',
        colors: 'Brown, Black, Red, Blue, Cream, White',
        patterns: 'Tabby, Solid, Tortoiseshell, Calico',
        temperament: 'Friendly, Intelligent, Playful',
        size: 'Large',
        lifespan: '13-14 years',
        imageUrl: '/placeholder.svg?height=300&width=400',
      },
    }),
    prisma.breed.create({
      data: {
        name: 'British Shorthair',
        description: 'Sturdy, round cats with dense coats and calm temperaments. Perfect family companions.',
        characteristics: 'Round face, dense coat, sturdy build',
        colors: 'Blue, Black, White, Red, Cream, Silver',
        patterns: 'Solid, Tabby, Bicolor',
        temperament: 'Calm, Independent, Loyal',
        size: 'Medium to Large',
        lifespan: '14-20 years',
        imageUrl: '/placeholder.svg?height=300&width=400',
      },
    }),
    prisma.breed.create({
      data: {
        name: 'Ragdoll',
        description: 'Large, docile cats that go limp when picked up. Known for their striking blue eyes and semi-long coat.',
        characteristics: 'Large size, blue eyes, semi-long coat, docile nature',
        colors: 'Seal, Blue, Chocolate, Lilac, Red, Cream',
        patterns: 'Colorpoint, Mitted, Bicolor',
        temperament: 'Docile, Calm, Affectionate',
        size: 'Large',
        lifespan: '13-18 years',
        imageUrl: '/placeholder.svg?height=300&width=400',
      },
    }),
  ]);

  // Create kittens
  await Promise.all([
    prisma.kitten.create({
      data: {
        name: 'Luna',
        breedId: breeds[0].id, // Persian
        gender: 'Female',
        ageWeeks: 12,
        color: 'Silver Persian',
        price: 1200.00,
        description: 'Beautiful silver Persian kitten with stunning green eyes. Very affectionate and loves to be held.',
        healthRecords: 'Vaccinated, Dewormed, Health Certificate',
        images: ['/placeholder.svg?height=400&width=400'],
        status: 'available',
        featured: true,
      },
    }),
    prisma.kitten.create({
      data: {
        name: 'Max',
        breedId: breeds[1].id, // Maine Coon
        gender: 'Male',
        ageWeeks: 16,
        color: 'Brown Tabby',
        price: 800.00,
        description: 'Playful Maine Coon kitten with classic brown tabby markings. Great with children and other pets.',
        healthRecords: 'Vaccinated, Dewormed, Health Certificate',
        images: ['/placeholder.svg?height=400&width=400'],
        status: 'available',
        featured: true,
      },
    }),
    prisma.kitten.create({
      data: {
        name: 'Bella',
        breedId: breeds[2].id, // British Shorthair
        gender: 'Female',
        ageWeeks: 14,
        color: 'Blue British Shorthair',
        price: 1000.00,
        description: 'Gorgeous blue British Shorthair with perfect round features. Calm and gentle personality.',
        healthRecords: 'Vaccinated, Dewormed, Health Certificate',
        images: ['/placeholder.svg?height=400&width=400'],
        status: 'available',
        featured: false,
      },
    }),
    prisma.kitten.create({
      data: {
        name: 'Oliver',
        breedId: breeds[3].id, // Ragdoll
        gender: 'Male',
        ageWeeks: 18,
        color: 'Seal Point Ragdoll',
        price: 1100.00,
        description: 'Stunning seal point Ragdoll with bright blue eyes. Very docile and loving nature.',
        healthRecords: 'Vaccinated, Dewormed, Health Certificate',
        images: ['/placeholder.svg?height=400&width=400'],
        status: 'reserved',
        featured: true,
      },
    }),
  ]);

  // Create testimonials
  await Promise.all([
    prisma.testimonial.create({
      data: {
        customerName: 'Sarah Johnson',
        rating: 5,
        comment: 'We got our Persian kitten Luna from Bonjuekittens and couldn\'t be happier! She\'s healthy, beautiful, and has the sweetest temperament. The whole process was professional and caring.',
        status: 'published',
      },
    }),
    prisma.testimonial.create({
      data: {
        customerName: 'Mike Chen',
        rating: 5,
        comment: 'Amazing experience! Our Maine Coon Max is everything we hoped for and more. The cattery provided excellent support and guidance throughout the process.',
        status: 'published',
      },
    }),
    prisma.testimonial.create({
      data: {
        customerName: 'Emily Davis',
        rating: 5,
        comment: 'Bonjuekittens truly cares about their cats and customers. Our British Shorthair is healthy, well-socialized, and absolutely perfect. Highly recommend!',
        status: 'published',
      },
    }),
  ]);

  // Create inquiries
  await Promise.all([
    prisma.inquiry.create({
      data: {
        customerName: 'John Smith',
        email: 'john@example.com',
        phone: '(555) 123-4567',
        message: 'I\'m interested in Luna the Persian kitten. Can you tell me more about her?',
        kittenId: 1, // Luna
        status: 'new',
      },
    }),
    prisma.inquiry.create({
      data: {
        customerName: 'Lisa Wilson',
        email: 'lisa@example.com',
        phone: '(555) 987-6543',
        message: 'I\'d like to know more about Max the Maine Coon. Is he still available?',
        kittenId: 2, // Max
        status: 'responded',
      },
    }),
  ]);

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 