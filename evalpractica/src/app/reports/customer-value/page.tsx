import { query } from '@/lib/db';
import { z } from 'zod';
import Link from 'next/link';

const pageSchema = z.object({
  page: z.string().transform(Number).default('1'),
});

export default async function CustomerValue({ searchParams }: { searchParams: Promise<any> }) {
  const params = await searchParams;
  const { page } = pageSchema.parse(params);
  
  const limit = 10;
  const offset = (page - 1) * limit;

  const { rows } = await query(
    'SELECT * FROM vw_customer_value ORDER BY total_gastado DESC LIMIT $1 OFFSET $2',
    [limit, offset]
  );

  const { rows: totalRows } = await query('SELECT COUNT(*) as total FROM vw_customer_value');
  const totalCustomers = Number(totalRows[0].total);
  const totalPages = Math.ceil(totalCustomers / limit);

  const topCustomer = rows[0];
  const totalSpent = rows.reduce((acc, curr) => acc + Number(curr.total_gastado), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  👥 Valor del Cliente
                </h1>
                <p className="text-sm text-gray-600">Clientes frecuentes y gasto promedio</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <p className="text-purple-100 text-sm font-medium">Mejor Cliente</p>
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                👑
              </div>
            </div>
            <p className="text-2xl font-bold break-words">{topCustomer?.name || 'N/A'}</p>
            <p className="text-purple-100 text-sm mt-2">
              {topCustomer ? `$${Number(topCustomer.total_gastado).toFixed(2)} gastados` : 'Sin datos'}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm font-medium">Total Clientes</p>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                👤
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900">{totalCustomers}</p>
            <p className="text-gray-500 text-sm mt-2">Registrados en sistema</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm font-medium">Gasto Total (Página)</p>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                💰
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900">${totalSpent.toFixed(2)}</p>
            <p className="text-gray-500 text-sm mt-2">De top {rows.length} clientes</p>
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-50 to-violet-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Ranking
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Visitas
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Total Gastado
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Gasto Promedio
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Categoría
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rows.map((r, i) => {
                  const ranking = offset + i + 1;
                  const getMedalEmoji = (rank: number) => {
                    if (rank === 1) return '🥇';
                    if (rank === 2) return '🥈';
                    if (rank === 3) return '🥉';
                    return `#${rank}`;
                  };

                  const getCategoryBadge = (spent: number) => {
                    if (spent >= 100) return { text: 'VIP', color: 'bg-yellow-100 text-yellow-800' };
                    if (spent >= 50) return { text: 'Premium', color: 'bg-purple-100 text-purple-800' };
                    return { text: 'Regular', color: 'bg-blue-100 text-blue-800' };
                  };

                  const category = getCategoryBadge(Number(r.total_gastado));

                  return (
                    <tr key={i} className="hover:bg-purple-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-2xl font-bold">
                          {getMedalEmoji(ranking)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full flex items-center justify-center text-white font-bold">
                            {r.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-gray-900">{r.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {r.visitas} 🛍️
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="text-lg font-bold text-green-600">
                          ${Number(r.total_gastado).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="text-sm font-medium text-gray-900">
                          ${Number(r.gasto_promedio).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${category.color}`}>
                          {category.text}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {rows.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No hay clientes registrados</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {page > 1 && (
              <Link
                href={`?page=${page - 1}`}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
              >
                ← Anterior
              </Link>
            )}
            
            <div className="flex gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }

                return (
                  <Link
                    key={i}
                    href={`?page=${pageNum}`}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      page === pageNum
                        ? 'bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-md'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              })}
            </div>

            {page < totalPages && (
              <Link
                href={`?page=${page + 1}`}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
              >
                Siguiente →
              </Link>
            )}
          </div>
        )}

        <div className="mt-4 text-center text-sm text-gray-500">
          Página {page} de {totalPages} • Mostrando {rows.length} de {totalCustomers} clientes
        </div>
      </main>
    </div>
  );
}