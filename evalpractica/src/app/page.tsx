import Link from 'next/link';

export default function Home() {
  const reports = [
    {
      title: 'Ventas Diarias',
      description: 'Análisis de ingresos y tickets por día',
      icon: '📊',
      href: '/reports/sales-daily',
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Productos Estrella',
      description: 'Ranking por unidades y revenue',
      icon: '⭐',
      href: '/reports/top-products',
      color: 'from-yellow-500 to-amber-600'
    },
    {
      title: 'Valor del Cliente',
      description: 'Clientes frecuentes y gasto promedio',
      icon: '👥',
      href: '/reports/customer-value',
      color: 'from-purple-500 to-violet-600'
    },
    {
      title: 'Alerta de Inventario',
      description: 'Productos con stock bajo o agotado',
      icon: '⚠️',
      href: '/reports/inventory-risk',
      color: 'from-red-500 to-rose-600'
    },
    {
      title: 'Mezcla de Pagos',
      description: 'Preferencias de pago de clientes',
      icon: '💳',
      href: '/reports/payment-mix',
      color: 'from-blue-500 to-indigo-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">☕ Cafetería Analytics</h1>
              <p className="mt-1 text-sm text-gray-600">Sistema de reportes y análisis de negocio</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                ✓ Sistema Activo
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Panel de Reportes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Accede a insights detallados sobre ventas, inventario, clientes y más
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report, index) => (
            <Link
              key={index}
              href={report.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${report.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{report.icon}</div>
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${report.color}`} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {report.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {report.description}
                </p>
                
                <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-gray-900 transition-colors">
                  Ver reporte
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reportes</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{reports.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                📈
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Última Actualización</p>
                <p className="text-xl font-bold text-gray-900 mt-1">Tiempo Real</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                🔄
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Estado DB</p>
                <p className="text-xl font-bold text-green-600 mt-1">Conectada</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                🗄️
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            © 2026 Cafetería Analytics - Sistema de Reportes Empresariales
          </p>
        </div>
      </footer>
    </div>
  );
}