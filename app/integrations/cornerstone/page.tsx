import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, ExternalLink, Lock, RefreshCw, Server, Zap } from 'lucide-react'
import CornerstoneTour from '@/components/CornerstoneTour'

export const metadata: Metadata = {
  title: 'Cornerstone Integration Tour — Automated Billing Audit | VetGuard.io',
  description:
    'Explore how VetGuard integrates with IDEXX Cornerstone to auto-pull SOAP notes and invoices every 5 minutes and flag unbilled procedures. Recover missed charges with zero double-entry.',
  keywords:
    'cornerstone integration, idexx cornerstone, veterinary billing audit, cornerstone missed charges, veterinary practice management, soap note audit',
  alternates: {
    canonical: 'https://vetguard.io/integrations/cornerstone',
  },
}

export default function CornerstoneIntegrationPage() {
  const faqs = [
    {
      q: 'Does VetGuard require manual exports or spreadsheet uploads?',
      a: 'No. VetGuard connects to Cornerstone Hub’s REST API and auto-pulls new and changed visits every 5 minutes, including SOAP notes and itemized invoices. No file handling is needed.',
    },
    {
      q: 'Does VetGuard alter or add charges to patient invoices?',
      a: 'Never. VetGuard is read-only for Cornerstone. It surfaces discrepancies in the reconciliation workbench for staff review, and your team keeps final billing authority.',
    },
    {
      q: 'How is my Cornerstone API key protected?',
      a: 'The key is validated against Cornerstone Hub before saving, encrypted at rest with Fernet (AES-128), and never returned over the API. Only a masked 4-character hint is shown in settings.',
    },
    {
      q: 'How long does connection take?',
      a: 'Under a minute for an admin: enter the Hub URL and API key, and VetGuard immediately pulls and audits the last 30 days of visits.',
    },
    {
      q: 'What if a poll fails or Cornerstone Hub is slow?',
      a: 'Each poll overlaps the previous window by 10 minutes, every visit is processed in its own transaction, and requests back off exponentially on HTTP 429 or network errors, so nothing is lost.',
    },
  ]

  const cards = [
    {
      icon: Lock,
      title: 'Read-Only Access',
      body: 'VetGuard only needs read scopes for visits, SOAP notes, invoices, and patients. Staff keep 100% control over billing entries.',
    },
    {
      icon: RefreshCw,
      title: '5-Minute Auto-Pull',
      body: 'A background worker polls Cornerstone Hub every 5 minutes with a 10-minute overlap, or on demand with "Sync now".',
    },
    {
      icon: Server,
      title: 'Isolated & Resilient',
      body: 'Per-visit transactions and exponential backoff mean one bad record or a slow Hub never blocks the rest.',
    },
  ]

  return (
    <>
      <section className="bg-gradient-to-b from-blue-950/40 via-gray-950 to-gray-950 pt-16 pb-12 md:pt-24 md:pb-16 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-mono">
            <Link href="/" className="hover:text-gray-300 transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/integrations" className="hover:text-gray-300 transition">
              Integrations
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-blue-400">Cornerstone</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-950 border border-blue-800 text-blue-400 mb-4">
              <Zap className="w-3.5 h-3.5" />
              <span>IDEXX Cornerstone Integration Workflow</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              Auto-pull SOAP notes and invoices into real-time revenue audits
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              A complete walkthrough of how VetGuard connects to IDEXX Cornerstone Hub, pulls
              clinical SOAP records and itemized invoices every 5 minutes, extracts missed
              procedures with clinical NLP, and reconciles billing seamlessly.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Link
                href="/contact"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Schedule a Demo
              </Link>
              <a
                href="/demos/cornerstone-tour.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg font-semibold hover:bg-gray-700 transition"
              >
                <span>Full-screen demo mode</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </a>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <div className="text-2xl md:text-3xl font-bold font-mono text-white">5 min</div>
              <div className="text-xs text-gray-400 mt-1">Automated polling interval</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold font-mono text-white">0 sec</div>
              <div className="text-xs text-gray-400 mt-1">Clinic time on manual uploads</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold font-mono text-white">S·O·A·P</div>
              <div className="text-xs text-gray-400 mt-1">Structured note extraction</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold font-mono text-white">AES-128</div>
              <div className="text-xs text-gray-400 mt-1">Encrypted credential storage</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-800 bg-gray-950">
        <CornerstoneTour />
      </section>

      <section className="py-20 md:py-28 bg-gray-900 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400">
              Technical Architecture
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Built for reliable veterinary operations
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              Designed around the Cornerstone Hub REST API to deliver consistent performance for
              single clinics and multi-location practices.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {cards.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-blue-950 flex items-center justify-center text-blue-400 border border-blue-900">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Cornerstone Integration FAQ
            </h2>
            <p className="text-gray-400">
              Common questions from practice managers evaluating automated billing audits.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition"
              >
                <h3 className="text-base md:text-lg font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
