import { FiShield, FiLock, FiCheckCircle } from 'react-icons/fi';

export default function Security() {
  return (
    <section id="security" className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Designed for <span className="gradient-text">Privacy</span></h2>
        <p className="mt-4 text-gray-600">Your documents and data are sensitive. We protect them.</p>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="card-hover p-6"><FiShield className="text-3xl text-primary mx-auto" /><h4 className="font-semibold mt-2">GDPR Compliant</h4><p className="text-sm text-gray-500">EU data protection standards.</p></div>
          <div className="card-hover p-6"><FiCheckCircle className="text-3xl text-primary mx-auto" /><h4 className="font-semibold mt-2">SOC 2 Type 2</h4><p className="text-sm text-gray-500">On track for 2026.</p></div>
          <div className="card-hover p-6"><FiLock className="text-3xl text-primary mx-auto" /><h4 className="font-semibold mt-2">Encryption</h4><p className="text-sm text-gray-500">TLS 1.2+ in transit, AES‑256 at rest.</p></div>
        </div>
      </div>
    </section>
  );
    }
