INSERT INTO categories (name)
VALUES
('Bebidas Calientes'),
('Bebidas Frias'),
('Reposteria'),
('Snacks'),
('Temporada');

INSERT INTO products (name, category_id, price, stock)
VALUES
('Americano', 1, 35.00, 40),
('Capuchino', 1, 45.00, 4),
('Latte', 1, 48.00, 18),
('Mocha', 1, 52.00, 9),
('Espresso', 1, 30.00, 0),
('Te Helado', 2, 30.00, 6),
('Frappe Oreo', 2, 65.00, 11),
('Limonada', 2, 28.00, 14),
('Smoothie Fresa', 2, 58.00, 3),
('Cold Brew', 2, 55.00, 2),
('Croissant', 3, 25.00, 8),
('Muffin Chocolate', 3, 32.00, 7),
('Cheesecake', 3, 54.00, 5),
('Panque Platano', 3, 38.00, 12),
('Brownie', 3, 29.00, 0),
('Sandwich Jamon', 4, 48.00, 13),
('Wrap Vegetariano', 4, 52.00, 9),
('Bagel Queso', 4, 44.00, 3),
('Cookie Avena', 4, 22.00, 20),
('Pumpkin Spice Latte', 5, 60.00, 10);

INSERT INTO customers (name, email)
SELECT
	'Cliente ' || gs,
	'cliente' || gs || '@mail.com'
FROM generate_series(1, 80) AS gs;

INSERT INTO orders (customer_id, created_at, status, channel)
SELECT
	((gs - 1) % 80) + 1 AS customer_id,
	(CURRENT_DATE - ((gs - 1) % 45) * INTERVAL '1 day') + ((gs - 1) % 12) * INTERVAL '1 hour' AS created_at,
	CASE
		WHEN gs % 12 = 0 THEN 'cancelled'
		WHEN gs % 8 = 0 THEN 'pending'
		ELSE 'completed'
	END AS status,
	CASE
		WHEN gs % 3 = 0 THEN 'app'
		WHEN gs % 3 = 1 THEN 'counter'
		ELSE 'delivery'
	END AS channel
FROM generate_series(1, 220) AS gs;

INSERT INTO order_items (order_id, product_id, qty, unit_price)
SELECT
	o.id AS order_id,
	((o.id - 1) % 20) + 1 AS product_id,
	((o.id - 1) % 4) + 1 AS qty,
	p.price AS unit_price
FROM orders o
JOIN products p ON p.id = ((o.id - 1) % 20) + 1;

INSERT INTO order_items (order_id, product_id, qty, unit_price)
SELECT
	o.id AS order_id,
	((o.id + 6) % 20) + 1 AS product_id,
	((o.id + 1) % 3) + 1 AS qty,
	p.price AS unit_price
FROM orders o
JOIN products p ON p.id = ((o.id + 6) % 20) + 1
WHERE o.id % 2 = 0;

INSERT INTO payments (order_id, method, paid_amount)
SELECT
	o.id AS order_id,
	CASE
		WHEN o.id % 4 = 0 THEN 'cash'
		WHEN o.id % 4 = 1 THEN 'card'
		WHEN o.id % 4 = 2 THEN 'transfer'
		ELSE 'wallet'
	END AS method,
	ROUND(SUM(oi.qty * oi.unit_price), 2) AS paid_amount
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
WHERE o.status = 'completed'
GROUP BY o.id;