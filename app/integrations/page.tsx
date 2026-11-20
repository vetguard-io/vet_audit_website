import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ChevronRight, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Integrations — ezyVet & Cornerstone | VetGuard.io',
  description:
    'Choose your practice management system. VetGuard integrates with ezyVet and IDEXX Cornerstone to automatically audit SOAP notes against invoices.',
  alternates: {
    canonical: 'https://vetguard.io/integrations',
  },
}

const integrations = [
  {
    name: 'ezyVet',
    href: '/integrations/ezyvet',
    badge: 'Real-time webhooks',
    desc: 'Consults are audited seconds after they are saved, using ezyVet’s REST API and webhooks with a 5-minute polling safety net.',
  },
  {
    name: 'IDEXX Cornerstone',
    href: '/integrations/cornerstone',
    badge: '5-minute auto-pull',
    desc: 'VetGuard polls Cornerstone Hub every 5 minutes, pulling SOAP notes and invoices into automatic revenue audits.',
  },
]

export default function IntegrationsPage() {
  return (
    <section className="bg-gradient-to-b from-blue-950/40 via-gray-950 to-gray-950 pt-16 pb-20 md:pt-24 md:pb-28 min-h-[70vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-mono">
          <Link href="/" className="hover:text-gray-300 transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-blue-400">Integrations</span>
        </nav>

        <div className="max-w-3xl mb-8">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Choose your practice management system
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Pick your PIMS to see an interactive walkthrough of how VetGuard connects, audits, and
            recovers missed charges.
          </p>

          {/* Integrations Summary Block */}
          <div className="p-5 rounded-xl bg-blue-950/30 border border-blue-800/50 text-left text-sm md:text-base text-gray-300 shadow-lg">
            <p className="leading-relaxed">
              <strong className="text-blue-400">VetGuard.io PIMS Integrations:</strong> Pick your PIMS to see an interactive walkthrough of how VetGuard connects, audits, and recovers missed charges. Consults are audited seconds after they are saved using ezyVet&apos;s REST API and webhooks with a 5-minute polling safety net, and Cornerstone records are polled automatically every 5 minutes.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {integrations.map((i) => (
            <Link
              key={i.name}
              href={`${i.href}#s1`}
              className="group bg-gray-900 border border-gray-800 hover:border-blue-600 rounded-xl p-8 transition space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-950 border border-blue-800 text-blue-400">
                <Zap className="w-3.5 h-3.5" />
                <span>{i.badge}</span>
              </div>
              <h2 className="text-2xl font-bold text-white">{i.name}</h2>
              <p className="text-sm text-gray-400 leading-relaxed">{i.desc}</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 group-hover:text-blue-300">
                View the tour <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>

        {/* CITABLE Comparison Table: PIMS Integration Matrix */}
        <div className="mt-16">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              PIMS Integration Matrix &amp; Compatibility
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              Compare integration methods, audit frequency, and data sync specifications across supported veterinary software.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/80 shadow-xl">
            <table className="w-full text-left text-sm text-gray-300 border-collapse">
              <thead className="bg-gray-800/90 text-xs uppercase tracking-wider text-gray-200 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 font-semibold">Practice Management System</th>
                  <th className="px-6 py-4 font-semibold">Integration Type</th>
                  <th className="px-6 py-4 font-semibold">Audit Sync Frequency</th>
                  <th className="px-6 py-4 font-semibold">Data Audited</th>
                  <th className="px-6 py-4 font-semibold">Setup Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr className="hover:bg-gray-800/40">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    ezyVet
                  </td>
                  <td className="px-6 py-4 text-gray-300">REST API &amp; Webhooks</td>
                  <td className="px-6 py-4 text-gray-300">Real-time (seconds) + 5-min safety net</td>
                  <td className="px-6 py-4 text-gray-400">Consult notes &amp; invoice line items</td>
                  <td className="px-6 py-4 text-blue-400 font-semibold">~15 minutes</td>
                </tr>
                <tr className="hover:bg-gray-800/40">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    IDEXX Cornerstone
                  </td>
                  <td className="px-6 py-4 text-gray-300">Cornerstone Hub API</td>
                  <td className="px-6 py-4 text-gray-300">Automated 5-minute polling</td>
                  <td className="px-6 py-4 text-gray-400">SOAP notes &amp; patient billing lines</td>
                  <td className="px-6 py-4 text-blue-400 font-semibold">~15 minutes</td>
                </tr>
                <tr className="hover:bg-gray-800/40">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Universal (Any PIMS)
                  </td>
                  <td className="px-6 py-4 text-gray-300">Secure Copy &amp; Paste</td>
                  <td className="px-6 py-4 text-gray-300">On-demand (immediate)</td>
                  <td className="px-6 py-4 text-gray-400">Any text SOAP note &amp; invoice lines</td>
                  <td className="px-6 py-4 text-blue-400 font-semibold">Instant (0 min)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
