'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/academics', label: 'Academics' },
    { href: '/activities', label: 'Activities' },
    { href: '/admissions', label: 'Admissions' },
    { href: '/events', label: 'Events' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-[#1a5c2e] text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🏫</span>
            <span className="text-xl font-bold">Greenwood School</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-[#f4a61d] text-[#1a5c2e]'
                    : 'hover:bg-[#f4a61d] hover:text-[#1a5c2e]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/registration"
              className="ml-4 px-4 py-2 bg-[#f4a61d] text-[#1a5c2e] rounded-md font-bold hover:bg-[#e59515] transition-colors"
            >
              Register Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === link.href
                      ? 'bg-[#f4a61d] text-[#1a5c2e]'
                      : 'hover:bg-[#f4a61d] hover:text-[#1a5c2e]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/registration"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 bg-[#f4a61d] text-[#1a5c2e] rounded-md font-bold text-center"
              >
                Register Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
