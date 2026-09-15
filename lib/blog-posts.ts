export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  content: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'hidden-cost-of-missed-charges',
    title: 'The hidden cost of missed charges in vet clinics',
    excerpt: 'Most practices lose 10–15% of revenue to unbilled services. Here\'s where the leaks happen and how to find them.',
    category: 'Revenue recovery',
    date: 'Jan 15, 2026',
    readTime: '5 min read',
    content: [
      'Revenue leakage is one of the most overlooked problems in veterinary medicine. While clinics focus on patient care and client experience, thousands of dollars in unbilled services slip through every month.',
      'The most common gaps come from bundled services — a nail trim done during an exam but never added to the invoice, an injection administered but not coded, or a lab panel ordered but only partially billed.',
      'Manual chart audits help, but they\'re time-consuming and inconsistent. Billing staff review a sample of charts each week and still miss charges buried in dense SOAP notes.',
      'Automated SOAP note analysis compares what was documented against what was billed, flagging discrepancies in seconds. Clinics using this approach typically find $2–5K in missed charges within the first two weeks.',
    ],
  },
  {
    slug: 'soap-note-audit-checklist',
    title: 'The SOAP note audit checklist every billing manager needs',
    excerpt: 'A practical checklist for reviewing charts — and why manual audits still miss 30% of unbilled items.',
    category: 'Billing guides',
    date: 'Jan 8, 2026',
    readTime: '7 min read',
    content: [
      'A thorough chart audit checks four things: documented services, billed line items, medication administration, and diagnostic orders.',
      'Start with the subjective and objective sections — look for procedures mentioned but absent from the invoice. Injections, fluid therapy, and bandage changes are frequent offenders.',
      'Compare the assessment and plan against charges. If the plan mentions recheck exams, cultures, or imaging, verify each appears on the bill.',
      'Even with a rigorous checklist, manual review misses an estimated 30% of unbilled items due to note volume and abbreviation complexity. AI-assisted audits catch what humans overlook.',
    ],
  },
  {
    slug: 'ezyvet-billing-integration',
    title: 'How to streamline billing audits with ezyVet',
    excerpt: 'Pull SOAP notes and invoices directly from ezyVet to run audits in minutes instead of hours.',
    category: 'Integrations',
    date: 'Dec 20, 2025',
    readTime: '4 min read',
    content: [
      'ezyVet is one of the most popular PIMS platforms in North America. VetGuard.io integrates directly to pull SOAP notes and invoice line items without manual copy-paste.',
      'The integration syncs daily, so billing managers can run audits on yesterday\'s charts each morning — before invoices go out the door.',
      'Setup takes about 15 minutes. Connect your ezyVet account, select which clinics to include, and audits begin automatically.',
    ],
  },
  {
    slug: 'roi-of-billing-audit-software',
    title: 'Calculating the ROI of billing audit software',
    excerpt: 'If your clinic bills $1M/year, even a 5% leakage rate costs $50K annually. Here\'s the math.',
    category: 'Revenue recovery',
    date: 'Dec 12, 2025',
    readTime: '6 min read',
    content: [
      'ROI for billing audit software is straightforward: compare recovered revenue against subscription cost.',
      'A clinic billing $1M annually with 10% leakage loses $100K per year. Recovering even 20% of that — $20K — delivers a 10× return on a $200/month subscription.',
      'Most VetGuard.io customers find $2–5K in the first two weeks alone, paying for an entire year of service before the trial ends.',
    ],
  },
  {
    slug: 'common-unbilled-services',
    title: '7 services vet clinics forget to bill for',
    excerpt: 'From nail trims bundled into exams to missed injection fees — the most common billing gaps we see.',
    category: 'Billing guides',
    date: 'Nov 28, 2025',
    readTime: '5 min read',
    content: [
      'The seven most commonly missed charges: injection administration fees, nail trims, ear cleanings, bandage changes, fluid therapy, recheck exams, and medical waste disposal.',
      'These are often performed as part of a larger visit and forgotten when the invoice is built. The SOAP note documents them, but the billing screen doesn\'t reflect them.',
      'Running daily audits on completed visits catches these gaps before invoices are finalized and sent to clients.',
    ],
  },
  {
    slug: 'ai-in-veterinary-billing',
    title: 'How AI is changing veterinary billing audits',
    excerpt: 'Why generic AI tools fail on vet abbreviations — and what purpose-built models do differently.',
    category: 'Product',
    date: 'Nov 15, 2025',
    readTime: '8 min read',
    content: [
      'Generic AI models struggle with veterinary SOAP notes because of dense abbreviations, species-specific terminology, and inconsistent documentation styles.',
      'Purpose-built models trained on vet billing data understand that "SQ fluids" means subcutaneous fluid therapy, that "CBC/Chem" is a lab panel, and that "N/T" often means nail trim.',
      'Confidence scoring helps billing staff prioritize high-certainty flags, reducing review time while maintaining accuracy.',
    ],
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}
