-- View: vw_sales_daily
-- Returns one row per day with total revenue, tickets and average ticket.
DROP VIEW IF EXISTS vw_sales_daily;
CREATE VIEW vw_sales_daily AS
SELECT
    o.created_at::date AS fecha,
    ROUND(SUM(p.paid_amount), 2) AS total_ventas,
    COUNT(DISTINCT o.id) AS tickets,
    ROUND(SUM(p.paid_amount) / NULLIF(COUNT(DISTINCT o.id), 0), 2) AS ticket_promedio
FROM orders o
JOIN payments p ON o.id = p.order_id
GROUP BY o.created_at::date;

-- View: vw_top_products_ranked
-- Returns product ranking by generated revenue with units sold and average unit price.
DROP VIEW IF EXISTS vw_top_products_ranked;
CREATE VIEW vw_top_products_ranked AS
SELECT
    p.name AS name,
    SUM(oi.qty) AS units_sold,
    ROUND(SUM(oi.qty * oi.unit_price), 2) AS revenue,
    ROUND(SUM(oi.qty * oi.unit_price) / NULLIF(SUM(oi.qty), 0), 2) AS avg_unit_price,
    RANK() OVER (ORDER BY SUM(oi.qty * oi.unit_price) DESC) AS ranking
FROM products p
JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id, p.name
HAVING SUM(oi.qty) > 0;

-- View: vw_inventory_risk
-- Returns products with low inventory and a risk category per product.
DROP VIEW IF EXISTS vw_inventory_risk;
CREATE VIEW vw_inventory_risk AS
SELECT
    p.id AS product_id,
    p.name AS name,
    c.name AS categoria,
    COALESCE(MAX(p.stock), 0) AS stock,
    ROUND(COALESCE(MAX(p.stock), 0) * MAX(p.price), 2) AS valor_inventario_estimado,
    CASE
        WHEN COALESCE(MAX(p.stock), 0) = 0 THEN 'Agotado'
        WHEN COALESCE(MAX(p.stock), 0) BETWEEN 1 AND 5 THEN 'Bajo'
        WHEN COALESCE(MAX(p.stock), 0) BETWEEN 6 AND 10 THEN 'Medio'
        ELSE 'Optimo'
    END AS estatus_riesgo
FROM products p
JOIN categories c ON p.category_id = c.id
GROUP BY p.id, p.name, c.name
HAVING COALESCE(MAX(p.stock), 0) < 15;

-- View: vw_customer_value
-- Returns customer value metrics and value segment for customer analysis.
DROP VIEW IF EXISTS vw_customer_value;
CREATE VIEW vw_customer_value AS
WITH customer_stats AS (
    SELECT
        c.id AS customer_id,
        c.name AS name,
        COUNT(DISTINCT o.id) AS num_ordenes,
        ROUND(SUM(p.paid_amount), 2) AS total_gastado
    FROM customers c
    JOIN orders o ON c.id = o.customer_id
    JOIN payments p ON o.id = p.order_id
    GROUP BY c.id, c.name
    HAVING SUM(p.paid_amount) > 0
)
SELECT
    customer_id,
    name,
    num_ordenes AS visitas,
    total_gastado,
    ROUND(total_gastado / NULLIF(num_ordenes, 0), 2) AS gasto_promedio,
    CASE
        WHEN total_gastado >= 500 THEN 'VIP'
        WHEN total_gastado >= 200 THEN 'Premium'
        ELSE 'Regular'
    END AS segmento
FROM customer_stats;

-- View: vw_payment_mix
-- Returns count and percentage by payment method.
DROP VIEW IF EXISTS vw_payment_mix;
CREATE VIEW vw_payment_mix AS
SELECT
    COALESCE(method, 'unknown') AS method,
    COUNT(*) AS total_transacciones,
    ROUND(COUNT(*) * 100.0 / NULLIF((SELECT COUNT(*) FROM payments), 0), 2) AS porcentaje,
    ROUND(AVG(paid_amount), 2) AS ticket_promedio_metodo
FROM payments
GROUP BY COALESCE(method, 'unknown');

-- VERIFY: sample checks after creating views.
SELECT COUNT(*) AS sales_daily_rows FROM vw_sales_daily;
SELECT COUNT(*) AS top_products_rows FROM vw_top_products_ranked;
SELECT COUNT(*) AS inventory_risk_rows FROM vw_inventory_risk;
SELECT COUNT(*) AS customer_value_rows FROM vw_customer_value;
SELECT COUNT(*) AS payment_mix_rows FROM vw_payment_mix;