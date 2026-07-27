import { FiClock, FiAlertCircle, FiShield, FiUsers, FiFileText, FiTrendingUp } from 'react-icons/fi';

const features = [
  { icon: FiFileText, title: 'ACORD Form Parser', desc: 'Upload any COI – we auto-extract policy numbers & expiry dates.' },
  { icon: FiClock, title: 'Smart Alerts', desc: 'Get notified 30, 15, 7 days before expiry. Never miss a renewal.' },
  { icon: FiAlertCircle, title: 'Compliance Dashboard', desc: 'See all vendors with Red/Yellow/Green status based on expiry.' },
  { icon: FiShield, title: 'Risk Management', desc: 'Automatically flag expired or expiring policies to protect your business.' },
  { icon: FiUsers, title: 'Vendor Management', desc: 'Store all vendor details and insurance history in one place.' },
  { icon: FiTrendingUp, title: 'Audit Trail', desc: 'Track every alert sent and when policies were uploaded or renewed.' }
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 bg-gray-50/50">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">🛡️ Complete <span className="gradient-text">Compliance</span> Control</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">VigilSure automates the boring but critical task of tracking vendor insurance.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div key={i} className="card-hover p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4"><f.icon className="w-6 h-6 text-primary" /></div>
            <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
