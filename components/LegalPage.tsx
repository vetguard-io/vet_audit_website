import Link from 'next/link'
import { loadLegalDoc } from '@/lib/legal'
import MarkdownContent from './MarkdownContent'

type Props = {
  filename: string
  description: string
}

const legalLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/security', label: 'Security' },
]

export default function LegalPage({ filename, description }: Props) {
  const doc = loadLegalDoc(filename)

  return (
    <>
      <section className="bg-gradient-to-b from-blue-950/40 to-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-400 mb-4">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{doc.title}</h1>
          <p className="text-lg text-gray-400 mb-6">{description}</p>
          {(doc.effectiveDate || doc.lastUpdated) && (
            <p className="text-sm text-gray-500">
              {doc.effectiveDate && <>Effective {doc.effectiveDate}</>}
              {doc.effectiveDate && doc.lastUpdated && (
                <span className="mx-2 text-gray-700">·</span>
              )}
              {doc.lastUpdated && <>Last updated {doc.lastUpdated}</>}
            </p>
          )}
        </div>
      </section>

      <section className="py-12 md:py-16 border-t border-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Legal documents"
            className="mb-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500"
          >
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-blue-400 transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <MarkdownContent content={doc.body} />

          <div className="mt-16 pt-8 border-t border-gray-800 text-sm text-gray-500">
            <p>
              Questions? Contact{' '}
              <a
                href="mailto:legal@vetguard.io"
                className="text-blue-400 hover:text-blue-300"
              >
                legal@vetguard.io
              </a>
              {' '}or{' '}
              <a
                href="mailto:privacy@vetguard.io"
                className="text-blue-400 hover:text-blue-300"
              >
                privacy@vetguard.io
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
