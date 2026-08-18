'use client'

import { useState } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      clinic: (form.elements.namedItem('clinic') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error || 'Something went wrong. Please try again.')
      }

      setSubmitted(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-950/50 border border-green-800 rounded-lg p-8 text-center">
        <h3 className="text-xl font-bold text-gray-100 mb-2">Thanks for reaching out!</h3>
        <p className="text-gray-400">
          We&apos;ll get back to you within one business day.
        </p>
      </div>
    )
  }

  const inputClasses =
    'w-full px-4 py-3 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder:text-gray-500'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className={inputClasses}
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClasses}
            placeholder="jane@clinic.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="clinic" className="block text-sm font-medium text-gray-300 mb-2">
          Clinic name
        </label>
        <input
          id="clinic"
          name="clinic"
          type="text"
          className={inputClasses}
          placeholder="Happy Paws Veterinary Clinic"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
          How can we help?
        </label>
        <select
          id="subject"
          name="subject"
          className={`${inputClasses} bg-gray-800`}
        >
          <option>Schedule a demo</option>
          <option>Pricing question</option>
          <option>Technical support</option>
          <option>Partnership inquiry</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={`${inputClasses} resize-y`}
          placeholder="Tell us about your clinic and what you're looking for..."
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm bg-red-950/40 border border-red-800 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <button
        id="contact-submit-btn"
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send message
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  )
}

