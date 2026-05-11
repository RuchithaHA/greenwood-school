'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, LogOut, User, Shield } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isStudent, setIsStudent] = useState(false)
  const [studentName, setStudentName] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      // Check admin token
      const adminResponse = await fetch('/api/auth/check', {
        credentials: 'include'
      })
      if (adminResponse.ok) {
        setIsAdmin(true)
        setLoading(false)
        return
      }

      // Check student token
      const studentResponse = await fetch('/api/auth/student/check', {
        credentials: 'include'
      })
      if (studentResponse.ok) {
        const data = await studentResponse.json()
        setIsStudent(true)
        setStudentName(data.name || 'Student')
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async (type: 'admin' | 'student') => {
    try {
      const endpoint = type === 'admin' ? '/api/auth/logout' : '/api/auth/student/logout'
      const response = await fetch(endpoint, { method: 'POST' })
      
      if (response.ok) {
        toast.success('Logged out successfully')
        if (type === 'admin') {
          setIsAdmin(false)
          router.push('/admin/login')
        } else {
          setIsStudent(false)
          setStudentName('')
          router.push('/')
        }
      } else {
        toast.error('Failed to logout')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

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
            
            {loading ? (
              <div className="w-20 h-8 bg-gray-300 animate-pulse rounded ml-4"></div>
            ) : isAdmin ? (
              <div className="flex items-center space-x-2 ml-4">
                <Link
                  href="/admin/dashboard"
                  className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  <Shield size={16} className="mr-1" />
                  Admin Panel
                </Link>
                <button
                  onClick={() => handleLogout('admin')}
                  className="flex items-center px-3 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  <LogOut size={16} className="mr-1" />
                  Logout
                </button>
              </div>
            ) : isStudent ? (
              <div className="flex items-center space-x-2 ml-4">
                <Link
                  href="/student/dashboard"
                  className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <User size={16} className="mr-1" />
                  {studentName}
                </Link>
                <button
                  onClick={() => handleLogout('student')}
                  className="flex items-center px-3 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  <LogOut size={16} className="mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-4">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Student Login
                </Link>
                <Link
                  href="/admin/login"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-700 transition-colors"
                >
                  Admin Login
                </Link>
                <Link
                  href="/registration"
                  className="px-4 py-2 bg-[#f4a61d] text-[#1a5c2e] rounded-md font-bold hover:bg-[#e59515] transition-colors"
                >
                  Register Now
                </Link>
              </div>
            )}
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
              
              {loading ? (
                <div className="w-full h-8 bg-gray-300 animate-pulse rounded"></div>
              ) : isAdmin ? (
                <>
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center px-3 py-2 bg-purple-600 text-white rounded-md text-sm font-medium"
                  >
                    <Shield size={16} className="mr-1" />
                    Admin Panel
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout('admin')
                      setMobileMenuOpen(false)
                    }}
                    className="flex items-center justify-center px-3 py-2 bg-red-600 text-white rounded-md text-sm font-medium"
                  >
                    <LogOut size={16} className="mr-1" />
                    Logout
                  </button>
                </>
              ) : isStudent ? (
                <>
                  <Link
                    href="/student/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium"
                  >
                    <User size={16} className="mr-1" />
                    {studentName}'s Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout('student')
                      setMobileMenuOpen(false)
                    }}
                    className="flex items-center justify-center px-3 py-2 bg-red-600 text-white rounded-md text-sm font-medium"
                  >
                    <LogOut size={16} className="mr-1" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium text-center"
                  >
                    Student Login
                  </Link>
                  <Link
                    href="/admin/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md font-medium text-center"
                  >
                    Admin Login
                  </Link>
                  <Link
                    href="/registration"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 bg-[#f4a61d] text-[#1a5c2e] rounded-md font-bold text-center"
                  >
                    Register Now
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
