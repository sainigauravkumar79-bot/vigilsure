import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200/60 bg-white/80 mt-16 py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold text-lg">🛡️ VigilSure</div>
          <p className="text-sm text-gray-500 mt-2">Vendor insurance expiry tracker.</p>
        </div>
        <div><h4 className="font-semibold mb-2">Product</h4><ul className="text-sm text-gray-500 space-y-1"><li><a href="/#features" className="hover:text-primary">Features</a></li><li><a href="/#pricing" className="hover:text-primary">Pricing</a></li></ul></div>
        <div><h4 className="font-semibold mb-2">Resources</h4><ul className="text-sm text-gray-500 space-y-1"><li><a href="/#faq" className="hover:text-primary">FAQ</a></li><li><a href="/#security" className="hover:text-primary">Security</a></li></ul></div>
        <div><h4 className="font-semibold mb-2">Legal</h4><ul className="text-sm text-gray-500 space-y-1"><li><a href="#" className="hover:text-primary">Privacy</a></li><li><a href="#" className="hover:text-primary">Terms</a></li></ul></div>
      </div>
      <div className="text-center text-xs text-gray-400 mt-8 border-t border-gray-200/40 pt-4">© 2026 VigilSure. All rights reserved.</div>
    </footer>
  );
    }
