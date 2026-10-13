import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy Policy — VetGuard.io',
  description:
    'How VetGuard LLC collects, uses, stores, shares, and protects information when you use VetGuard.io.',
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      filename="PRIVACY_POLICY.md"
      description="How we collect, use, store, share, and protect your information."
    />
  )
}
