import { query } from '@/lib/db';

export interface SalesDailyFilters {
  dateFrom: string;
  dateTo: string;
}

export interface TopProductsFilters {
  search: string;
  page: number;
  limit: number;
}

export interface InventoryRiskFilters {
  category: string;
}

export interface CustomerValueFilters {
  page: number;
  limit: number;
}

export interface SalesDailyRow {
  fecha: string;
  total_ventas: string;
  tickets: string;
  ticket_promedio: string;
}

export interface TopProductsRow {
  name: string;
  units_sold: string;
  revenue: string;
  avg_unit_price: string;
  ranking: number;
}

export interface InventoryRiskRow {
  product_id: number;
  name: string;
  categoria: string;
  stock: number;
  valor_inventario_estimado: string;
  estatus_riesgo: 'Agotado' | 'Bajo' | 'Medio' | 'Optimo';
}

export interface CustomerValueRow {
  name: string;
  visitas: string;
  total_gastado: string;
  gasto_promedio: string;
  segmento: 'VIP' | 'Premium' | 'Regular';
}

export interface PaymentMixRow {
  method: string;
  total_transacciones: string;
  porcentaje: string;
}

export async function getSalesDailyReport(filters: SalesDailyFilters): Promise<SalesDailyRow[]> {
  const { rows } = await query(
    `SELECT fecha, total_ventas, tickets, ticket_promedio
     FROM vw_sales_daily
     WHERE fecha BETWEEN $1 AND $2
     ORDER BY fecha DESC`,
    [filters.dateFrom, filters.dateTo]
  );

  return rows as SalesDailyRow[];
}

export async function getTopProductsReport(
  filters: TopProductsFilters
): Promise<{ rows: TopProductsRow[]; total: number }> {
  const offset = (filters.page - 1) * filters.limit;

  const dataResult = await query(
    `SELECT name, units_sold, revenue, avg_unit_price, ranking
     FROM vw_top_products_ranked
     WHERE name ILIKE $1
     ORDER BY ranking ASC
     LIMIT $2 OFFSET $3`,
    [`%${filters.search}%`, filters.limit, offset]
  );

  const countResult = await query(
    `SELECT COUNT(*) AS total
     FROM vw_top_products_ranked
     WHERE name ILIKE $1`,
    [`%${filters.search}%`]
  );

  return {
    rows: dataResult.rows as TopProductsRow[],
    total: Number(countResult.rows[0]?.total ?? 0),
  };
}

export async function getInventoryRiskReport(filters: InventoryRiskFilters): Promise<InventoryRiskRow[]> {
  const includeAllCategories = filters.category === 'all';

  const result = await query(
    `SELECT product_id, name, categoria, stock, valor_inventario_estimado, estatus_riesgo
     FROM vw_inventory_risk
     WHERE ($1::boolean OR categoria = $2)
     ORDER BY stock ASC, name ASC`,
    [includeAllCategories, filters.category]
  );

  return result.rows as InventoryRiskRow[];
}

export async function getInventoryCategories(): Promise<string[]> {
  const { rows } = await query(
    `SELECT DISTINCT categoria
     FROM vw_inventory_risk
     ORDER BY categoria ASC`
  );

  return rows.map((row) => String(row.categoria));
}

export async function getCustomerValueReport(
  filters: CustomerValueFilters
): Promise<{ rows: CustomerValueRow[]; total: number }> {
  const offset = (filters.page - 1) * filters.limit;

  const dataResult = await query(
    `SELECT name, visitas, total_gastado, gasto_promedio, segmento
     FROM vw_customer_value
     ORDER BY total_gastado DESC
     LIMIT $1 OFFSET $2`,
    [filters.limit, offset]
  );

  const countResult = await query('SELECT COUNT(*) AS total FROM vw_customer_value');

  return {
    rows: dataResult.rows as CustomerValueRow[],
    total: Number(countResult.rows[0]?.total ?? 0),
  };
}

export async function getPaymentMixReport(): Promise<PaymentMixRow[]> {
  const { rows } = await query(
    `SELECT method, total_transacciones, porcentaje
     FROM vw_payment_mix
     ORDER BY total_transacciones DESC, method ASC`
  );

  return rows as PaymentMixRow[];
}
