import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-20 px-4 text-center bg-primary/5">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold">Ready to protect your business?</h2>
        <p className="mt-4 text-gray-600">Start free in minutes. No credit card required.</p>
        <Link href="/auth/signup" className="mt-6 btn-primary inline-block text-lg px-8 py-3">Get Started — Free</Link>
      </div>
    </section>
  );
}
