import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import PricingPreview from '@/components/PricingPreview'

export const metadata: Metadata = {
  title: 'Pricing — VetGuard.io',
  description: 'Simple, transparent pricing for veterinary billing audits. Start with a free 2-week trial.',
}

const faqs = [
  {
    q: 'What counts as an audit?',
    a: 'One audit is a single SOAP note compared against its invoice line items. Most clinics run 50–150 audits per day.',
  },
  {
    q: 'Do I need a credit card for the free trial?',
    a: 'No. The 2-week trial includes full functionality with no payment required upfront.',
  },
  {
    q: 'What if I don\'t find enough missed charges?',
    a: 'We offer a money-back guarantee. If you don\'t find at least $500 in missed charges during your trial, we\'ll refund any payment.',
  },
  {
    q: 'Can I switch plans later?',
    a: 'Yes. Upgrade or downgrade anytime as your clinic count or audit volume changes.',
  },
  {
    q: 'Do you offer annual billing?',
    a: 'Yes. Annual plans save 15%. Contact us for a custom quote.',
  },
]

export default function PricingPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-blue-950/40 to-gray-950 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pricing</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Start free, pay only when you see results. Most clinics recover 10–25× their subscription cost.
          </p>
        </div>
      </section>

      <PricingPreview />

      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-3">Enterprise</h2>
              <p className="text-gray-400 max-w-xl">
                For hospital groups, MSOs, and practices with 10+ locations. Custom audit volume,
                dedicated support, SSO, and custom integrations.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shrink-0"
            >
              Contact sales
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-20 md:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently asked questions</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="font-bold text-gray-100 mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything included</h2>
          <p className="text-gray-400 mb-10">All plans include the core VetGuard.io platform.</p>
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            {[
              'SOAP note analysis',
              'Confidence scoring',
              'ezyVet & Cornerstone support',
              'Manual paste for any PIMS',
              'Multi-clinic dashboard',
              'Encrypted data storage',
              'Email support',
              'Money-back guarantee',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
