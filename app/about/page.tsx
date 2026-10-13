import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Heart, Shield, Target, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About — VetGuard.io',
  description: 'VetGuard.io helps veterinary clinics recover missed revenue with AI-powered billing audits.',
}

const values = [
  {
    icon: Heart,
    title: 'Built for vets',
    description: 'We understand vet-specific workflows, abbreviations, and billing codes — not generic healthcare.',
  },
  {
    icon: Target,
    title: 'Results over hype',
    description: 'We measure success in dollars recovered, not dashboards viewed. If it doesn\'t pay for itself, it doesn\'t ship.',
  },
  {
    icon: Shield,
    title: 'Privacy first',
    description: 'SOAP notes are encrypted at rest and in transit. We never sell or share your clinic data.',
  },
  {
    icon: Users,
    title: 'Clinic-first support',
    description: 'Real humans who understand billing workflows, not ticket queues and chatbots.',
  },
]

const story = [
  {
    step: '01',
    title: 'The leakage',
    body: 'Veterinary clinics lose 10–15% of revenue to unbilled services. A missed injection, an uncharged lab panel, a forgotten exam fee — it adds up to $100K+ per year for a typical practice.',
  },
  {
    step: '02',
    title: 'The gap',
    body: 'Manual chart audits take hours and still miss charges. Enterprise billing tools cost $10K+/month and were never designed for how vet clinics actually work.',
  },
  {
    step: '03',
    title: 'The product',
    body: 'VetGuard.io reads SOAP notes and flags everything that wasn\'t billed — in seconds, not hours. The same revenue protection hospitals rely on, at a price that makes sense for practices.',
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-950/40 via-gray-950 to-gray-950" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-400 mb-5">
            About
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Built for the work clinics already do
          </h1>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            VetGuard.io exists to stop revenue leakage in veterinary practices — quietly, accurately, and without adding another hour to the billing day.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-400 mb-4">
              Our story
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why we built VetGuard.io</h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Clinics should get paid for every service they document. We built the software because nothing else in veterinary billing made that possible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {story.map((item) => (
              <div key={item.step} className="relative">
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-blue-500 mb-4">
                  {item.step}
                </p>
                <div className="h-px w-12 bg-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-20 md:py-28 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-400 mb-4">
              How we work
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our values</h2>
            <p className="text-lg text-gray-400">The standards that shape every product decision.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div key={i} className="bg-gray-950/60 p-8 rounded-lg border border-gray-800">
                <div className="w-11 h-11 rounded-lg bg-blue-950 border border-blue-800 flex items-center justify-center mb-5">
                  <value.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold mb-3">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 border-t border-gray-800">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See it in your clinic</h2>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            We&apos;re a small team focused on one job: helping veterinary practices get paid for the work they already do.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Schedule a demo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
