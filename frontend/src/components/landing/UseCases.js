const cases = [
  { icon: '🏗️', title: 'Construction', desc: 'Track subcontractors\' insurance expiry for job sites.' },
  { icon: '🏢', title: 'Property Management', desc: 'Ensure all vendors have valid liability coverage.' },
  { icon: '🏥', title: 'Healthcare', desc: 'Maintain compliance for medical equipment suppliers.' },
  { icon: '🚚', title: 'Logistics', desc: 'Monitor carrier insurance expiration and avoid shipment delays.' }
];

export default function UseCases() {
  return (
    <section className="py-20 px-4 bg-gray-50/50">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Use <span className="gradient-text">Cases</span></h2>
        <p className="mt-4 text-gray-600">VigilSure fits any industry that works with external vendors.</p>
      </div>
      <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {cases.map((c, i) => (
          <div key={i} className="card-hover p-6 text-center">
            <div className="text-3xl mb-2">{c.icon}</div>
            <h3 className="font-semibold">{c.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
