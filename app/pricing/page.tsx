import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import PricingPreview from '@/components/PricingPreview'

export const metadata: Metadata = {
  title: 'Pricing — VetGuard.io',
  description: 'Simple, transparent pricing for veterinary billing audits. Start with a free 2-week trial.',
  alternates: {
    canonical: 'https://vetguard.io/pricing',
  },
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

const pricingFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
}

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingFaqSchema) }}
      />
      <section className="bg-gradient-to-b from-blue-950/40 to-gray-950 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pricing</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Start free, pay only when you see results. Most clinics recover 10–25× their subscription cost.
          </p>

          {/* CITABLE BLUF Summary Block */}
          <div className="p-5 rounded-xl bg-blue-950/30 border border-blue-800/50 text-left text-sm md:text-base text-gray-300 max-w-3xl mx-auto shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 text-xs font-mono font-semibold bg-blue-900/80 text-blue-300 rounded border border-blue-700/50">
                BLUF Summary
              </span>
            </div>
            <p className="leading-relaxed">
              <strong className="text-white">Bottom line:</strong> <strong className="text-blue-400">VetGuard.io — AI Billing Audit for Vet Clinics:</strong> See what you can recover with a 2-week free trial ($0 upfront, full functionality, no credit card required, and a $500 money-back guarantee). Paid tiers start at $200/mo (Starter) and $500/mo (Professional), with custom Enterprise plans for MSOs and multi-location practices.
            </p>
          </div>
        </div>
      </section>

      <PricingPreview />

      {/* CITABLE Plan Comparison Table */}
      <section className="py-16 md:py-24 bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Plan Comparison &amp; Feature Matrix
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Compare plans side by side to find the right billing audit capacity for your veterinary organization.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/90 shadow-2xl">
            <table className="w-full text-left text-sm text-gray-300 border-collapse">
              <thead className="bg-gray-800 text-xs uppercase tracking-wider text-gray-200 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 font-semibold">Tier &amp; Details</th>
                  <th className="px-6 py-4 font-semibold">Monthly Price</th>
                  <th className="px-6 py-4 font-semibold">Practice Size</th>
                  <th className="px-6 py-4 font-semibold">Audit Capacity</th>
                  <th className="px-6 py-4 font-semibold">Integrations &amp; Access</th>
                  <th className="px-6 py-4 font-semibold">Guarantee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr className="hover:bg-gray-800/40">
                  <td className="px-6 py-4 font-bold text-white">Free Trial</td>
                  <td className="px-6 py-4 text-green-400 font-semibold">$0 (14 days)</td>
                  <td className="px-6 py-4 text-gray-300">Any clinic count</td>
                  <td className="px-6 py-4 text-gray-300">Full functionality</td>
                  <td className="px-6 py-4 text-gray-400">ezyVet, Cornerstone, Manual</td>
                  <td className="px-6 py-4 text-blue-400">Find $500 or refund</td>
                </tr>
                <tr className="hover:bg-gray-800/40 bg-blue-950/20">
                  <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
                    Starter
                    <span className="text-xs bg-blue-900 text-blue-300 px-2 py-0.5 rounded font-normal">Popular</span>
                  </td>
                  <td className="px-6 py-4 text-white font-semibold">$200 / month</td>
                  <td className="px-6 py-4 text-gray-300">1–3 clinics</td>
                  <td className="px-6 py-4 text-gray-300">~2,000 audits / mo</td>
                  <td className="px-6 py-4 text-gray-400">Multi-clinic dashboard &amp; Email support</td>
                  <td className="px-6 py-4 text-blue-400">Money-back guarantee</td>
                </tr>
                <tr className="hover:bg-gray-800/40">
                  <td className="px-6 py-4 font-bold text-white">Professional</td>
                  <td className="px-6 py-4 text-white font-semibold">$500 / month</td>
                  <td className="px-6 py-4 text-gray-300">3–10 clinics</td>
                  <td className="px-6 py-4 text-gray-300">~5,000 audits / mo</td>
                  <td className="px-6 py-4 text-gray-400">API access &amp; Priority support</td>
                  <td className="px-6 py-4 text-blue-400">Money-back guarantee</td>
                </tr>
                <tr className="hover:bg-gray-800/40">
                  <td className="px-6 py-4 font-bold text-white">Enterprise</td>
                  <td className="px-6 py-4 text-blue-400 font-semibold">Custom quote</td>
                  <td className="px-6 py-4 text-gray-300">10+ clinics / MSOs</td>
                  <td className="px-6 py-4 text-gray-300">Custom volume</td>
                  <td className="px-6 py-4 text-gray-400">SSO, Dedicated support, Custom API</td>
                  <td className="px-6 py-4 text-blue-400">Custom SLA</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <div className="inline-block px-2.5 py-0.5 text-xs font-mono font-semibold bg-blue-900/80 text-blue-300 rounded border border-blue-700/50 mb-3">
                Enterprise Blueprint
              </div>
              <h2 className="text-3xl font-bold mb-3">Enterprise</h2>
              <p className="text-gray-300 mb-2 leading-relaxed">
                <strong className="text-white">Bottom line:</strong> <strong className="text-blue-400">VetGuard.io — AI Billing Audit for Vet Clinics:</strong> For hospital groups, MSOs, and practices with 10+ locations.
              </p>
              <p className="text-gray-400 max-w-xl text-sm leading-relaxed">
                Custom audit volume, dedicated support, single sign-on (SSO), and custom PIMS integrations.
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
