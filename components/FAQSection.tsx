export default function FAQSection() {
  const faqs = [
    {
      question: 'What is VetGuard and why does it matter?',
      answer:
        'VetGuard is an AI-powered billing audit platform for veterinary clinics. Vet clinics lose an estimated 10–15% of revenue from unbilled services and procedures. VetGuard reads your clinical SOAP notes, understands vet-specific terminology and abbreviations, and automatically flags missing line items on patient invoices.',
    },
    {
      question: 'How does VetGuard audit veterinary records?',
      answer:
        'VetGuard works in three simple steps: 1) Auto-pull or paste SOAP notes and invoice line items from your PIMS, 2) AI audits the notes against charged items with confidence scoring (high, medium, low), and 3) Staff reviews flagged charges and adds them to client invoices in under 60 seconds.',
    },
    {
      question: 'Which Practice Management Information Systems (PIMS) does VetGuard integrate with?',
      answer:
        'VetGuard features direct integrations with ezyVet and IDEXX Cornerstone, along with manual paste support that works with any veterinary practice management software.',
    },
    {
      question: 'How much does VetGuard cost?',
      answer:
        'VetGuard offers a 2-week free trial with full functionality and no credit card required. Paid plans start at $200/month for Starter (1–3 clinics, ~2,000 audits/month) and $500/month for Professional (3–10 clinics, ~5,000 audits/month).',
    },
  ]

  return (
    <section id="faq" className="bg-gray-900/60 py-20 md:py-32 border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-400 font-semibold text-sm tracking-wider uppercase mb-2 block">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about how VetGuard integrates, audits SOAP notes, and recovers revenue.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 md:p-8 hover:border-gray-700 transition"
            >
              <h3 className="text-xl font-semibold text-gray-100 mb-3">{faq.question}</h3>
              <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
