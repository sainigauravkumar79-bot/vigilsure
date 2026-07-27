import { FiLink, FiMail, FiSlack, FiDatabase } from 'react-icons/fi';

export default function Integrations() {
  return (
    <section id="integrations" className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Integrations</h2>
        <p className="mt-4 text-gray-600">Connect VigilSure with your existing tools.</p>
        <div className="flex flex-wrap justify-center gap-8 mt-8 text-gray-700">
          <span className="flex items-center gap-2"><FiMail className="text-primary" /> Email</span>
          <span className="flex items-center gap-2"><FiSlack className="text-primary" /> Slack</span>
          <span className="flex items-center gap-2"><FiLink className="text-primary" /> Webhooks</span>
          <span className="flex items-center gap-2"><FiDatabase className="text-primary" /> Zapier</span>
        </div>
      </div>
    </section>
  );
}
