import Link from 'next/link'
import { Check } from 'lucide-react'

export default function PricingPreview() {
  const plans = [
    {
      name: 'Free trial',
      price: '$0',
      period: 'for 2 weeks',
      description: 'See what you can recover',
      features: ['Full functionality', 'No credit card required', 'Money-back guarantee'],
      cta: 'Schedule a demo',
      highlight: false
    },
    {
      name: 'Starter',
      price: '$200',
      period: 'per month',
      description: 'For 1–3 vet clinics',
      features: ['~2,000 audits/month', 'Multi-clinic support', 'Email support'],
      cta: 'Schedule a demo',
      highlight: true
    },
    {
      name: 'Professional',
      price: '$500',
      period: 'per month',
      description: 'For 3–10 vet clinics',
      features: ['~5,000 audits/month', 'API access', 'Priority support'],
      cta: 'Schedule a demo',
      highlight: false
    }
  ]

  return (
    <section id="pricing" className="bg-gray-950 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-xl text-gray-400">Start free, pay only if you find value</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-lg border p-8 transition ${
                plan.highlight
                  ? 'border-blue-600 bg-gray-900 shadow-xl shadow-black/40 scale-105'
                  : 'border-gray-800 bg-gray-900 hover:shadow-lg hover:shadow-black/30'
              }`}
            >
              {plan.highlight && (
                <div className="mb-4">
                  <span className="inline-block bg-blue-950 text-blue-400 text-xs font-bold px-3 py-1 rounded-full">
                    Most popular
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="text-gray-400 ml-2">{plan.period}</span>
              </div>

              <Link
                href="/contact"
                className={`w-full block py-3 rounded-lg font-semibold text-center mb-8 transition ${
                  plan.highlight
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-800 text-gray-100 hover:bg-gray-700'
                }`}
              >
                {plan.cta}
              </Link>

              <div className="space-y-4">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400">
          Money-back guarantee: if you don&apos;t find at least <span className="font-bold text-gray-200">$500 in missed charges</span>, we&apos;ll refund it.
        </p>
      </div>
    </section>
  )
}
