import type { Metadata } from 'next'
import { Mail, MessageSquare, Clock, MapPin } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact — VetGuard.io',
  description: 'Schedule a demo or get in touch with the VetGuard.io team.',
}

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    detail: 'hello@vetguard.io',
    note: 'We respond within one business day',
  },
  {
    icon: MessageSquare,
    title: 'Sales & demos',
    detail: 'Book a personalized walkthrough',
    note: 'See your clinic\'s potential recovery in 30 minutes',
  },
  {
    icon: Clock,
    title: 'Support hours',
    detail: 'Mon–Fri, 9am–6pm ET',
    note: 'Priority support on Professional plans',
  },
  {
    icon: MapPin,
    title: 'Location',
    detail: 'Remote-first, US-based',
    note: 'Serving clinics nationwide',
  },
]

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-blue-950/40 to-gray-950 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact us</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Schedule a demo, ask a question, or tell us about your clinic. We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              <ContactForm />
            </div>

            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Get in touch</h2>
              <div className="space-y-6">
                {contactInfo.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-950 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-100">{item.title}</h3>
                      <p className="text-gray-300">{item.detail}</p>
                      <p className="text-sm text-gray-500 mt-1">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 bg-blue-950/50 border border-blue-800 rounded-lg p-6">
                <h3 className="font-bold text-gray-100 mb-2">Prefer email?</h3>
                <p className="text-gray-400 text-sm">
                  Reach us directly at{' '}
                  <a href="mailto:hello@vetguard.io" className="text-blue-500 hover:underline">
                    hello@vetguard.io
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
