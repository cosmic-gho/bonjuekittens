require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const breeds = await prisma.breed.findMany();
  console.log(JSON.stringify(breeds, null, 2));
}
main().finally(() => prisma.$disconnect());
