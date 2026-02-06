CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);