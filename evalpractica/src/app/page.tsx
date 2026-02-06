import Link from 'next/link';

const reports = [
  { id: 1, title: 'Ventas Diarias', path: '/reports/sales-daily', icon: '💰', desc: 'Ingresos y tickets por día[cite: 17].' },
  { id: 2, title: 'Top Productos', path: '/reports/top-products', icon: '⭐', desc: 'Ranking por revenue[cite: 19].' },
  { id: 3, title: 'Riesgo Inventario', path: '/reports/inventory-risk', icon: '⚠️', desc: 'Stock crítico[cite: 25].' },
  { id: 4, title: 'Valor Cliente', path: '/reports/customer-value', icon: '👥', desc: 'Gasto promedio[cite: 27].' },
  { id: 5, title: 'Mezcla de Pagos', path: '/reports/payment-mix', icon: '💳', desc: 'Métodos más usados[cite: 31].' },
];

export default function Dashboard() {
  return (
    <main className="p-10 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-slate-800">Dashboard de Analítica - Cafetería [cite: 67]</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reports.map((r) => (
          <Link key={r.id} href={r.path} className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border border-slate-200">
            <span className="text-4xl">{r.icon}</span>
            <h2 className="text-xl font-semibold mt-4 text-slate-700">{r.title}</h2>
            <p className="text-slate-500 text-sm mt-2">{r.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}