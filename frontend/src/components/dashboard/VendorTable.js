export default function VendorTable({ vendors }) {
  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="border-b"><th className="p-3 text-left">Name</th><th className="p-3 text-left">Email</th><th className="p-3 text-left">Status</th></tr></thead>
        <tbody>
          {vendors.map(v => (
            <tr key={v._id} className="border-b"><td className="p-3">{v.name}</td><td className="p-3">{v.email}</td><td className="p-3"><span className={`px-2 py-1 rounded-full text-xs ${v.status === 'active' ? 'bg-green-500/20 text-green-700' : 'bg-red-500/20 text-red-700'}`}>{v.status}</span></td></tr>
          ))}
          {vendors.length === 0 && <tr><td colSpan="3" className="p-6 text-center text-gray-400">No vendors yet. Add one!</td></tr>}
        </tbody>
      </table>
    </div>
  );
          }
