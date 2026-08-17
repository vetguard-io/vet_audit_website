import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section id="demo" className="bg-blue-600 text-white py-20 md:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to recover lost revenue?
        </h2>
        <p className="text-xl text-blue-100 mb-10">
          Book a personalized demo and see how much your clinic could recover.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            Schedule a demo
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="#pricing"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-blue-700 transition"
          >
            View pricing
          </Link>
        </div>

        <p className="text-blue-100 text-sm">
          Questions? <Link href="/contact" className="underline hover:text-white">Contact us</Link> or email hello@vetguard.io
        </p>
      </div>
    </section>
  )
}
