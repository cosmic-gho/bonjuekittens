require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const dummyNames = ['Persian', 'Maine Coon', 'British Shorthair', 'Ragdoll'];
  
  console.log('Finding breeds to delete...');
  const breedsToDelete = await prisma.breed.findMany({
    where: {
      name: {
        in: dummyNames
      }
    }
  });

  if (breedsToDelete.length === 0) {
    console.log('No dummy breeds found.');
    return;
  }

  console.log(`Found ${breedsToDelete.length} dummy breeds. Deleting...`);
  
  // First update kittens to remove breedId to avoid foreign key constraints
  const ids = breedsToDelete.map(b => b.id);
  await prisma.kitten.updateMany({
    where: {
      breedId: { in: ids }
    },
    data: {
      breedId: null
    }
  });

  // Now delete breeds
  const result = await prisma.breed.deleteMany({
    where: {
      id: { in: ids }
    }
  });
  
  console.log(`Deleted ${result.count} dummy breeds.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
