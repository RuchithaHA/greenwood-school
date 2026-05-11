'use client'

import { useEffect, useState } from 'react'
import AdminSidebar from '@/components/AdminSidebar'
import Link from 'next/link'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    totalStudents: 0,
    totalEvents: 0,
    totalGallery: 0,
    totalStaff: 0,
  })
  const [recentRegistrations, setRecentRegistrations] = useState<any[]>([])
  const [recentStudents, setRecentStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch registrations
      const regResponse = await fetch('/api/registrations')
      const regData = await regResponse.json()
      
      const totalRegistrations = regData.length
      const pending = regData.filter((r: any) => r.status === 'pending').length
      const approved = regData.filter((r: any) => r.status === 'approved').length
      const rejected = regData.filter((r: any) => r.status === 'rejected').length

      // Fetch students
      const studentResponse = await fetch('/api/students')
      const studentData = await studentResponse.json()
      
      // Fetch events
      const eventResponse = await fetch('/api/events')
      const eventData = await eventResponse.json()
      
      // Fetch gallery
      const galleryResponse = await fetch('/api/gallery')
      const galleryData = await galleryResponse.json()
      
      // Fetch staff
      const staffResponse = await fetch('/api/staff')
      const staffData = await staffResponse.json()

      setStats({ 
        totalRegistrations, 
        pending, 
        approved, 
        rejected,
        totalStudents: studentData.length,
        totalEvents: eventData.length,
        totalGallery: galleryData.length,
        totalStaff: staffData.length,
      })
      setRecentRegistrations(regData.slice(0, 5))
      setRecentStudents(studentData.slice(0, 5))
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
                <p className="text-4xl font-bold text-[#1a5c2e]">{stats.totalRegistrations}</p>
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

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-gray-600 text-sm font-semibold mb-2">Student Accounts</h3>
                <p className="text-4xl font-bold text-blue-500">{stats.totalStudents}</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Events</h3>
                <p className="text-4xl font-bold text-purple-500">{stats.totalEvents}</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-gray-600 text-sm font-semibold mb-2">Gallery Items</h3>
                <p className="text-4xl font-bold text-indigo-500">{stats.totalGallery}</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-gray-600 text-sm font-semibold mb-2">Staff Members</h3>
                <p className="text-4xl font-bold text-orange-500">{stats.totalStaff}</p>
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

            {/* Recent Students */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-[#1a5c2e] mb-4">Recent Student Accounts</h2>
              {recentStudents.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left">Name</th>
                        <th className="px-4 py-3 text-left">Email</th>
                        <th className="px-4 py-3 text-left">Phone</th>
                        <th className="px-4 py-3 text-left">Application Status</th>
                        <th className="px-4 py-3 text-left">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentStudents.map((student) => (
                        <tr key={student.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3">{student.name}</td>
                          <td className="px-4 py-3">{student.email}</td>
                          <td className="px-4 py-3">{student.phone}</td>
                          <td className="px-4 py-3">
                            {student.registration ? (
                              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                                Applied
                              </span>
                            ) : (
                              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
                                Not Applied
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {new Date(student.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">No student accounts yet</p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-[#1a5c2e] mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  <p className="text-gray-600 text-sm mt-1">Add and edit student accounts</p>
                </Link>
                <Link
                  href="/admin/events"
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <h3 className="font-bold text-[#1a5c2e]">Manage Events</h3>
                  <p className="text-gray-600 text-sm mt-1">Create and update events</p>
                </Link>
                <Link
                  href="/admin/gallery"
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <h3 className="font-bold text-[#1a5c2e]">Manage Gallery</h3>
                  <p className="text-gray-600 text-sm mt-1">Upload and organize photos</p>
                </Link>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
