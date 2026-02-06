import { query } from '@/lib/db';
import { z } from 'zod';

const pageSchema = z.object({
  page: z.string().transform(Number).default('1'),
});

export default async function CustomerValue({ searchParams }: { searchParams: any }) {
  const { page } = pageSchema.parse(searchParams);
  const limit = 5;
  const offset = (page - 1) * limit;

  const { rows } = await query(
    'SELECT * FROM vw_customer_value ORDER BY total_gastado DESC LIMIT $1 OFFSET $2',
    [limit, offset]
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Valor del Cliente</h1>
      <p className="text-gray-500 mb-4">Insight: Clientes frecuentes y gasto promedio[cite: 6].</p>
      <div className="bg-purple-100 p-4 rounded mb-6 text-purple-800">
        <p className="text-sm">KPI: Mejor Cliente</p>
        <p className="text-2xl font-bold">{rows[0]?.name || 'N/A'}</p>
      </div>
      <table className="w-full">
        <thead className="bg-gray-100 text-left"><tr><th>Cliente</th><th>Total Gastado</th><th>Gasto Prom.</th></tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t"><td>{r.name}</td><td>${r.total_gastado}</td><td>${r.gasto_promedio}</td></tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex gap-2">
        {page > 1 && <a href={`?page=${page - 1}`} className="px-3 py-1 bg-gray-200">Atrás</a>}
        <a href={`?page=${page + 1}`} className="px-3 py-1 bg-gray-200">Siguiente</a>
      </div>
    </div>
  );
}