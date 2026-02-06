import { query } from '@/lib/db';
import Link from 'next/link';

export default async function PaymentMix() {
  const { rows } = await query('SELECT * FROM vw_payment_mix ORDER BY total_transacciones DESC');
  
  const totalTransactions = rows.reduce((acc, curr) => acc + Number(curr.total_transacciones), 0);
  const topMethod = rows[0];

  const getMethodIcon = (method: string) => {
    const methodLower = method.toLowerCase();
    if (methodLower.includes('efectivo') || methodLower.includes('cash')) return '💵';
    if (methodLower.includes('tarjeta') || methodLower.includes('card')) return '💳';
    if (methodLower.includes('transferencia') || methodLower.includes('transfer')) return '📱';
    if (methodLower.includes('cheque')) return '📝';
    return '💰';
  };

  const getMethodColor = (index: number) => {
    const colors = [
      'from-indigo-500 to-purple-600',
      'from-blue-500 to-cyan-600',
      'from-green-500 to-emerald-600',
      'from-yellow-500 to-amber-600',
      'from-red-500 to-rose-600',
      'from-pink-500 to-fuchsia-600'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
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
                  💳 Mezcla de Pagos
                </h1>
                <p className="text-sm text-gray-600">Preferencias de métodos de pago de los clientes</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <p className="text-indigo-100 text-sm font-medium">Método Preferido</p>
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                👑
              </div>
            </div>
            <p className="text-2xl font-bold">{topMethod?.method} ({topMethod?.porcentaje}%)</p>
            <p className="text-indigo-100 text-sm mt-2">
              {topMethod ? `${topMethod.porcentaje}% de transacciones` : 'Sin datos'}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm font-medium">Total Transacciones</p>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                🧾
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900">{totalTransactions}</p>
            <p className="text-gray-500 text-sm mt-2">Todas las formas de pago</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm font-medium">Métodos Activos</p>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                ✓
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900">{rows.length}</p>
            <p className="text-gray-500 text-sm mt-2">Métodos disponibles</p>
          </div>
        </div>

        {/* Pie Chart Visualization (Text-based) */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Distribución de Pagos</h3>
          <div className="max-w-3xl mx-auto">
            {rows.map((r, i) => (
              <div key={i} className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getMethodIcon(r.method)}</span>
                    <span className="text-sm font-medium text-gray-900">{r.method}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-700">{r.porcentaje}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getMethodColor(i)} transition-all duration-500 rounded-full flex items-center justify-end pr-2`}
                    style={{ width: `${r.porcentaje}%` }}
                  >
                    <span className="text-xs font-bold text-white drop-shadow">
                      {r.total_transacciones}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rows.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-1"
            >
              <div className={`h-2 bg-gradient-to-r ${getMethodColor(i)}`} />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{getMethodIcon(r.method)}</span>
                  <div className={`px-3 py-1 bg-gradient-to-r ${getMethodColor(i)} text-white rounded-full text-xs font-bold`}>
                    #{i + 1}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {r.method}
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm text-gray-600 font-medium">Transacciones</span>
                    <span className="text-xl font-bold text-blue-600">{r.total_transacciones}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm text-gray-600 font-medium">Porcentaje</span>
                    <span className="text-xl font-bold text-purple-600">{r.porcentaje}%</span>
                  </div>

                  {/* Mini progress bar */}
                  <div className="pt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-full bg-gradient-to-r ${getMethodColor(i)} rounded-full transition-all duration-500`}
                        style={{ width: `${r.porcentaje}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {rows.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">💳</div>
            <p className="text-gray-500 text-lg">No hay métodos de pago registrados</p>
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-lg font-bold mb-4">📊 Resumen de Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-indigo-100 text-sm">Método más usado</p>
              <p className="text-xl font-bold">{topMethod?.method}</p>
            </div>
            <div>
              <p className="text-indigo-100 text-sm">Representa</p>
              <p className="text-xl font-bold">{topMethod?.porcentaje}% del total</p>
            </div>
            <div>
              <p className="text-indigo-100 text-sm">Total transacciones</p>
              <p className="text-xl font-bold">{totalTransactions}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}