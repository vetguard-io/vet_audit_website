import { ChevronRight, Shield, Zap, TrendingUp, Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import HeroSection from '@/components/HeroSection'
import ProblemSection from '@/components/ProblemSection'
import HowItWorksSection from '@/components/HowItWorksSection'
import FeaturesSection from '@/components/FeaturesSection'
import PricingPreview from '@/components/PricingPreview'
import CTASection from '@/components/CTASection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSection />
      <PricingPreview />
      <CTASection />
    </>
  )
}
