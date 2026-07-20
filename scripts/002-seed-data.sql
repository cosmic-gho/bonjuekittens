-- Seed data for Bonjuekittens

-- Insert sample breeds
INSERT INTO breeds (name, description, characteristics, colors, patterns, temperament, size, lifespan, image_url) VALUES
('Persian', 'Known for their long, luxurious coat and sweet personality, Persian cats are gentle and calm companions.', 'Long-haired, flat face, stocky build', 'White, Black, Blue, Red, Cream, Silver, Golden', 'Solid, Tabby, Bicolor, Himalayan', 'Gentle, Calm, Affectionate', 'Medium to Large', '12-17 years', '/placeholder.svg?height=300&width=400'),
('Maine Coon', 'Large, friendly cats with tufted ears and bushy tails. Known as gentle giants of the cat world.', 'Large size, tufted ears, long tail, water-resistant coat', 'Brown, Black, Red, Blue, Cream, White', 'Tabby, Solid, Tortoiseshell, Calico', 'Friendly, Intelligent, Playful', 'Large', '13-14 years', '/placeholder.svg?height=300&width=400'),
('British Shorthair', 'Sturdy, round cats with dense coats and calm temperaments. Perfect family companions.', 'Round face, dense coat, sturdy build', 'Blue, Black, White, Red, Cream, Silver', 'Solid, Tabby, Bicolor', 'Calm, Independent, Loyal', 'Medium to Large', '14-20 years', '/placeholder.svg?height=300&width=400'),
('Ragdoll', 'Large, docile cats that go limp when picked up. Known for their striking blue eyes and semi-long coat.', 'Large size, blue eyes, semi-long coat, docile nature', 'Seal, Blue, Chocolate, Lilac, Red, Cream', 'Colorpoint, Mitted, Bicolor', 'Docile, Calm, Affectionate', 'Large', '13-18 years', '/placeholder.svg?height=300&width=400');

-- Insert sample kittens
INSERT INTO kittens (name, breed_id, gender, age_weeks, color, price, description, health_records, images, status, featured) VALUES
('Luna', 1, 'Female', 12, 'Silver Persian', 1200.00, 'Beautiful silver Persian kitten with stunning green eyes. Very affectionate and loves to be held.', 'Vaccinated, Dewormed, Health Certificate', ARRAY['/placeholder.svg?height=400&width=400', '/placeholder.svg?height=400&width=400'], 'available', true),
('Max', 2, 'Male', 16, 'Brown Tabby', 800.00, 'Playful Maine Coon kitten with classic brown tabby markings. Great with children and other pets.', 'Vaccinated, Dewormed, Health Certificate', ARRAY['/placeholder.svg?height=400&width=400', '/placeholder.svg?height=400&width=400'], 'available', true),
('Bella', 3, 'Female', 14, 'Blue British Shorthair', 1000.00, 'Gorgeous blue British Shorthair with perfect round features. Calm and gentle personality.', 'Vaccinated, Dewormed, Health Certificate', ARRAY['/placeholder.svg?height=400&width=400'], 'available', false),
('Oliver', 4, 'Male', 18, 'Seal Point Ragdoll', 1100.00, 'Stunning seal point Ragdoll with bright blue eyes. Very docile and loving nature.', 'Vaccinated, Dewormed, Health Certificate', ARRAY['/placeholder.svg?height=400&width=400'], 'reserved', true);

-- Insert sample testimonials
INSERT INTO testimonials (customer_name, rating, comment, status) VALUES
('Sarah Johnson', 5, 'We got our Persian kitten Luna from Bonjuekittens and couldn''t be happier! She''s healthy, beautiful, and has the sweetest temperament. The whole process was professional and caring.', 'published'),
('Mike Chen', 5, 'Amazing experience! Our Maine Coon Max is everything we hoped for and more. The cattery provided excellent support and guidance throughout the process.', 'published'),
('Emily Davis', 5, 'Bonjuekittens truly cares about their cats and customers. Our British Shorthair is healthy, well-socialized, and absolutely perfect. Highly recommend!', 'published');

-- Insert site settings
INSERT INTO site_settings (key, value) VALUES
('business_name', 'Bonjuekittens'),
('business_phone', '(555) 123-4567'),
('business_email', 'info@bonjuekittens.com'),
('business_address', '123 Cat Lane, Feline City, FC 12345'),
('business_hours', 'Monday-Friday: 9AM-6PM, Saturday: 10AM-4PM, Sunday: Closed'),
('health_guarantee', 'We provide a 2-year health guarantee on all our kittens against genetic defects.'),
('shipping_policy', 'We offer safe ground transportation and flight nanny services for kitten delivery.');

-- Insert sample admin user (password: admin123)
INSERT INTO users (email, password_hash, name, role) VALUES
('admin@bonjuekittens.com', '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQ', 'Admin User', 'admin');
