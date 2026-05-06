'use client'

import { useEffect, useState } from 'react'
import AdminSidebar from '@/components/AdminSidebar'
import Link from 'next/link'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  })
  const [recentRegistrations, setRecentRegistrations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/registrations')
      const data = await response.json()
      
      const total = data.length
      const pending = data.filter((r: any) => r.status === 'pending').length
      const approved = data.filter((r: any) => r.status === 'approved').length
      const rejected = data.filter((r: any) => r.status === 'rejected').length

      setStats({ total, pending, approved, rejected })
      setRecentRegistrations(data.slice(0, 5))
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        <h1 className="text-3xl font-bold text-[#1a5c2e] mb-8">Dashboard</h1>

        {loading ? (
          <div className="text-gray-600">Loading...</div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Registrations</h3>
                <p className="text-4xl font-bold text-[#1a5c2e]">{stats.total}</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-gray-600 text-sm font-semibold mb-2">Pending</h3>
                <p className="text-4xl font-bold text-yellow-500">{stats.pending}</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-gray-600 text-sm font-semibold mb-2">Approved</h3>
                <p className="text-4xl font-bold text-green-500">{stats.approved}</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-gray-600 text-sm font-semibold mb-2">Rejected</h3>
                <p className="text-4xl font-bold text-red-500">{stats.rejected}</p>
              </div>
            </div>

            {/* Recent Registrations */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-[#1a5c2e] mb-4">Recent Registrations</h2>
              {recentRegistrations.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left">Name</th>
                        <th className="px-4 py-3 text-left">Class</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentRegistrations.map((reg) => (
                        <tr key={reg.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3">{reg.studentName}</td>
                          <td className="px-4 py-3">{reg.classApplying}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                reg.status === 'approved'
                                  ? 'bg-green-100 text-green-800'
                                  : reg.status === 'rejected'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {reg.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {new Date(reg.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">No registrations yet</p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-[#1a5c2e] mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/admin/registrations"
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <h3 className="font-bold text-[#1a5c2e]">Manage Registrations</h3>
                  <p className="text-gray-600 text-sm mt-1">View and approve registrations</p>
                </Link>
                <Link
                  href="/admin/students"
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <h3 className="font-bold text-[#1a5c2e]">Manage Students</h3>
                  <p className="text-gray-600 text-sm mt-1">Add and edit student records</p>
                </Link>
                <Link
                  href="/admin/events"
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <h3 className="font-bold text-[#1a5c2e]">Manage Events</h3>
                  <p className="text-gray-600 text-sm mt-1">Create and update events</p>
                </Link>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
