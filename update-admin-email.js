const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const admin = await prisma.user.findFirst({
            where: {
                role: 'admin'
            }
        });
        
        if (admin && admin.email.includes('royalpride')) {
            await prisma.user.update({
                where: { id: admin.id },
                data: { email: 'admin@bonjuekittens.com' }
            });
            console.log('Admin email updated in database to admin@bonjuekittens.com');
        } else {
            console.log('Admin email already updated or not found.');
        }
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
