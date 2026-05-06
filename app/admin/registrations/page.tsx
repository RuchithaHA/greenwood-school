'use client'

import { useEffect, useState } from 'react'
import AdminSidebar from '@/components/AdminSidebar'
import DataTable from '@/components/DataTable'
import { Check, X, Trash2, Search, Download } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

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
            onClick={() => updateStatus(row.id, 'approved')}
            className="p-2 text-green-600 hover:bg-green-100 rounded"
            title="Approve"
          >
            <Check size={18} />
          </button>
          <button
            onClick={() => updateStatus(row.id, 'rejected')}
            className="p-2 text-red-600 hover:bg-red-100 rounded"
            title="Reject"
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
      </main>
    </div>
  )
}
