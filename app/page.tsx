import HeroSection from '@/components/HeroSection'
import ProblemSection from '@/components/ProblemSection'
import HowItWorksSection from '@/components/HowItWorksSection'
import FeaturesSection from '@/components/FeaturesSection'
import PricingPreview from '@/components/PricingPreview'
import FAQSection from '@/components/FAQSection'
import CTASection from '@/components/CTASection'

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  url: 'https://vetguard.io/',
  name: 'VetGuard.io — AI Billing Audit for Vet Clinics',
  description:
    'Recover $2–5K/month in missed charges. VetGuard.io reads your SOAP notes and flags everything not billed. 2-week free trial.',
  inLanguage: 'en-US',
  isPartOf: {
    '@type': 'WebSite',
    name: 'VetGuard.io',
    url: 'https://vetguard.io/',
  },
  publisher: {
    '@type': 'Organization',
    name: 'VetGuard.io',
    url: 'https://vetguard.io',
    logo: 'https://vetguard.io/icon.png',
  },
}

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'VetGuard.io — AI Billing Audit for Vet Clinics',
  description:
    'AI billing audit software for veterinary clinics. VetGuard reads clinical SOAP notes and automatically detects unbilled services and procedures to help clinics recover $2–5K/month.',
  url: 'https://vetguard.io/',
  brand: {
    '@type': 'Brand',
    name: 'VetGuard.io',
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Free Trial',
      price: '0',
      priceCurrency: 'USD',
      description: '2-week full functionality trial with no credit card required.',
    },
    {
      '@type': 'Offer',
      name: 'Starter Plan',
      price: '200',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '200',
        priceCurrency: 'USD',
        unitText: 'MONTH',
      },
      description: 'For 1–3 vet clinics, ~2,000 audits/month.',
    },
    {
      '@type': 'Offer',
      name: 'Professional Plan',
      price: '500',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '500',
        priceCurrency: 'USD',
        unitText: 'MONTH',
      },
      description: 'For 3–10 vet clinics, ~5,000 audits/month with API access.',
    },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is VetGuard and why does it matter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VetGuard is an AI-powered billing audit platform for veterinary clinics. Vet clinics lose an estimated 10–15% of revenue from unbilled services and procedures. VetGuard reads your clinical SOAP notes, understands vet-specific terminology and abbreviations, and automatically flags missing line items on patient invoices.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does VetGuard audit veterinary records?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VetGuard works in three simple steps: 1) Auto-pull or paste SOAP notes and invoice line items from your PIMS, 2) AI audits the notes against charged items with confidence scoring (high, medium, low), and 3) Staff reviews flagged charges and adds them to client invoices in under 60 seconds.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which Practice Management Information Systems (PIMS) does VetGuard integrate with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VetGuard features direct integrations with ezyVet and IDEXX Cornerstone, along with manual paste support that works with any veterinary practice management software.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does VetGuard cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VetGuard offers a 2-week free trial with full functionality and no credit card required. Paid plans start at $200/month for Starter (1–3 clinics, ~2,000 audits/month) and $500/month for Professional (3–10 clinics, ~5,000 audits/month).',
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSection />
      <PricingPreview />
      <FAQSection />
      <CTASection />
    </>
  )
}

