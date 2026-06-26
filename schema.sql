CREATE DATABASE IF NOT EXISTS anitas_bakers_db;
USE anitas_bakers_db;

CREATE TABLE IF NOT EXISTS settings (
    id INT PRIMARY KEY,
    whatsapp VARCHAR(20) DEFAULT '',
    delivery_fee DECIMAL(10,2) DEFAULT 0.00,
    address TEXT,
    hours VARCHAR(255) DEFAULT '',
    show_announcement TINYINT(1) DEFAULT 1,
    announcement_text VARCHAR(255) DEFAULT '',
    passcode_hash VARCHAR(255) NOT NULL,
    hero_title VARCHAR(255) DEFAULT 'Baking Joy Into Every Single Slice',
    hero_subtitle VARCHAR(255) DEFAULT 'Freshly Baked Everyday',
    hero_desc TEXT,
    about_title VARCHAR(255) DEFAULT 'Our Journey Through Flour & Sugar',
    about_desc TEXT,
    footer_about TEXT,
    facebook_url VARCHAR(255) DEFAULT '',
    instagram_url VARCHAR(255) DEFAULT '',
    theme_color VARCHAR(7) DEFAULT '#C5A059'
);

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    `desc` TEXT,
    image LONGTEXT,
    isCustomisable TINYINT(1) DEFAULT 0,
    inStock TINYINT(1) DEFAULT 1
);

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ref_id VARCHAR(20) UNIQUE NOT NULL,
    cust_name VARCHAR(255) NOT NULL,
    cust_phone VARCHAR(20) NOT NULL,
    cust_address TEXT,
    delivery_date DATE,
    delivery_time VARCHAR(50),
    notes TEXT,
    items JSON,
    subtotal DECIMAL(10,2),
    discount DECIMAL(10,2),
    delivery_fee DECIMAL(10,2),
    tax DECIMAL(10,2),
    grand_total DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'Placed',
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS promos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount INT NOT NULL,
    active TINYINT(1) DEFAULT 1
);

CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author VARCHAR(255) NOT NULL,
    type VARCHAR(100) DEFAULT 'Bakery Guest',
    stars INT NOT NULL,
    text TEXT,
    approved TINYINT(1) DEFAULT 0,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    date DATE,
    tiers VARCHAR(50),
    shape VARCHAR(50),
    description TEXT,
    image_url LONGTEXT,
    status VARCHAR(50) DEFAULT 'Pending'
);

-- 100% Veg Bakery Products Seed Data

-- Custom Cakes (isCustomisable = 1)
INSERT INTO products (name, category, price, `desc`, image, isCustomisable, inStock) VALUES
('Rich Chocolate Truffle Cake', 'Custom Cakes', 500.00, 'Decadent chocolate layers with pure eggless chocolate ganache. 🌿 100% Pure Veg.', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80', 1, 1),
('Classic Black Forest Cake', 'Custom Cakes', 450.00, 'Layers of eggless chocolate sponge, fresh whipped cream, and cherries. 🌿 100% Pure Veg.', 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600&q=80', 1, 1),
('Fresh Pineapple Cake', 'Custom Cakes', 400.00, 'Light vanilla sponge with fresh pineapple chunks and cream. 🌿 100% Pure Veg.', 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=600&q=80', 1, 1),
('Red Velvet Cream Cheese Cake', 'Custom Cakes', 550.00, 'Eggless red velvet sponge layered with tangy cream cheese frosting. 🌿 100% Pure Veg.', 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=600&q=80', 1, 1),
('Custom Photo Cake', 'Custom Cakes', 650.00, 'Your favorite photo printed on edible icing paper on a delicious eggless cake. 🌿 100% Pure Veg.', 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&q=80', 1, 1);

-- Biscuits & Cookies (isCustomisable = 0)
INSERT INTO products (name, category, price, `desc`, image, isCustomisable, inStock) VALUES
('Pure Ghee Nankhatai', 'Biscuits & Cookies', 150.00, 'Traditional Indian shortbread cookies made with pure ghee and cardamom. 🌿 100% Pure Veg.', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=80', 0, 1),
('Butter Cookies', 'Biscuits & Cookies', 120.00, 'Melt-in-your-mouth classic butter cookies. 🌿 100% Pure Veg.', 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80', 0, 1),
('Jeera / Salted Biscuits', 'Biscuits & Cookies', 100.00, 'Crispy savory biscuits with roasted cumin seeds. 🌿 100% Pure Veg.', 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=600&q=80', 0, 1),
('Choco-Chip Cookies', 'Biscuits & Cookies', 180.00, 'Crunchy eggless cookies loaded with premium dark chocolate chips. 🌿 100% Pure Veg.', 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80', 0, 1);

-- Breads & Pav (isCustomisable = 0)
INSERT INTO products (name, category, price, `desc`, image, isCustomisable, inStock) VALUES
('Fresh Laadi Pav', 'Breads & Pav', 50.00, 'Soft, fluffy, freshly baked Mumbai style laadi pav. 🌿 100% Pure Veg.', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80', 0, 1),
('Sweet Bun / Tutti Frutti Bun', 'Breads & Pav', 40.00, 'Soft sweet buns studded with colorful tutti frutti. 🌿 100% Pure Veg.', 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=600&q=80', 0, 1),
('Bun Maska Special', 'Breads & Pav', 60.00, 'Classic sweet bun generously slathered with fresh butter. 🌿 100% Pure Veg.', 'https://images.unsplash.com/photo-1627308595229-7830f5c90683?w=600&q=80', 0, 1),
('Garlic Bread Loaf', 'Breads & Pav', 90.00, 'Soft loaf baked with fresh garlic and herb butter. 🌿 100% Pure Veg.', 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=600&q=80', 0, 1);

-- Toast & Khari (isCustomisable = 0)
INSERT INTO products (name, category, price, `desc`, image, isCustomisable, inStock) VALUES
('Butter Toast / Rusk', 'Toast & Khari', 80.00, 'Crispy and crunchy twice-baked butter toast, perfect with chai. 🌿 100% Pure Veg.', 'https://images.unsplash.com/photo-1601314167099-232775b06f71?w=600&q=80', 0, 1),
('Wheat (Atta) Toast', 'Toast & Khari', 90.00, 'Healthy and crispy whole wheat toast. 🌿 100% Pure Veg.', 'https://images.unsplash.com/photo-1525423235703-6c285d74010e?w=600&q=80', 0, 1),
('Crispy Khari Biscuit', 'Toast & Khari', 110.00, 'Flaky, buttery, multi-layered savory puff pastry. 🌿 100% Pure Veg.', 'https://images.unsplash.com/photo-1601314167099-232775b06f71?w=600&q=80', 0, 1),
('Jeera Khari', 'Toast & Khari', 120.00, 'Classic khari biscuit baked with roasted jeera. 🌿 100% Pure Veg.', 'https://images.unsplash.com/photo-1601314167099-232775b06f71?w=600&q=80', 0, 1);

-- Pastries (isCustomisable = 0)
INSERT INTO products (name, category, price, `desc`, image, isCustomisable, inStock) VALUES
('Chocolate Pastry', 'Pastries', 80.00, 'Rich eggless chocolate sponge layered with truffle ganache. 🌿 100% Pure Veg.', 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&q=80', 0, 1),
('Black Forest Pastry', 'Pastries', 75.00, 'Classic black forest slice with cherries and cream. 🌿 100% Pure Veg.', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80', 0, 1),
('Pineapple Pastry', 'Pastries', 70.00, 'Fresh pineapple slice with light vanilla cream. 🌿 100% Pure Veg.', 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=600&q=80', 0, 1);

-- Dairy & Extras (isCustomisable = 0)
INSERT INTO products (name, category, price, `desc`, image, isCustomisable, inStock) VALUES
('Fresh Homemade Butter', 'Dairy & Extras', 200.00, 'Freshly churned pure white butter (Loni). 🌿 100% Pure Veg.', 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?w=600&q=80', 0, 1);

CREATE TABLE IF NOT EXISTS leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    interest VARCHAR(255) DEFAULT '',
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
