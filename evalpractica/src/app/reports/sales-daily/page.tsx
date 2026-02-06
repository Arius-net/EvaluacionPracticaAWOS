import { query } from '@/lib/db';
import { z } from 'zod';
import Link from 'next/link';

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
  const totalTickets = rows.reduce((acc, curr) => acc + Number(curr.tickets), 0);
  const avgTicket = totalTickets > 0 ? total / totalTickets : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
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
                  📊 Ventas Diarias
                </h1>
                <p className="text-sm text-gray-600">Análisis de ingresos y tickets por día</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
          <form className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha Desde
              </label>
              <input
                type="date"
                name="date_from"
                defaultValue={date_from}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha Hasta
              </label>
              <input
                type="date"
                name="date_to"
                defaultValue={date_to}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg font-medium"
            >
              Filtrar
            </button>
          </form>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <p className="text-green-100 text-sm font-medium">Ingreso Total</p>
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                💰
              </div>
            </div>
            <p className="text-4xl font-bold">${total.toFixed(2)}</p>
            <p className="text-green-100 text-sm mt-2">En el período seleccionado</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm font-medium">Total Tickets</p>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                🎫
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900">{totalTickets}</p>
            <p className="text-gray-500 text-sm mt-2">Transacciones realizadas</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm font-medium">Ticket Promedio</p>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                📈
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900">${avgTicket.toFixed(2)}</p>
            <p className="text-gray-500 text-sm mt-2">Por transacción</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Total Ventas
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Tickets
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Ticket Prom.
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rows.map((r, i) => {
                  const ticketAvg = r.tickets > 0 ? Number(r.total_ventas) / Number(r.tickets) : 0;
                  return (
                    <tr key={i} className="hover:bg-green-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">📅</span>
                          <span className="text-sm font-medium text-gray-900">
                            {new Date(r.fecha).toLocaleDateString('es-ES', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="text-lg font-bold text-green-600">
                          ${Number(r.total_ventas).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {r.tickets}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="text-sm font-medium text-gray-900">
                          ${ticketAvg.toFixed(2)}
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
              <p className="text-gray-500 text-lg">No hay datos para el período seleccionado</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}