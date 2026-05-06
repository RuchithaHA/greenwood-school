'use client'

import { useEffect, useState } from 'react'
import AdminSidebar from '@/components/AdminSidebar'
import DataTable from '@/components/DataTable'
import CRUDModal from '@/components/CRUDModal'
import { Plus, Trash2, Edit } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminEventsPage() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<any>(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events')
      const data = await response.json()
      setEvents(data)
    } catch (error) {
      console.error('Failed to fetch events:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (data: any) => {
    try {
      const url = editingEvent ? `/api/events/${editingEvent.id}` : '/api/events'
      const method = editingEvent ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success(editingEvent ? 'Event updated!' : 'Event added!')
        setIsModalOpen(false)
        setEditingEvent(null)
        fetchEvents()
      }
    } catch (error) {
      toast.error('Failed to save event')
    }
  }

  const deleteEvent = async (id: number) => {
    if (!confirm('Are you sure you want to delete this event?')) return

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Event deleted!')
        fetchEvents()
      }
    } catch (error) {
      toast.error('Failed to delete event')
    }
  }

  const fields = [
    { name: 'title', label: 'Title', type: 'text' as const, required: true },
    { name: 'description', label: 'Description', type: 'textarea' as const, required: true },
    { name: 'eventDate', label: 'Event Date', type: 'date' as const, required: true },
    { name: 'category', label: 'Category', type: 'select' as const, options: ['Cultural', 'Sports', 'Academic'], required: true },
    { name: 'imageUrl', label: 'Image URL', type: 'text' as const, required: false },
  ]

  const columns = [
    { key: 'title', header: 'Title' },
    {
      key: 'eventDate',
      header: 'Date',
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    { key: 'category', header: 'Category' },
    {
      key: 'actions',
      header: 'Actions',
      render: (_: any, row: any) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setEditingEvent(row)
              setIsModalOpen(true)
            }}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded"
            title="Edit"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => deleteEvent(row.id)}
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
          <h1 className="text-3xl font-bold text-[#1a5c2e]">Events</h1>
          <button
            onClick={() => {
              setEditingEvent(null)
              setIsModalOpen(true)
            }}
            className="px-4 py-2 bg-[#f4a61d] text-[#1a5c2e] rounded-lg hover:bg-[#e59515] flex items-center gap-2"
          >
            <Plus size={20} />
            Add Event
          </button>
        </div>

        {loading ? (
          <div className="text-gray-600">Loading...</div>
        ) : (
          <DataTable columns={columns} data={events} />
        )}

        <CRUDModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingEvent(null)
          }}
          title={editingEvent ? 'Edit Event' : 'Add Event'}
          onSubmit={handleSave}
          fields={fields}
          initialData={editingEvent}
        />
      </main>
    </div>
  )
}
