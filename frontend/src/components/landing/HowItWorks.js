import { FiUpload, FiCpu, FiDownload } from 'react-icons/fi';

const steps = [
  { icon: FiUpload, number: '01', title: 'Upload COI', desc: 'Vendor uploads their Certificate of Insurance (PDF or image).' },
  { icon: FiCpu, number: '02', title: 'Auto-Extract', desc: 'Our rules engine extracts policy number, expiry date, and limits.' },
  { icon: FiDownload, number: '03', title: 'Get Alerts', desc: 'You get reminders 30, 15, 7 days before expiry – automatically.' }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">How It <span className="gradient-text">Works</span></h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((s, i) => (
          <div key={i} className="text-center">
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">{s.number}</div>
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"><s.icon className="w-6 h-6 text-primary" /></div>
            <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
            <p className="text-gray-500 text-sm">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
