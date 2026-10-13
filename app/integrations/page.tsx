import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ChevronRight, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Integrations — ezyVet & Cornerstone | VetGuard.io',
  description:
    'Choose your practice management system. VetGuard integrates with ezyVet and IDEXX Cornerstone to automatically audit SOAP notes against invoices.',
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

        <div className="max-w-2xl mb-12">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Choose your practice management system
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Pick your PIMS to see an interactive walkthrough of how VetGuard connects, audits, and
            recovers missed charges.
          </p>
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
      </div>
    </section>
  )
}
