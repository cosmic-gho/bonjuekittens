-- PetCat Database Seed Script (Simplified Version)
-- Run this script in your SQL editor

-- Step 1: Insert Admin User
INSERT INTO "User" (email, password_hash, name, role, created_at, updated_at)
VALUES (
    'admin@bonjuekittens.com',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3ZxQQxq6Hy',
    'Admin User',
    'admin',
    NOW(),
    NOW()
) ON CONFLICT (email) DO NOTHING;

-- Step 2: Insert Breeds
INSERT INTO "Breed" (name, description, characteristics, colors, patterns, temperament, size, lifespan, image_url, created_at, updated_at)
VALUES 
    ('Persian', 'Known for their long, luxurious coat and sweet personality, Persian cats are gentle and calm companions.', 'Long-haired, flat face, stocky build', 'White, Black, Blue, Red, Cream, Silver, Golden', 'Solid, Tabby, Bicolor, Himalayan', 'Gentle, Calm, Affectionate', 'Medium to Large', '12-17 years', '/placeholder.svg?height=300&width=400', NOW(), NOW()),
    ('Maine Coon', 'Large, friendly cats with tufted ears and bushy tails. Known as gentle giants of the cat world.', 'Large size, tufted ears, long tail, water-resistant coat', 'Brown, Black, Red, Blue, Cream, White', 'Tabby, Solid, Tortoiseshell, Calico', 'Friendly, Intelligent, Playful', 'Large', '13-14 years', '/placeholder.svg?height=300&width=400', NOW(), NOW()),
    ('British Shorthair', 'Sturdy, round cats with dense coats and calm temperaments. Perfect family companions.', 'Round face, dense coat, sturdy build', 'Blue, Black, White, Red, Cream, Silver', 'Solid, Tabby, Bicolor', 'Calm, Independent, Loyal', 'Medium to Large', '14-20 years', '/placeholder.svg?height=300&width=400', NOW(), NOW()),
    ('Ragdoll', 'Large, docile cats that go limp when picked up. Known for their striking blue eyes and semi-long coat.', 'Large size, blue eyes, semi-long coat, docile nature', 'Seal, Blue, Chocolate, Lilac, Red, Cream', 'Colorpoint, Mitted, Bicolor', 'Docile, Calm, Affectionate', 'Large', '13-18 years', '/placeholder.svg?height=300&width=400', NOW(), NOW());

-- Step 3: Insert Kittens
INSERT INTO "Kitten" (name, breed_id, gender, age_weeks, color, price, description, health_records, images, status, featured, created_at, updated_at)
VALUES 
    ('Luna', (SELECT id FROM "Breed" WHERE name = 'Persian' LIMIT 1), 'Female', 12, 'Silver Persian', 1200.00, 'Beautiful silver Persian kitten with stunning green eyes. Very affectionate and loves to be held.', 'Vaccinated, Dewormed, Health Certificate', ARRAY['/placeholder.svg?height=400&width=400'], 'available', true, NOW(), NOW()),
    ('Max', (SELECT id FROM "Breed" WHERE name = 'Maine Coon' LIMIT 1), 'Male', 16, 'Brown Tabby', 800.00, 'Playful Maine Coon kitten with classic brown tabby markings. Great with children and other pets.', 'Vaccinated, Dewormed, Health Certificate', ARRAY['/placeholder.svg?height=400&width=400'], 'available', true, NOW(), NOW()),
    ('Bella', (SELECT id FROM "Breed" WHERE name = 'British Shorthair' LIMIT 1), 'Female', 14, 'Blue British Shorthair', 1000.00, 'Gorgeous blue British Shorthair with perfect round features. Calm and gentle personality.', 'Vaccinated, Dewormed, Health Certificate', ARRAY['/placeholder.svg?height=400&width=400'], 'available', false, NOW(), NOW()),
    ('Oliver', (SELECT id FROM "Breed" WHERE name = 'Ragdoll' LIMIT 1), 'Male', 18, 'Seal Point Ragdoll', 1100.00, 'Stunning seal point Ragdoll with bright blue eyes. Very docile and loving nature.', 'Vaccinated, Dewormed, Health Certificate', ARRAY['/placeholder.svg?height=400&width=400'], 'reserved', true, NOW(), NOW()),
    ('Sophie', (SELECT id FROM "Breed" WHERE name = 'Persian' LIMIT 1), 'Female', 10, 'White Persian', 1300.00, 'Pristine white Persian kitten with blue eyes. Extremely gentle and loves attention.', 'Vaccinated, Dewormed, Health Certificate', ARRAY['/placeholder.svg?height=400&width=400'], 'available', false, NOW(), NOW()),
    ('Leo', (SELECT id FROM "Breed" WHERE name = 'Maine Coon' LIMIT 1), 'Male', 20, 'Black Maine Coon', 900.00, 'Majestic black Maine Coon with tufted ears. Very intelligent and playful.', 'Vaccinated, Dewormed, Health Certificate', ARRAY['/placeholder.svg?height=400&width=400'], 'available', true, NOW(), NOW());

-- Step 4: Insert Testimonials
INSERT INTO "Testimonial" (customer_name, rating, comment, status, image_url, created_at, updated_at)
VALUES 
    ('Sarah Johnson', 5, 'We got our Persian kitten Luna from Bonjuekittens and could not be happier! She is healthy, beautiful, and has the sweetest temperament. The whole process was professional and caring.', 'published', NULL, NOW(), NOW()),
    ('Mike Chen', 5, 'Amazing experience! Our Maine Coon Max is everything we hoped for and more. The cattery provided excellent support and guidance throughout the process.', 'published', NULL, NOW(), NOW()),
    ('Emily Davis', 5, 'Bonjuekittens truly cares about their cats and customers. Our British Shorthair is healthy, well-socialized, and absolutely perfect. Highly recommend!', 'published', NULL, NOW(), NOW()),
    ('David Wilson', 5, 'The Ragdoll we got from Bonjuekittens is absolutely perfect. So gentle and loving. The health records were complete and the kitten was well-socialized.', 'published', NULL, NOW(), NOW()),
    ('Lisa Thompson', 5, 'Professional service from start to finish. Our Persian kitten is healthy, beautiful, and has the sweetest personality. Highly recommend this cattery!', 'pending', NULL, NOW(), NOW());

-- Step 5: Insert Inquiries
INSERT INTO "Inquiry" (customer_name, email, phone, state, city, breeding_intentions, has_pets, purchase_timeline, message, kitten_id, status, created_at, updated_at)
VALUES 
    ('John Smith', 'john@example.com', '(555) 123-4567', 'California', 'Los Angeles', 'no', 'yes', 'within_month', 'I am interested in Luna the Persian kitten. Can you tell me more about her?', (SELECT id FROM "Kitten" WHERE name = 'Luna' LIMIT 1), 'new', NOW(), NOW()),
    ('Lisa Wilson', 'lisa@example.com', '(555) 987-6543', 'New York', 'Brooklyn', 'maybe', 'no', 'within_week', 'I would like to know more about Max the Maine Coon. Is he still available?', (SELECT id FROM "Kitten" WHERE name = 'Max' LIMIT 1), 'responded', NOW(), NOW()),
    ('Robert Johnson', 'robert@example.com', '(555) 456-7890', 'Texas', 'Austin', 'no', 'yes', 'immediately', 'I am very interested in Bella the British Shorthair. Can you provide more details about her health and temperament?', (SELECT id FROM "Kitten" WHERE name = 'Bella' LIMIT 1), 'new', NOW(), NOW()),
    ('Maria Garcia', 'maria@example.com', '(555) 321-6540', 'Florida', 'Miami', 'no', 'no', 'within_3_months', 'I am looking for a gentle cat for my family. Can you recommend which kitten would be best for children?', NULL, 'new', NOW(), NOW()),
    ('James Brown', 'james@example.com', '(555) 789-0123', 'Washington', 'Seattle', 'yes', 'yes', 'just_browsing', 'I am interested in breeding. Do you have any kittens suitable for breeding programs?', (SELECT id FROM "Kitten" WHERE name = 'Sophie' LIMIT 1), 'new', NOW(), NOW());

-- Step 6: Insert Site Settings
INSERT INTO "SiteSetting" (key, value, created_at, updated_at)
VALUES 
    ('site_name', 'Bonjuekittens', NOW(), NOW()),
    ('site_description', 'Premium Persian, Maine Coon, British Shorthair, and Ragdoll kittens', NOW(), NOW()),
    ('contact_email', 'info@bonjuekittens.com', NOW(), NOW()),
    ('contact_phone', '(555) 123-4567', NOW(), NOW()),
    ('address', '123 Cat Lane, Kitty City, KC 12345', NOW(), NOW()),
    ('facebook_url', 'https://facebook.com/bonjuekittens', NOW(), NOW()),
    ('instagram_url', 'https://instagram.com/bonjuekittens', NOW(), NOW()),
    ('youtube_url', 'https://youtube.com/bonjuekittens', NOW(), NOW())
ON CONFLICT (key) DO NOTHING;

-- Step 7: Insert Notifications
INSERT INTO "Notification" (type, title, message, priority, read, created_at)
VALUES 
    ('inquiry', 'New Inquiry Received', 'John Smith submitted an inquiry about Luna', 'normal', false, NOW()),
    ('kitten', 'Kitten Status Updated', 'Oliver has been marked as reserved', 'normal', false, NOW()),
    ('testimonial', 'New Testimonial', 'Lisa Thompson submitted a new testimonial', 'normal', false, NOW()),
    ('system', 'Database Seeded', 'Sample data has been successfully loaded', 'low', true, NOW());

-- Step 8: Show Summary
SELECT 'Database seeded successfully!' as message;
SELECT COUNT(*) as users_count FROM "User";
SELECT COUNT(*) as breeds_count FROM "Breed";
SELECT COUNT(*) as kittens_count FROM "Kitten";
SELECT COUNT(*) as testimonials_count FROM "Testimonial";
SELECT COUNT(*) as inquiries_count FROM "Inquiry";
SELECT COUNT(*) as settings_count FROM "SiteSetting";
SELECT COUNT(*) as notifications_count FROM "Notification"; 