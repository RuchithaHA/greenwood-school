'use client'

import { useEffect, useState } from 'react'
import AdminSidebar from '@/components/AdminSidebar'
import DataTable from '@/components/DataTable'
import { Check, X, Trash2, Search, Download, Eye, Mail, Phone, Calendar, User } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegistration, setSelectedRegistration] = useState<any | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const fetchRegistrations = async () => {
    try {
      const response = await fetch('/api/registrations')
      const data = await response.json()
      setRegistrations(data)
    } catch (error) {
      console.error('Failed to fetch registrations:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/registrations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        toast.success(`Registration ${status}!`)
        fetchRegistrations()
      }
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  const deleteRegistration = async (id: number) => {
    if (!confirm('Are you sure you want to delete this registration?')) return

    try {
      const response = await fetch(`/api/registrations/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Registration deleted!')
        fetchRegistrations()
      }
    } catch (error) {
      toast.error('Failed to delete registration')
    }
  }

  const viewDetails = (registration: any) => {
    setSelectedRegistration(registration)
    setShowModal(true)
  }

  const exportCSV = () => {
    const headers = ['Name', 'Class', 'Parent', 'Phone', 'Email', 'Status', 'Date']
    const rows = filteredRegistrations.map((r) => [
      r.studentName,
      r.classApplying,
      r.parentName,
      r.phone,
      r.email,
      r.status,
      new Date(r.createdAt).toLocaleDateString(),
    ])

    const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'registrations.csv'
    a.click()
  }

  const filteredRegistrations = registrations.filter(
    (r) =>
      r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const columns = [
    { key: 'studentName', header: 'Name' },
    { key: 'classApplying', header: 'Class' },
    { key: 'parentName', header: 'Parent' },
    { key: 'phone', header: 'Phone' },
    {
      key: 'createdAt',
      header: 'Date',
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            value === 'approved'
              ? 'bg-green-100 text-green-800'
              : value === 'rejected'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_: any, row: any) => (
        <div className="flex gap-2">
          <button
            onClick={() => viewDetails(row)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded"
            title="View Details"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => updateStatus(row.id, 'approved')}
            className="p-2 text-green-600 hover:bg-green-100 rounded"
            title="Approve"
            disabled={row.status === 'approved'}
          >
            <Check size={18} />
          </button>
          <button
            onClick={() => updateStatus(row.id, 'rejected')}
            className="p-2 text-red-600 hover:bg-red-100 rounded"
            title="Reject"
            disabled={row.status === 'rejected'}
          >
            <X size={18} />
          </button>
          <button
            onClick={() => deleteRegistration(row.id)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        <h1 className="text-3xl font-bold text-[#1a5c2e] mb-8">Registrations</h1>

        <div className="mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, email, or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f4a61d]"
            />
          </div>
          <button
            onClick={exportCSV}
            className="px-4 py-2 bg-[#1a5c2e] text-white rounded-lg hover:bg-[#145520] flex items-center gap-2"
          >
            <Download size={20} />
            Export CSV
          </button>
        </div>

        {loading ? (
          <div className="text-gray-600">Loading...</div>
        ) : (
          <DataTable columns={columns} data={filteredRegistrations} />
        )}

        {/* Registration Details Modal */}
        {showModal && selectedRegistration && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#1a5c2e]">Registration Details</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Student Information */}
                <div>
                  <h3 className="text-lg font-semibold text-[#1a5c2e] mb-3 flex items-center">
                    <User size={20} className="mr-2" />
                    Student Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{selectedRegistration.studentName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium">{new Date(selectedRegistration.dob).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Class Applying For</p>
                      <p className="font-medium">{selectedRegistration.classApplying}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium">{selectedRegistration.gender}</p>
                    </div>
                  </div>
                </div>

                {/* Parent Information */}
                <div>
                  <h3 className="text-lg font-semibold text-[#1a5c2e] mb-3 flex items-center">
                    <User size={20} className="mr-2" />
                    Parent Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Parent Name</p>
                      <p className="font-medium">{selectedRegistration.parentName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium flex items-center">
                        <Phone size={16} className="mr-1" />
                        {selectedRegistration.phone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-[#1a5c2e] mb-3 flex items-center">
                    <Mail size={20} className="mr-2" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedRegistration.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{selectedRegistration.address}</p>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-lg font-semibold text-[#1a5c2e] mb-3 flex items-center">
                    <Calendar size={20} className="mr-2" />
                    Additional Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Previous School</p>
                      <p className="font-medium">{selectedRegistration.prevSchool || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Application Date</p>
                      <p className="font-medium">{new Date(selectedRegistration.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                          selectedRegistration.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : selectedRegistration.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {selectedRegistration.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8">
                {selectedRegistration.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        updateStatus(selectedRegistration.id, 'approved')
                        setShowModal(false)
                      }}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Approve Application
                    </button>
                    <button
                      onClick={() => {
                        updateStatus(selectedRegistration.id, 'rejected')
                        setShowModal(false)
                      }}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Reject Application
                    </button>
                  </>
                )}
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
