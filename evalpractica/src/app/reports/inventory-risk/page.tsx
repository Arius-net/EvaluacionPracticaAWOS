import { query } from '@/lib/db';

export default async function InventoryRisk() {
  const { rows } = await query('SELECT * FROM vw_inventory_risk');
  const critical = rows.filter(r => r.estatus_riesgo === 'Agotado').length;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-red-600">Alerta de Inventario</h1>
      <p className="text-gray-500 mb-4">Insight: Identificación de productos con stock bajo[cite: 6].</p>
      <div className="bg-red-50 p-4 rounded mb-6">
        <p className="text-sm">KPI: Productos Agotados</p>
        <p className="text-2xl font-bold text-red-700">{critical}</p>
      </div>
      <table className="w-full border-collapse">
        <thead className="bg-gray-100"><tr><th>Producto</th><th>Stock</th><th>Estatus</th></tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t"><td>{r.name}</td><td>{r.stock}</td><td className="font-bold">{r.estatus_riesgo}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}