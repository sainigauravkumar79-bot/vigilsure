import { useState } from 'react';

export default function ROICalculator() {
  const [vendors, setVendors] = useState(50);
  const [hoursPerVendor, setHoursPerVendor] = useState(1);
  const hourlyRate = 28;
  const monthlySavings = vendors * hoursPerVendor * hourlyRate;
  const yearlySavings = monthlySavings * 12;

  return (
    <section className="py-20 px-4 bg-gray-50/50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold">See How Much <span className="gradient-text">You Save</span></h2>
        <div className="card p-8 mt-8 text-left">
          <div className="space-y-6">
            <div><label className="block text-sm font-medium">Number of Vendors</label><input type="range" min="10" max="500" value={vendors} onChange={e => setVendors(parseInt(e.target.value))} className="w-full" /><span className="text-sm">{vendors}</span></div>
            <div><label className="block text-sm font-medium">Hours spent per vendor (manual tracking)</label><input type="range" min="0.5" max="5" step="0.5" value={hoursPerVendor} onChange={e => setHoursPerVendor(parseFloat(e.target.value))} className="w-full" /><span className="text-sm">{hoursPerVendor}h</span></div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center"><div className="text-sm text-gray-500">Monthly Savings</div><div className="text-2xl font-bold text-primary">${monthlySavings.toFixed(0)}</div></div>
            <div className="bg-gray-50 p-4 rounded-lg text-center"><div className="text-sm text-gray-500">Yearly Savings</div><div className="text-2xl font-bold text-primary">${yearlySavings.toFixed(0)}</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
