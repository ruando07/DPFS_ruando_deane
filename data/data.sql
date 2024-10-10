USE ecommerce_db;

-- Inserción de datos en la tabla de Usuarios
INSERT INTO users (first_name, last_name, email, password, createdAt, updatedAt) VALUES
('John', 'Doe', 'john.doe@example.com', 'hashedpassword1', NOW(), NOW()),
('Jane', 'Smith', 'jane.smith@example.com', 'hashedpassword2', NOW(), NOW()),
('Mike', 'Johnson', 'mike.johnson@example.com', 'hashedpassword3', NOW(), NOW());

-- Inserción de datos en la tabla de Productos
INSERT INTO products (name, description, price, brand, createdAt, updatedAt) VALUES
('Dell XPS 13', 'High-end laptop with a 13-inch display.', 1200.00, 'Dell', NOW(), NOW()),
('MacBook Air', 'Ultra-lightweight and powerful laptop.', 999.00, 'Apple', NOW(), NOW()),
('HP Spectre x360', 'Convertible 2-in-1 laptop with touch screen.', 1300.00, 'HP', NOW(), NOW());

-- Inserción de datos en la tabla de Categorías
INSERT INTO categories (name, createdAt, updatedAt) VALUES
('Ultrabooks', NOW(), NOW()),
('2-in-1', NOW(), NOW()),
('Business', NOW(), NOW());

-- Inserción de datos en la tabla de Marcas
INSERT INTO brands (name, createdAt, updatedAt) VALUES
('Dell', NOW(), NOW()),
('Apple', NOW(), NOW()),
('HP', NOW(), NOW());

-- Inserción de datos en la tabla de Carritos de Compras
INSERT INTO carts (user_id, total, createdAt, updatedAt) VALUES
(1, 2199.00, NOW(), NOW()),
(2, 999.00, NOW(), NOW());

-- Inserción de datos en la tabla de Productos en Carritos
INSERT INTO cart_products (cart_id, product_id, quantity, createdAt, updatedAt) VALUES
(1, 1, 1, NOW(), NOW()),  -- Dell XPS 13
(1, 2, 1, NOW(), NOW()),  -- MacBook Air
(2, 2, 1, NOW(), NOW());  -- MacBook Air
