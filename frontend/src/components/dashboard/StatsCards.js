export default function StatsCards({ stats }) {
  const cards = [
    { label: 'Total Vendors', value: stats.totalVendors, color: 'text-primary' },
    { label: 'Active Insurances', value: stats.activeInsurances, color: 'text-green-500' },
    { label: 'Expired', value: stats.expiredInsurances, color: 'text-red-500' },
    { label: 'Expiring Soon (7 days)', value: stats.expiringSoon, color: 'text-yellow-500' }
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((c, i) => (
        <div key={i} className="card p-4 text-center">
          <div className="text-sm text-gray-500">{c.label}</div>
          <div className={`text-2xl font-bold ${c.color}`}>{c.value}</div>
        </div>
      ))}
    </div>
  );
}
