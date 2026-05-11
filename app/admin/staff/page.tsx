'use client'

import { useEffect, useState } from 'react'
import AdminSidebar from '@/components/AdminSidebar'
import DataTable from '@/components/DataTable'
import CRUDModal from '@/components/CRUDModal'
import { Plus, Trash2, Edit, Eye, User as UserIcon, Mail, Building, Calendar, X } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminStaffPage() {
  const [staff, setStaff] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingStaff, setEditingStaff] = useState<any>(null)
  const [selectedStaff, setSelectedStaff] = useState<any | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  useEffect(() => {
    fetchStaff()
  }, [])

  const fetchStaff = async () => {
    try {
      const response = await fetch('/api/staff')
      const data = await response.json()
      setStaff(data)
    } catch (error) {
      console.error('Failed to fetch staff:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (data: any) => {
    try {
      const url = editingStaff ? `/api/staff/${editingStaff.id}` : '/api/staff'
      const method = editingStaff ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success(editingStaff ? 'Staff updated!' : 'Staff added!')
        setIsModalOpen(false)
        setEditingStaff(null)
        fetchStaff()
      }
    } catch (error) {
      toast.error('Failed to save staff')
    }
  }

  const deleteStaff = async (id: number) => {
    if (!confirm('Are you sure you want to delete this staff member?')) return

    try {
      const response = await fetch(`/api/staff/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Staff deleted!')
        fetchStaff()
      }
    } catch (error) {
      toast.error('Failed to delete staff')
    }
  }

  const viewDetails = (staffMember: any) => {
    setSelectedStaff(staffMember)
    setShowDetailsModal(true)
  }

  const fields = [
    { name: 'name', label: 'Name', type: 'text' as const, required: true },
    { name: 'designation', label: 'Designation', type: 'text' as const, required: true },
    { name: 'department', label: 'Department', type: 'text' as const, required: true },
    { name: 'email', label: 'Email', type: 'email' as const, required: true },
    { name: 'photoUrl', label: 'Photo URL', type: 'text' as const, required: false },
  ]

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'designation', header: 'Designation' },
    { key: 'department', header: 'Department' },
    { key: 'email', header: 'Email' },
    {
      key: 'actions',
      header: 'Actions',
      render: (_: any, row: any) => (
        <div className="flex gap-2">
          <button
            onClick={() => viewDetails(row)}
            className="p-2 text-purple-600 hover:bg-purple-100 rounded"
            title="View Details"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => {
              setEditingStaff(row)
              setIsModalOpen(true)
            }}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded"
            title="Edit"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => deleteStaff(row.id)}
            className="p-2 text-red-600 hover:bg-red-100 rounded"
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#1a5c2e]">Staff</h1>
          <button
            onClick={() => {
              setEditingStaff(null)
              setIsModalOpen(true)
            }}
            className="px-4 py-2 bg-[#f4a61d] text-[#1a5c2e] rounded-lg hover:bg-[#e59515] flex items-center gap-2"
          >
            <Plus size={20} />
            Add Staff
          </button>
        </div>

        {loading ? (
          <div className="text-gray-600">Loading...</div>
        ) : (
          <DataTable columns={columns} data={staff} />
        )}

        <CRUDModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingStaff(null)
          }}
          title={editingStaff ? 'Edit Staff' : 'Add Staff'}
          onSubmit={handleSave}
          fields={fields}
          initialData={editingStaff}
        />

        {/* Staff Details Modal */}
        {showDetailsModal && selectedStaff && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#1a5c2e]">Staff Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Staff Photo */}
                <div className="flex justify-center">
                  {selectedStaff.photoUrl ? (
                    <img
                      src={selectedStaff.photoUrl}
                      alt={selectedStaff.name}
                      className="w-32 h-32 rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/150?text=Photo'
                      }}
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                      <UserIcon size={48} className="text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Staff Information */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-[#1a5c2e]">{selectedStaff.name}</h3>
                  <p className="text-gray-600">{selectedStaff.designation}</p>
                  <p className="text-sm text-gray-500 mt-1">{selectedStaff.department}</p>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail size={20} className="mr-3 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedStaff.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Building size={20} className="mr-3 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="font-medium">{selectedStaff.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <UserIcon size={20} className="mr-3 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Designation</p>
                      <p className="font-medium">{selectedStaff.designation}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={20} className="mr-3 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Added On</p>
                      <p className="font-medium">{new Date(selectedStaff.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => {
                    setEditingStaff(selectedStaff)
                    setShowDetailsModal(false)
                    setIsModalOpen(true)
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Edit Staff
                </button>
                <button
                  onClick={() => setShowDetailsModal(false)}
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
