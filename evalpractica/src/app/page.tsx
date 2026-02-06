import Link from 'next/link';

// Definición de los reportes basados en las 5 VIEWS obligatorias
const reports = [
  {
    id: 1,
    title: 'Ventas Diarias',
    description: 'Análisis de ingresos y tickets promedio. (VIEW: vw_sales_daily)',
    path: '/reports/sales-daily',
    icon: '💰',
    color: 'border-green-500'
  },
  {
    id: 2,
    title: 'Top Productos',
    description: 'Ranking de los productos más vendidos por ingresos. (VIEW: vw_top_products_ranked)',
    path: '/reports/top-products',
    icon: '⭐',
    color: 'border-yellow-500'
  },
  {
    id: 3,
    title: 'Riesgo de Inventario',
    description: 'Productos con stock crítico y alerta de reabastecimiento. (VIEW: vw_inventory_risk)',
    path: '/reports/inventory-risk',
    icon: '⚠️',
    color: 'border-red-500'
  },
  {
    id: 4,
    title: 'Valor del Cliente',
    description: 'Frecuencia de compra y ticket promedio por cliente. (VIEW: vw_customer_value)',
    path: '/reports/customer-value',
    icon: '👥',
    color: 'border-purple-500'
  },
  {
    id: 5,
    title: 'Mezcla de Pagos',
    description: 'Distribución porcentual por método de pago. (VIEW: vw_payment_mix)',
    path: '/reports/payment-mix',
    icon: '💳',
    color: 'border-blue-500'
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      {/* Encabezado del Proyecto */}
      <header className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Cafetería Campus - Panel de Analítica
        </h1>
        <p className="text-lg text-gray-600">
          Evaluación Integradora: Next.js + PostgreSQL + Docker
        </p>
      </header>

      {/* Grid de Reportes */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reports.map((report) => (
          <Link 
            key={report.id} 
            href={report.path}
            target="_blank"
            rel="noopener noreferrer"
            className={`group block p-6 bg-white rounded-xl shadow-md border-t-4 ${report.color} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">{report.icon}</span>
              <span className="text-blue-500 font-bold group-hover:translate-x-1 transition-transform">
                Ir al reporte →
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {report.title}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              {report.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Pie de página con créditos (Opcional) */}
      <footer className="mt-20 text-center text-gray-400 text-sm">
        <p>Proyecto Integrador - Ingeniería en Software 5to Cuatrimestre</p>
      </footer>
    </main>
  );
}