INSERT INTO categories (name) VALUES ('Bebidas Calientes'), ('Bebidas Frías'), ('Repostería');

INSERT INTO products (name, category_id, price, stock) VALUES 
('Americano', 1, 35.00, 50),
('Capuchino', 1, 45.00, 2),
('Latte', 1, 48.00, 15),
('Frappé Oreo', 2, 65.00, 10),
('Té Helado', 2, 30.00, 3),
('Croissant', 3, 25.00, 5);

INSERT INTO customers (name, email) VALUES 
('Juan Perez', 'juan@mail.com'), ('Ana G.', 'ana@mail.com'), 
('Luis M.', 'luis@mail.com'), ('Carla R.', 'carla@mail.com'),
('Gaby T.', 'gaby@mail.com'), ('Pedro S.', 'pedro@mail.com'),
('Rosa L.', 'rosa@mail.com'), ('Hugo V.', 'hugo@mail.com'),
('Beto X.', 'beto@mail.com'), ('Sara M.', 'sara@mail.com');

INSERT INTO orders (customer_id, created_at, status, channel) VALUES 
(1, CURRENT_DATE - INTERVAL '1 day', 'completed', 'counter'),
(2, CURRENT_DATE, 'completed', 'app');

INSERT INTO order_items (order_id, product_id, qty, unit_price) VALUES 
(1, 1, 2, 35.00), (1, 6, 1, 25.00),
(2, 2, 1, 45.00);

INSERT INTO payments (order_id, method, paid_amount) VALUES 
(1, 'cash', 95.00), (2, 'card', 45.00);