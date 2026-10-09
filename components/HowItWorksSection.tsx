export default function HowItWorksSection() {
  const steps = [
    {
      num: '1',
      title: 'Paste your data',
      description: 'Copy SOAP notes and invoice line items from your PIMS (ezyVet, Cornerstone, or manual)'
    },
    {
      num: '2',
      title: 'Run the audit',
      description: 'AI analyzes the notes and compares against what was charged'
    },
    {
      num: '3',
      title: 'Add to invoices',
      description: 'Review flagged charges and add them to invoices in 60 seconds'
    }
  ]

  return (
    <section id="how-it-works" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How VetGuard.io works</h2>
          <p className="text-xl text-gray-400">Three simple steps to recover missed revenue</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gray-700 -z-10"></div>
              )}
              
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-blue-950 border-4 border-blue-600 flex items-center justify-center">
                    <span className="text-3xl font-bold text-blue-500">{step.num}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-950/60 to-blue-900/40 border border-blue-800 rounded-lg p-8 md:p-12 text-center">
          <p className="text-lg text-gray-300 mb-2">
            Most clinics recover <span className="font-bold text-blue-500">$2–5K in missed charges</span> in their first 2 weeks.
          </p>
          <p className="text-gray-400">
            That&apos;s <span className="font-bold text-gray-200">$24–60K annually</span> for just <span className="font-bold text-gray-200">$200/month</span>. ROI: <span className="text-blue-500 font-bold">10–25×</span>
          </p>
        </div>
      </div>
    </section>
  )
}
