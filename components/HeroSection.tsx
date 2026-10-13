'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 lg:py-40">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-950/40 via-gray-950 to-gray-950"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Find <span className="text-blue-600">$2–5K in missed charges</span> every month
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
            Vet clinics lose 10–15% of revenue from unbilled services. VetGuard.io reads your SOAP notes and automatically flags everything that wasn't charged.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/contact"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition inline-flex items-center justify-center gap-2"
            >
              Schedule a demo
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#how-it-works"
              className="px-8 py-4 border-2 border-gray-600 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              See how it works
            </Link>
          </div>

          <p className="text-sm text-gray-500">
            Personalized walkthrough • No commitment required
          </p>
        </div>
      </div>
    </section>
  )
}
