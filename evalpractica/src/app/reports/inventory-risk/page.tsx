import { query } from '@/lib/db';
import Link from 'next/link';

export default async function InventoryRisk() {
  const { rows } = await query('SELECT * FROM vw_inventory_risk ORDER BY stock ASC');
  
  const agotado = rows.filter(r => r.estatus_riesgo === 'Agotado').length;
  const bajo = rows.filter(r => r.estatus_riesgo === 'Bajo').length;
  const medio = rows.filter(r => r.estatus_riesgo === 'Medio').length;
  const optimo = rows.filter(r => r.estatus_riesgo === 'Óptimo').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Agotado': return 'bg-red-100 text-red-800 border-red-200';
      case 'Bajo': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medio': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Óptimo': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Agotado': return '🔴';
      case 'Bajo': return '🟠';
      case 'Medio': return '🟡';
      case 'Óptimo': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-50">
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
                <h1 className="text-2xl font-bold text-red-600 flex items-center gap-2">
                  ⚠️ Alerta de Inventario
                </h1>
                <p className="text-sm text-gray-600">Identificación de productos con stock bajo o agotado</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alert Banner */}
        {agotado > 0 && (
          <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">
                  ⚠️ ¡ATENCIÓN! Hay {agotado} producto{agotado !== 1 ? 's' : ''} agotado{agotado !== 1 ? 's' : ''}. Se requiere reabastecimiento urgente.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm font-medium">Agotados</p>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                🔴
              </div>
            </div>
            <p className="text-4xl font-bold text-red-600">{agotado}</p>
            <p className="text-gray-500 text-sm mt-2">Stock = 0</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm font-medium">Stock Bajo</p>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                🟠
              </div>
            </div>
            <p className="text-4xl font-bold text-orange-600">{bajo}</p>
            <p className="text-gray-500 text-sm mt-2">Stock 1-5</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm font-medium">Stock Medio</p>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                🟡
              </div>
            </div>
            <p className="text-4xl font-bold text-yellow-600">{medio}</p>
            <p className="text-gray-500 text-sm mt-2">Stock 6-10</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm font-medium">Stock Óptimo</p>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                🟢
              </div>
            </div>
            <p className="text-4xl font-bold text-green-600">{optimo}</p>
            <p className="text-gray-500 text-sm mt-2">Stock &gt; 10</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Distribución de Inventario</h3>
          <div className="flex h-8 rounded-lg overflow-hidden">
            {agotado > 0 && (
              <div 
                className="bg-red-500 flex items-center justify-center text-white text-xs font-bold"
                style={{ width: `${(agotado / rows.length) * 100}%` }}
              >
                {agotado}
              </div>
            )}
            {bajo > 0 && (
              <div 
                className="bg-orange-500 flex items-center justify-center text-white text-xs font-bold"
                style={{ width: `${(bajo / rows.length) * 100}%` }}
              >
                {bajo}
              </div>
            )}
            {medio > 0 && (
              <div 
                className="bg-yellow-500 flex items-center justify-center text-white text-xs font-bold"
                style={{ width: `${(medio / rows.length) * 100}%` }}
              >
                {medio}
              </div>
            )}
            {optimo > 0 && (
              <div 
                className="bg-green-500 flex items-center justify-center text-white text-xs font-bold"
                style={{ width: `${(optimo / rows.length) * 100}%` }}
              >
                {optimo}
              </div>
            )}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>Total: {rows.length} productos</span>
            <span>Críticos: {agotado + bajo} productos</span>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Stock Actual
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Estatus de Riesgo
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Acción Recomendada
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rows.map((r, i) => {
                  const getAction = (status: string) => {
                    switch (status) {
                      case 'Agotado': return { text: 'URGENTE: Reabastecer ahora', icon: '🚨' };
                      case 'Bajo': return { text: 'Reabastecer pronto', icon: '⚡' };
                      case 'Medio': return { text: 'Monitorear', icon: '👁️' };
                      case 'Óptimo': return { text: 'Sin acción requerida', icon: '✅' };
                      default: return { text: 'Revisar', icon: '🔍' };
                    }
                  };

                  const action = getAction(r.estatus_riesgo);

                  return (
                    <tr key={i} className={`hover:bg-gray-50 transition-colors ${r.estatus_riesgo === 'Agotado' ? 'bg-red-50' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-3xl">{getStatusIcon(r.estatus_riesgo)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex items-center justify-center">
                            📦
                          </div>
                          <span className="text-sm font-medium text-gray-900">{r.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 border-4 border-gray-200">
                          <span className="text-2xl font-bold text-gray-900">{r.stock}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold border-2 ${getStatusColor(r.estatus_riesgo)}`}>
                          {r.estatus_riesgo}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-2xl">{action.icon}</span>
                          <span className="text-xs font-medium text-gray-700">{action.text}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {rows.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No hay productos en inventario</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}