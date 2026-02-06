import { query } from '@/lib/db';

export default async function PaymentMix() {
  const { rows } = await query('SELECT * FROM vw_payment_mix');
  const topMethod = rows.sort((a, b) => b.porcentaje - a.porcentaje)[0];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Mezcla de Pagos</h1>
      <p className="text-gray-500 mb-4">Insight: Preferencias de pago de los clientes[cite: 6].</p>
      <div className="bg-indigo-100 p-4 rounded mb-6 text-indigo-800">
        <p className="text-sm">KPI: Método Preferido</p>
        <p className="text-2xl font-bold">{topMethod?.method} ({topMethod?.porcentaje}%)</p>
      </div>
      <table className="w-full border-collapse">
        <thead className="bg-gray-100"><tr><th>Método</th><th>Transacciones</th><th>Porcentaje</th></tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t"><td>{r.method}</td><td>{r.total_transacciones}</td><td>{r.porcentaje}%</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}