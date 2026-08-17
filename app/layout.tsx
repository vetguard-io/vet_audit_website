import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'VetGuard.io — AI Billing Audit for Vet Clinics',
  description: 'Recover $2–5K/month in missed charges. VetGuard.io reads your SOAP notes and flags everything not billed. 2-week free trial.',
  keywords: 'veterinary billing, billing audit, vet practice management, veterinary software, invoice audit',
  authors: [{ name: 'VetGuard.io' }],
  creator: 'VetGuard.io',
  publisher: 'VetGuard.io',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vetguard.io',
    siteName: 'VetGuard.io',
    title: 'VetGuard.io — AI Billing Audit for Vet Clinics',
    description: 'Recover $2–5K/month in missed charges. VetGuard.io reads your SOAP notes and flags everything not billed.',
    images: [
      {
        url: 'https://vetguard.io/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VetGuard.io — AI Billing Audit for Vet Clinics',
    description: 'Recover $2–5K/month in missed charges. VetGuard.io reads your SOAP notes and flags everything not billed.',
    creator: '@vetguard',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gray-950 text-gray-100">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
