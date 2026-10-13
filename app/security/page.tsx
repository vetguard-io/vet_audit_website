import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Security Policy — VetGuard.io',
  description:
    'Administrative, technical, and physical safeguards VetGuard uses to protect clinical and financial data.',
}

export default function SecurityPolicyPage() {
  return (
    <LegalPage
      filename="SECURITY_POLICY.md"
      description="The safeguards we use to protect your clinical and financial data."
    />
  )
}
