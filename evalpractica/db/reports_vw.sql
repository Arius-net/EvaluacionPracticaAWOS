-- 1. Ventas Diarias (Corregida)
CREATE VIEW vw_sales_daily AS
SELECT 
    created_at::DATE as fecha,
    SUM(paid_amount) as total_ventas,
    COUNT(o.id) as tickets, -- Agregamos "o." para evitar la ambigüedad
    ROUND(AVG(paid_amount), 2) as ticket_promedio
FROM orders o
JOIN payments p ON o.id = p.order_id
GROUP BY created_at::DATE;

-- 2. Top Productos (Window Function + Ranking)
CREATE VIEW vw_top_products_ranked AS
SELECT 
    p.name,
    SUM(oi.qty) as unidades_vendidas,
    SUM(oi.qty * oi.unit_price) as revenue,
    RANK() OVER (ORDER BY SUM(oi.qty * oi.unit_price) DESC) as ranking
FROM products p
JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id, p.name;

-- 3. Riesgo de Inventario (CASE + Porcentaje)
CREATE VIEW vw_inventory_risk AS
SELECT 
    p.name,
    p.stock,
    c.name as categoria,
    CASE 
        WHEN p.stock = 0 THEN 'Agotado'
        WHEN p.stock < 10 THEN 'Riesgo Crítico'
        ELSE 'Normal'
    END as estatus_riesgo
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.stock < 15;

-- 4. Valor del Cliente (CTE + HAVING)
CREATE VIEW vw_customer_value AS
WITH customer_stats AS (
    SELECT 
        c.name,
        COUNT(o.id) as num_ordenes,
        SUM(p.paid_amount) as total_gastado
    FROM customers c
    JOIN orders o ON c.id = o.customer_id
    JOIN payments p ON o.id = p.order_id
    GROUP BY c.id, c.name
)
SELECT *, ROUND(total_gastado / num_ordenes, 2) as gasto_promedio
FROM customer_stats
WHERE num_ordenes > 0;

-- 5. Mezcla de Pagos (Porcentajes)
CREATE VIEW vw_payment_mix AS
SELECT 
    method,
    COUNT(*) as total_transacciones,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM payments), 2) as porcentaje
FROM payments
GROUP BY method;