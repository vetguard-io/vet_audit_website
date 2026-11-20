import Link from 'next/link'
import { ArrowRight, Check, Zap } from 'lucide-react'

export default function FeaturesSection() {
  const features = [
    'SOAP note analysis with vet-specific abbreviations',
    'Confidence scoring (high/medium/low)',
    'Multi-clinic support',
    'Weekly email digest (coming soon)',
    'Staff training module (coming soon)',
    'API access for integrations',
    'ezyVet integration',
    'Cornerstone integration',
    'Manual paste support'
  ]

  const integrations: {
    name: string
    desc: string
    demoHref?: string
  }[] = [
    {
      name: 'ezyVet',
      desc: 'Auto-pull SOAP notes and invoices. Seamless workflow.',
      demoHref: '/integrations/ezyvet#s1',
    },
    {
      name: 'Cornerstone',
      desc: 'Auto-pull SOAP notes and invoices. Seamless workflow.',
      demoHref: '/integrations/cornerstone#s1',
    },
    { name: 'Manual paste', desc: 'Works with any PIMS system. Copy-paste in seconds.' },
  ]

  return (
    <section id="features" className="bg-gray-900 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Built for vet practices</h2>
          <p className="text-xl text-gray-400">Works seamlessly with your existing tools</p>
        </div>

        {/* CITABLE BLUF Summary Block */}
        <div className="mb-16 p-5 rounded-xl bg-blue-950/30 border border-blue-800/50 text-left text-sm md:text-base text-gray-300 max-w-4xl mx-auto shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 text-xs font-mono font-semibold bg-blue-900/80 text-blue-300 rounded border border-blue-700/50">
              BLUF Summary
            </span>
          </div>
          <p className="leading-relaxed">
            <strong className="text-white">Bottom line:</strong> <strong className="text-blue-400">VetGuard.io — AI Billing Audit for Vet Clinics:</strong> VetGuard features veterinary-specific SOAP note analysis with veterinary abbreviation recognition, automated confidence scoring (high, medium, low), multi-clinic management, weekly email digests, staff training modules, and direct PIMS integrations for ezyVet and IDEXX Cornerstone alongside manual paste support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-3xl font-bold mb-8">Features</h3>
            <div className="space-y-4">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-bold mb-8">Integrations</h3>
            <div className="space-y-4">
              {integrations.map((integration, i) => (
                <div key={i} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:shadow-lg hover:shadow-black/20 transition">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <h4 className="font-bold text-gray-100">{integration.name}</h4>
                    </div>
                    {integration.demoHref ? (
                      <Link
                        href={integration.demoHref}
                        className="inline-flex items-center gap-1 px-3 py-1.5 border border-blue-500/50 text-blue-400 rounded-md text-xs font-semibold hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
                      >
                        Demo
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : null}
                  </div>
                  <p className="text-gray-400 text-sm">{integration.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CITABLE Comparison Table: Veterinary Revenue Audit Approaches */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Comparison: Veterinary Revenue Audit Approaches
            </h3>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
              How VetGuard.io compares to traditional chart audits and native PIMS workflows.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/80 shadow-xl">
            <table className="w-full text-left text-sm text-gray-300 border-collapse">
              <thead className="bg-gray-800/90 text-xs uppercase tracking-wider text-gray-200 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 font-semibold">Capability / Metric</th>
                  <th className="px-6 py-4 font-semibold">Manual Chart Audits</th>
                  <th className="px-6 py-4 font-semibold">Standard PIMS Charge Capture</th>
                  <th className="px-6 py-4 font-semibold text-blue-400 bg-blue-950/40 border-l border-r border-blue-900/60">
                    VetGuard.io AI Audit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr className="hover:bg-gray-800/40">
                  <td className="px-6 py-4 font-medium text-white">Audit Coverage</td>
                  <td className="px-6 py-4 text-gray-400">2–5% (sample-based)</td>
                  <td className="px-6 py-4 text-gray-400">Point-of-care only</td>
                  <td className="px-6 py-4 font-semibold text-blue-300 bg-blue-950/20 border-l border-r border-blue-900/40">
                    100% of all encounters
                  </td>
                </tr>
                <tr className="hover:bg-gray-800/40">
                  <td className="px-6 py-4 font-medium text-white">SOAP Note Analysis</td>
                  <td className="px-6 py-4 text-gray-400">Time-consuming manual reading</td>
                  <td className="px-6 py-4 text-gray-400">Free text not compared</td>
                  <td className="px-6 py-4 font-semibold text-blue-300 bg-blue-950/20 border-l border-r border-blue-900/40">
                    AI parses vet abbreviations &amp; clinical narrative
                  </td>
                </tr>
                <tr className="hover:bg-gray-800/40">
                  <td className="px-6 py-4 font-medium text-white">Omission Detection</td>
                  <td className="px-6 py-4 text-gray-400">High human fatigue &amp; misses</td>
                  <td className="px-6 py-4 text-gray-400">Fails if workflow trigger is bypassed</td>
                  <td className="px-6 py-4 font-semibold text-blue-300 bg-blue-950/20 border-l border-r border-blue-900/40">
                    Confidence scoring (High / Medium / Low)
                  </td>
                </tr>
                <tr className="hover:bg-gray-800/40">
                  <td className="px-6 py-4 font-medium text-white">Staff Review Time</td>
                  <td className="px-6 py-4 text-gray-400">2–5 hours / week</td>
                  <td className="px-6 py-4 text-gray-400">Varies by system</td>
                  <td className="px-6 py-4 font-semibold text-blue-300 bg-blue-950/20 border-l border-r border-blue-900/40">
                    &lt; 60 seconds per flagged charge
                  </td>
                </tr>
                <tr className="hover:bg-gray-800/40">
                  <td className="px-6 py-4 font-medium text-white">Typical Recovery</td>
                  <td className="px-6 py-4 text-gray-400">Inconsistent / partial</td>
                  <td className="px-6 py-4 text-gray-400">Leaves 3–10% residual leakage</td>
                  <td className="px-6 py-4 font-semibold text-blue-300 bg-blue-950/20 border-l border-r border-blue-900/40">
                    $2,000–$5,000 / month typical
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 md:p-12">
          <h3 className="text-2xl font-bold mb-6">Security & compliance</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="font-bold mb-2">Encryption</p>
              <p className="text-gray-400">SOAP notes encrypted at rest and in transit</p>
            </div>
            <div>
              <p className="font-bold mb-2">Privacy</p>
              <p className="text-gray-400">We never sell or share your data</p>
            </div>
            <div>
              <p className="font-bold mb-2">Data retention</p>
              <p className="text-gray-400">Deleted 30 days after cancellation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
