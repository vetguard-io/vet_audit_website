import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Terms of Service — VetGuard.io',
  description:
    'The terms that govern access to and use of the VetGuard.io platform, API, and related services.',
  alternates: {
    canonical: 'https://vetguard.io/terms',
  },
}

export default function TermsOfServicePage() {
  return (
    <LegalPage
      filename="TERMS_OF_SERVICE.md"
      description="The agreement that governs your access to and use of VetGuard.io."
    />
  )
}
