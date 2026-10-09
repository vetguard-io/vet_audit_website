import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock,
  ExternalLink,
  Lock,
  RefreshCw,
  Server,
  Zap,
} from 'lucide-react'
import EzyVetTour from '@/components/EzyVetTour'

export const metadata: Metadata = {
  title: 'ezyVet Integration Tour — Automated Billing Audit | VetGuard.io',
  description:
    'Explore how VetGuard integrates with ezyVet to automatically audit consult SOAP notes against invoices in seconds. Recover missed charges with zero double-entry.',
  keywords:
    'ezyvet integration, veterinary billing audit, ezyvet missed charges, veterinary practice management, ezyvet api, soap note audit',
}

export default function EzyVetIntegrationPage() {
  const faqs = [
    {
      q: 'Does VetGuard require daily manual exports or spreadsheet uploads?',
      a: 'No. VetGuard integrates directly via ezyVet’s official REST API and real-time Webhooks. The moment a consult is saved in ezyVet, VetGuard audits it automatically in the background without any manual file handling.',
    },
    {
      q: 'Does VetGuard alter or add charges to patient invoices without approval?',
      a: 'Never. VetGuard is strictly non-destructive. It surfaces discrepancies for staff review in the reconciliation workbench or pushes native tasks to ezyVet for front desk staff confirmation. Your team always maintains final billing authority.',
    },
    {
      q: 'How does VetGuard handle ezyVet API rate limits?',
      a: 'VetGuard is fully rate-limit aware. It monitors ezyVet’s 60 calls/minute clinic quota in real time, automatically pacing calls and executing intelligent backoff so your clinic’s quota is never exhausted.',
    },
    {
      q: 'How long does connection and onboarding take?',
      a: 'Initial connection takes approximately 10 to 15 minutes. An administrator enters the ezyVet API credentials in VetGuard settings, verifies the webhook endpoint, and the system immediately performs an initial 30-day historical audit.',
    },
    {
      q: 'What happens if a webhook event is dropped or delayed?',
      a: 'VetGuard runs an automatic safety net polling daemon every 5 minutes with an overlapping window. Any consult that was modified but missed by a webhook is automatically picked up and audited.',
    },
  ]

  return (
    <>
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-blue-950/40 via-gray-950 to-gray-950 pt-16 pb-12 md:pt-24 md:pb-16 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-mono">
            <Link href="/" className="hover:text-gray-300 transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/#features" className="hover:text-gray-300 transition">
              Integrations
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-blue-400">ezyVet</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-950 border border-blue-800 text-blue-400 mb-4">
              <Zap className="w-3.5 h-3.5" />
              <span>Official ezyVet Integration Workflow</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              Every consult checked against its invoice, seconds after it’s saved
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              A comprehensive walkthrough of how VetGuard connects to your clinic’s ezyVet, reads
              each consult’s SOAP notes, spots procedures that never reached the invoice, and routes
              them to your team before clients check out.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Link
                href="/contact"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Schedule a Demo
              </Link>
              <a
                href="/demos/ezyvet-tour.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg font-semibold hover:bg-gray-700 transition"
              >
                <span>Full-screen demo mode</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </a>
            </div>
          </div>

          {/* Measured Demo Metrics Bar */}
          <div className="mt-12 pt-8 border-t border-gray-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <div className="text-2xl md:text-3xl font-bold font-mono text-white">13 s</div>
              <div className="text-xs text-gray-400 mt-1">Consult saved → flagged</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold font-mono text-white">6 s</div>
              <div className="text-xs text-gray-400 mt-1">Charge billed → cleared</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold font-mono text-white">3–4</div>
              <div className="text-xs text-gray-400 mt-1">API calls per consult</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold font-mono text-white">0</div>
              <div className="text-xs text-gray-400 mt-1">Uploads or exports needed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tour App Component */}
      <section className="border-b border-gray-800 bg-gray-950">
        <EzyVetTour />
      </section>

      {/* Integration Technical Specifications */}
      <section className="py-20 md:py-28 bg-gray-900 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400">
              Technical Architecture
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Built for enterprise veterinary reliability
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              Designed specifically around ezyVet’s API shapes and security protocols to guarantee
              consistent performance across single clinics and multi-location hospital networks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-950 flex items-center justify-center text-blue-400 border border-blue-900">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Zero Unauthorized Edits</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                VetGuard only requests read permissions on consults and invoice line items. Staff
                maintain 100% control over billing entries.
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-950 flex items-center justify-center text-blue-400 border border-blue-900">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Quota Pacing & Backoff</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Smart traffic scheduling respects ezyVet’s 60 calls/minute limit per clinic. Never
                blocks your front-desk or clinical workflow.
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-950 flex items-center justify-center text-blue-400 border border-blue-900">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Dual-Mode Redundancy</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Real-time webhooks deliver instant 13-second alerts, backed by a 5-minute polling
                safety net that ensures zero lost records.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 md:py-28 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ezyVet Integration FAQ
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

          {/* Related Blog Link */}
          <div className="mt-12 text-center">
            <Link
              href="/blog/ezyvet-billing-integration"
              className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 font-semibold"
            >
              <span>Read the detailed guide: How to streamline billing audits with ezyVet</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
