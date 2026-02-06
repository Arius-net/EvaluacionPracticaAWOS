import { query } from '@/lib/db';
import Link from 'next/link';

export default async function TopProducts({ searchParams }: { searchParams: Promise<any> }) {
  const params = await searchParams;
  const search = params.search || '';
  
  const { rows } = await query(
    "SELECT * FROM vw_top_products_ranked WHERE name ILIKE $1 ORDER BY ranking ASC",
    [`%${search}%`]
  );

  const topProduct = rows[0];
  const totalRevenue = rows.reduce((acc, curr) => acc + Number(curr.revenue), 0);
  const totalUnits = rows.reduce((acc, curr) => acc + Number(curr.units_sold), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50">
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
                  ⭐ Productos Estrella
                </h1>
                <p className="text-sm text-gray-600">Ranking por unidades vendidas y revenue</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
          <form className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="🔍 Buscar productos..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-lg hover:from-yellow-600 hover:to-amber-700 transition-all shadow-md hover:shadow-lg font-medium"
            >
              Buscar
            </button>
          </form>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <p className="text-yellow-100 text-sm font-medium">Producto #1</p>
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                🏆
              </div>
            </div>
            <p className="text-2xl font-bold break-words">{topProduct?.name || 'N/A'}</p>
            <p className="text-yellow-100 text-sm mt-2">
              {topProduct ? `${topProduct.units_sold} unidades vendidas` : 'Sin datos'}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm font-medium">Revenue Total</p>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                💵
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
            <p className="text-gray-500 text-sm mt-2">De todos los productos</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm font-medium">Total Unidades</p>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                📦
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900">{totalUnits}</p>
            <p className="text-gray-500 text-sm mt-2">Unidades vendidas</p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rows.map((r, i) => {
            const getMedalEmoji = (rank: number) => {
              if (rank === 1) return '🥇';
              if (rank === 2) return '🥈';
              if (rank === 3) return '🥉';
              return '📊';
            };

            return (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-1"
              >
                <div className={`h-2 ${r.ranking <= 3 ? 'bg-gradient-to-r from-yellow-400 to-amber-500' : 'bg-gray-200'}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{getMedalEmoji(r.ranking)}</span>
                      <div>
                        <span className="text-xs font-semibold text-gray-500 uppercase">Ranking</span>
                        <p className="text-2xl font-bold text-gray-900">#{r.ranking}</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2 min-h-[3.5rem]">
                    {r.name}
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm text-gray-600 font-medium">Revenue</span>
                      <span className="text-lg font-bold text-green-600">${Number(r.revenue).toFixed(2)}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm text-gray-600 font-medium">Unidades</span>
                      <span className="text-lg font-bold text-blue-600">{r.units_sold}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm text-gray-600 font-medium">Precio Prom.</span>
                      <span className="text-lg font-bold text-purple-600">
                        ${(Number(r.revenue) / Number(r.units_sold)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {rows.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">No se encontraron productos</p>
            <p className="text-gray-400 text-sm mt-2">Intenta con otra búsqueda</p>
          </div>
        )}
      </main>
    </div>
  );
}