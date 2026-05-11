'use client'

import { useEffect, useState } from 'react'
import AdminSidebar from '@/components/AdminSidebar'
import DataTable from '@/components/DataTable'
import CRUDModal from '@/components/CRUDModal'
import { Plus, Trash2, Edit } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<any>(null)

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/students')
      const data = await response.json()
      setStudents(data)
    } catch (error) {
      console.error('Failed to fetch students:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (data: any) => {
    try {
      const url = editingStudent ? `/api/students/${editingStudent.id}` : '/api/students'
      const method = editingStudent ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success(editingStudent ? 'Student updated!' : 'Student added!')
        setIsModalOpen(false)
        setEditingStudent(null)
        fetchStudents()
      }
    } catch (error) {
      toast.error('Failed to save student')
    }
  }

  const deleteStudent = async (id: number) => {
    if (!confirm('Are you sure you want to delete this student?')) return

    try {
      const response = await fetch(`/api/students/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Student deleted!')
        fetchStudents()
      }
    } catch (error) {
      toast.error('Failed to delete student')
    }
  }

  const getFields = (isEditing: boolean) => [
    { name: 'name', label: 'Full Name', type: 'text' as const, required: true },
    { name: 'email', label: 'Email Address', type: 'email' as const, required: true },
    { name: 'phone', label: 'Phone Number', type: 'text' as const, required: true },
    { 
      name: 'password', 
      label: 'Password', 
      type: 'text' as const, 
      required: !isEditing,
      placeholder: isEditing ? 'Leave blank to keep current password' : 'Enter password'
    },
  ]

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone' },
    {
      key: 'registration',
      header: 'Application Status',
      render: (value: any) => (
        value ? (
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
            Applied ({value.status})
          </span>
        ) : (
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
            Not Applied
          </span>
        )
      ),
    },
    {
      key: 'createdAt',
      header: 'Joined Date',
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_: any, row: any) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setEditingStudent(row)
              setIsModalOpen(true)
            }}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded"
            title="Edit"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => deleteStudent(row.id)}
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
          <h1 className="text-3xl font-bold text-[#1a5c2e]">Students</h1>
          <button
            onClick={() => {
              setEditingStudent(null)
              setIsModalOpen(true)
            }}
            className="px-4 py-2 bg-[#f4a61d] text-[#1a5c2e] rounded-lg hover:bg-[#e59515] flex items-center gap-2"
          >
            <Plus size={20} />
            Add Student Account
          </button>
        </div>

        {loading ? (
          <div className="text-gray-600">Loading...</div>
        ) : (
          <DataTable columns={columns} data={students} />
        )}

        <CRUDModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingStudent(null)
          }}
          title={editingStudent ? 'Edit Student Account' : 'Add Student Account'}
          onSubmit={handleSave}
          fields={getFields(!!editingStudent)}
          initialData={editingStudent}
        />
      </main>
    </div>
  )
}
