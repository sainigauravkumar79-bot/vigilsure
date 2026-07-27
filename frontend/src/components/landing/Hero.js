import Link from 'next/link';
import { FiUpload } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 text-center relative">
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{duration:0.6}}>
        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">🛡️ Vendor Insurance Compliance</span>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
          Never Miss a Vendor <br /><span className="gradient-text">Insurance Expiry</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          VigilSure automatically extracts expiry dates from ACORD forms and alerts you 30, 15, 7 days before — protecting you from costly compliance gaps.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/auth/signup" className="btn-primary text-lg px-8 py-3.5 flex items-center gap-2">
            <FiUpload /> Start Free — 20 Credits
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
