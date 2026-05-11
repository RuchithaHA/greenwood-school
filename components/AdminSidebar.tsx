'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Users, Calendar, Image as ImageIcon, UserCog, LogOut } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const menuItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/registrations', label: 'Registrations', icon: Users },
    { href: '/admin/students', label: 'Students', icon: UserCog },
    { href: '/admin/events', label: 'Events', icon: Calendar },
    { href: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
    { href: '/admin/staff', label: 'Staff', icon: UserCog },
  ]

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      const response = await fetch('/api/auth/admin/logout', { method: 'POST' })
      if (response.ok) {
        toast.success('Logged out successfully')
        router.push('/admin/login')
      } else {
        toast.error('Failed to logout')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <aside className="w-64 bg-[#1a5c2e] text-white min-h-screen fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold text-[#f4a61d]">Greenwood Admin</h1>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-6 py-3 transition-colors ${
                isActive ? 'bg-[#f4a61d] text-[#1a5c2e]' : 'hover:bg-[#f4a61d] hover:text-[#1a5c2e]'
              }`}
            >
              <Icon size={20} className="mr-3" />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center w-full px-6 py-3 hover:bg-[#f4a61d] hover:text-[#1a5c2e] transition-colors rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogOut size={20} className="mr-3" />
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </aside>
  )
}
