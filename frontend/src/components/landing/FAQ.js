const faqs = [
  { q: 'How long does it take to set up?', a: 'You can start uploading COIs in under 5 minutes. No coding required.' },
  { q: 'Do I need a developer?', a: 'No, VigilSure is a point-and-click web app. Anyone can use it.' },
  { q: 'What file formats are supported?', a: 'PDF, JPG, PNG, and TIFF. We also support email forwarding.' },
  { q: 'Is my data secure?', a: 'Yes, we use enterprise-grade encryption and never share your data.' }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Frequently Asked <span className="gradient-text">Questions</span></h2>
        <div className="mt-8 space-y-4">
          {faqs.map((item, i) => (
            <div key={i} className="border-b border-gray-200/50 pb-4">
              <h4 className="font-semibold">{item.q}</h4>
              <p className="text-sm text-gray-600 mt-1">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
