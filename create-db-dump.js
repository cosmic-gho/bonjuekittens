const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

async function createDatabaseDump() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🗄️ Creating database dump...');
    
    // Test database connection first
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Get all data from each table
    console.log('📊 Fetching data from database...');
    
    const [kittens, inquiries, testimonials, breeds] = await Promise.all([
      prisma.kitten.findMany(),
      prisma.inquiry.findMany({
        include: { kitten: true }
      }),
      prisma.testimonial.findMany(),
      prisma.breed.findMany()
    ]);

    console.log(`📊 Found ${kittens.length} kittens`);
    console.log(`📊 Found ${inquiries.length} inquiries`);
    console.log(`📊 Found ${testimonials.length} testimonials`);
    console.log(`📊 Found ${breeds.length} breeds`);

    // Create SQL dump content
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    let sqlContent = `-- PetCat Database Dump
-- Generated on: ${new Date().toLocaleString()}
-- Total Records: ${kittens.length + inquiries.length + testimonials.length + breeds.length}

-- ============================================
-- KITTENS TABLE
-- ============================================
`;

    // Add kittens data
    if (kittens.length > 0) {
      sqlContent += `INSERT INTO "Kitten" (id, name, breed, gender, age, price, description, image_url, is_available, created_at, updated_at) VALUES\n`;
      
      const kittenValues = kittens.map(kitten => {
        const values = [
          kitten.id,
          `'${kitten.name.replace(/'/g, "''")}'`,
          `'${kitten.breed.replace(/'/g, "''")}'`,
          `'${kitten.gender}'`,
          kitten.age,
          kitten.price,
          `'${kitten.description?.replace(/'/g, "''") || ''}'`,
          `'${kitten.image_url || ''}'`,
          kitten.is_available,
          `'${kitten.created_at.toISOString()}'`,
          `'${kitten.updated_at.toISOString()}'`
        ];
        return `(${values.join(', ')})`;
      }).join(',\n');
      
      sqlContent += kittenValues + ';\n\n';
    } else {
      sqlContent += '-- No kittens found\n\n';
    }

    // Add inquiries data
    sqlContent += `-- ============================================
-- INQUIRIES TABLE
-- ============================================
`;

    if (inquiries.length > 0) {
      sqlContent += `INSERT INTO "Inquiry" (id, customer_name, email, phone, state, city, breeding_intentions, has_pets, purchase_timeline, message, status, kitten_id, created_at, updated_at) VALUES\n`;
      
      const inquiryValues = inquiries.map(inquiry => {
        const values = [
          inquiry.id,
          `'${inquiry.customer_name.replace(/'/g, "''")}'`,
          `'${inquiry.email.replace(/'/g, "''")}'`,
          inquiry.phone ? `'${inquiry.phone.replace(/'/g, "''")}'` : 'NULL',
          inquiry.state ? `'${inquiry.state.replace(/'/g, "''")}'` : 'NULL',
          inquiry.city ? `'${inquiry.city.replace(/'/g, "''")}'` : 'NULL',
          inquiry.breeding_intentions ? `'${inquiry.breeding_intentions.replace(/'/g, "''")}'` : 'NULL',
          inquiry.has_pets ? `'${inquiry.has_pets.replace(/'/g, "''")}'` : 'NULL',
          inquiry.purchase_timeline ? `'${inquiry.purchase_timeline.replace(/'/g, "''")}'` : 'NULL',
          `'${inquiry.message.replace(/'/g, "''")}'`,
          `'${inquiry.status}'`,
          inquiry.kitten_id || 'NULL',
          `'${inquiry.created_at.toISOString()}'`,
          `'${inquiry.updated_at.toISOString()}'`
        ];
        return `(${values.join(', ')})`;
      }).join(',\n');
      
      sqlContent += inquiryValues + ';\n\n';
    } else {
      sqlContent += '-- No inquiries found\n\n';
    }

    // Add testimonials data
    sqlContent += `-- ============================================
-- TESTIMONIALS TABLE
-- ============================================
`;

    if (testimonials.length > 0) {
      sqlContent += `INSERT INTO "Testimonial" (id, customer_name, rating, comment, image_url, is_featured, created_at, updated_at) VALUES\n`;
      
      const testimonialValues = testimonials.map(testimonial => {
        const values = [
          testimonial.id,
          `'${testimonial.customer_name.replace(/'/g, "''")}'`,
          testimonial.rating,
          `'${testimonial.comment?.replace(/'/g, "''") || ''}'`,
          testimonial.image_url ? `'${testimonial.image_url.replace(/'/g, "''")}'` : 'NULL',
          testimonial.is_featured,
          `'${testimonial.created_at.toISOString()}'`,
          `'${testimonial.updated_at.toISOString()}'`
        ];
        return `(${values.join(', ')})`;
      }).join(',\n');
      
      sqlContent += testimonialValues + ';\n\n';
    } else {
      sqlContent += '-- No testimonials found\n\n';
    }

    // Add breeds data
    sqlContent += `-- ============================================
-- BREEDS TABLE
-- ============================================
`;

    if (breeds.length > 0) {
      sqlContent += `INSERT INTO "Breed" (id, name, description, characteristics, care_requirements, created_at, updated_at) VALUES\n`;
      
      const breedValues = breeds.map(breed => {
        const values = [
          breed.id,
          `'${breed.name.replace(/'/g, "''")}'`,
          `'${breed.description?.replace(/'/g, "''") || ''}'`,
          `'${breed.characteristics?.replace(/'/g, "''") || ''}'`,
          `'${breed.care_requirements?.replace(/'/g, "''") || ''}'`,
          `'${breed.created_at.toISOString()}'`,
          `'${breed.updated_at.toISOString()}'`
        ];
        return `(${values.join(', ')})`;
      }).join(',\n');
      
      sqlContent += breedValues + ';\n\n';
    } else {
      sqlContent += '-- No breeds found\n\n';
    }

    sqlContent += `-- ============================================
-- END OF DATABASE DUMP
-- ============================================
`;

    // Write to file
    const filename = `petcat-database-dump-${timestamp}.sql`;
    const filepath = path.join(process.cwd(), filename);
    
    fs.writeFileSync(filepath, sqlContent);
    
    console.log(`✅ Database dump completed!`);
    console.log(`📁 File saved: ${filename}`);
    console.log(`📊 Total records exported: ${kittens.length + inquiries.length + testimonials.length + breeds.length}`);
    console.log(`📁 File size: ${(fs.statSync(filepath).size / 1024).toFixed(2)} KB`);
    
    return { success: true, filename, filepath };
    
  } catch (error) {
    console.error('❌ Database dump failed:', error);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure your database is running');
    console.log('2. Check your DATABASE_URL in .env.local');
    console.log('3. Try running: npm run dev (to start the server)');
    console.log('4. Then run this script again');
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}

// Run the dump
createDatabaseDump().then(result => {
  if (result.success) {
    console.log(`\n🎉 Database dump successful!`);
    console.log(`📁 File: ${result.filename}`);
  } else {
    console.log(`\n❌ Database dump failed: ${result.error}`);
  }
  process.exit(0);
});
