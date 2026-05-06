'use client'

import { useEffect, useState } from 'react'
import AdminSidebar from '@/components/AdminSidebar'
import { Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import CRUDModal from '@/components/CRUDModal'

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    try {
      const response = await fetch('/api/gallery')
      const data = await response.json()
      setGallery(data)
    } catch (error) {
      console.error('Failed to fetch gallery:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (data: any) => {
    try {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success('Gallery item added!')
        setIsModalOpen(false)
        fetchGallery()
      }
    } catch (error) {
      toast.error('Failed to add gallery item')
    }
  }

  const deleteItem = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Item deleted!')
        fetchGallery()
      }
    } catch (error) {
      toast.error('Failed to delete item')
    }
  }

  const fields = [
    { name: 'albumName', label: 'Album Name', type: 'text' as const, required: true },
    { name: 'imageUrl', label: 'Image URL', type: 'text' as const, required: true },
    { name: 'caption', label: 'Caption', type: 'text' as const, required: false },
    { name: 'category', label: 'Category', type: 'select' as const, options: ['Sports', 'Annual Day', 'Campus', 'Science Fair'], required: true },
  ]

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#1a5c2e]">Gallery</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-[#f4a61d] text-[#1a5c2e] rounded-lg hover:bg-[#e59515] flex items-center gap-2"
          >
            <Plus size={20} />
            Add Item
          </button>
        </div>

        {loading ? (
          <div className="text-gray-600">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden relative group">
                <img src={item.imageUrl} alt={item.caption} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-[#1a5c2e]">{item.albumName}</h3>
                  <p className="text-gray-600 text-sm">{item.caption}</p>
                  <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {item.category}
                  </span>
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        <CRUDModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add Gallery Item"
          onSubmit={handleSave}
          fields={fields}
        />
      </main>
    </div>
  )
}
