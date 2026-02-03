CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category_id INT REFERENCES categories(id),
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE customers(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
);

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(id),
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL,
    channel VARCHAR(50) NOT NULL
);

CREATE TABLE order_items(
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id),
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL
);

CREATE TABLE payments(
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    method VARCHAR(50) NOT NULL,
    paid_amount DECIMAL(10,2) NOT NULL
);