'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import Logo from './Logo'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-gray-950/95 backdrop-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="hover:opacity-80">
            <Logo layout="horizontal" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-sm hover:text-blue-600 transition">
              Features
            </Link>
            <Link href="/pricing" className="text-sm hover:text-blue-600 transition">
              Pricing
            </Link>
            <Link href="/about" className="text-sm hover:text-blue-600 transition">
              About
            </Link>
            <Link href="/blog" className="text-sm hover:text-blue-600 transition">
              Blog
            </Link>
            <Link href="/contact" className="text-sm hover:text-blue-600 transition">
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="https://app.vetguard.io"
              className="text-sm hover:text-blue-600 transition"
            >
              Sign in
            </Link>
            <Link
              href="/contact"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
            >
              Schedule a demo
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-800">
            <div className="py-2 space-y-2">
              <Link
                href="/#features"
                className="block px-4 py-2 text-sm hover:bg-gray-800 rounded"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="block px-4 py-2 text-sm hover:bg-gray-800 rounded"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="block px-4 py-2 text-sm hover:bg-gray-800 rounded"
              >
                About
              </Link>
              <Link
                href="/blog"
                className="block px-4 py-2 text-sm hover:bg-gray-800 rounded"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-2 text-sm hover:bg-gray-800 rounded"
              >
                Contact
              </Link>
              <div className="px-4 pt-2 space-y-2">
                <Link
                  href="https://app.vetguard.io"
                  className="block text-sm hover:text-blue-600"
                >
                  Sign in
                </Link>
                <Link
                  href="/contact"
                  className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium text-center hover:bg-blue-700 transition"
                >
                  Schedule a demo
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
