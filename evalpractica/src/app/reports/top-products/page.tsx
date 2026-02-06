import { query } from '@/lib/db';

export default async function TopProducts({ searchParams }: { searchParams: any }) {
  const search = searchParams.search || '';
  const { rows } = await query(
    "SELECT * FROM vw_top_products_ranked WHERE name ILIKE $1 ORDER BY ranking ASC",
    [`%${search}%`]
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Productos Estrella</h1>
      <p className="text-gray-500 mb-4">Insight: Ranking por unidades y revenue[cite: 6].</p>
      <div className="bg-yellow-100 p-4 rounded mb-6">
        <p className="text-sm">KPI: Producto #1</p>
        <p className="text-2xl font-bold">{rows[0]?.name || 'N/A'}</p>
      </div>
      <table className="w-full border-collapse">
        <thead><tr className="bg-gray-100 text-left"><th>Rank</th><th>Producto</th><th>Revenue</th></tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t"><td>{r.ranking}</td><td>{r.name}</td><td>${r.revenue}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}