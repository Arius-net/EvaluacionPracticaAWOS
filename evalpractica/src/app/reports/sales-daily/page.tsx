import { query } from '@/lib/db';
import { z } from 'zod';

const schema = z.object({
  date_from: z.string().optional().default('2000-01-01'),
  date_to: z.string().optional().default('2100-12-31'),
});

export default async function SalesDaily({ searchParams }: { searchParams: Promise<any> }) {
  const params = await searchParams;
  const { date_from, date_to } = schema.parse(params);
  
  const { rows } = await query(
    'SELECT * FROM vw_sales_daily WHERE fecha BETWEEN $1 AND $2 ORDER BY fecha DESC',
    [date_from, date_to]
  );

  const total = rows.reduce((acc, curr) => acc + Number(curr.total_ventas), 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Ventas Diarias</h1>
      <p className="text-gray-500 mb-4">Insight: Análisis de ingresos y tickets por día.</p>
      <div className="bg-green-100 p-4 rounded mb-6">
        <p className="text-sm">KPI: Ingreso Total en Rango</p>
        <p className="text-2xl font-bold">${total.toFixed(2)}</p>
      </div>
      <table className="w-full border-collapse bg-white shadow-sm">
        <thead><tr className="bg-gray-100 text-left"><th>Fecha</th><th>Ventas</th><th>Tickets</th></tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t">
              <td>{new Date(r.fecha).toLocaleDateString()}</td>
              <td>${r.total_ventas}</td>
              <td>{r.tickets}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}