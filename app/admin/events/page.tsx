'use client'

import { useEffect, useState } from 'react'
import AdminSidebar from '@/components/AdminSidebar'
import DataTable from '@/components/DataTable'
import CRUDModal from '@/components/CRUDModal'
import { Plus, Trash2, Edit, Eye, Calendar, Tag, Image as ImageIcon, X } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminEventsPage() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<any>(null)
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

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

  const viewDetails = (event: any) => {
    setSelectedEvent(event)
    setShowDetailsModal(true)
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
            onClick={() => viewDetails(row)}
            className="p-2 text-purple-600 hover:bg-purple-100 rounded"
            title="View Details"
          >
            <Eye size={18} />
          </button>
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

        {/* Event Details Modal */}
        {showDetailsModal && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#1a5c2e]">Event Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Event Header */}
                <div>
                  <h3 className="text-xl font-semibold text-[#1a5c2e] mb-2">{selectedEvent.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      {new Date(selectedEvent.eventDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Tag size={16} className="mr-1" />
                      {selectedEvent.category}
                    </span>
                  </div>
                </div>

                {/* Event Image */}
                {selectedEvent.imageUrl && (
                  <div>
                    <h4 className="text-lg font-semibold text-[#1a5c2e] mb-2 flex items-center">
                      <ImageIcon size={20} className="mr-2" />
                      Event Image
                    </h4>
                    <img
                      src={selectedEvent.imageUrl}
                      alt={selectedEvent.title}
                      className="w-full h-64 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x200?text=No+Image'
                      }}
                    />
                  </div>
                )}

                {/* Event Description */}
                <div>
                  <h4 className="text-lg font-semibold text-[#1a5c2e] mb-2">Description</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedEvent.description}</p>
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Event Date</p>
                    <p className="font-medium">{new Date(selectedEvent.eventDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium">{selectedEvent.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Created On</p>
                    <p className="font-medium">{new Date(selectedEvent.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="font-medium">{new Date(selectedEvent.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => {
                    setEditingEvent(selectedEvent)
                    setShowDetailsModal(false)
                    setIsModalOpen(true)
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Edit Event
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
