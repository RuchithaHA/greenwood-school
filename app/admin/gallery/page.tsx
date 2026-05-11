'use client'

import { useEffect, useState } from 'react'
import AdminSidebar from '@/components/AdminSidebar'
import { Plus, Trash2, Edit, Eye, Image as ImageIcon, FolderOpen, Tag, X } from 'lucide-react'
import toast from 'react-hot-toast'
import CRUDModal from '@/components/CRUDModal'

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [selectedItem, setSelectedItem] = useState<any | null>(null)
  const [showPreviewModal, setShowPreviewModal] = useState(false)

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
      const url = editingItem ? `/api/gallery/${editingItem.id}` : '/api/gallery'
      const method = editingItem ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success(editingItem ? 'Gallery item updated!' : 'Gallery item added!')
        setIsModalOpen(false)
        setEditingItem(null)
        fetchGallery()
      }
    } catch (error) {
      toast.error('Failed to save gallery item')
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

  const viewDetails = (item: any) => {
    setSelectedItem(item)
    setShowPreviewModal(true)
  }

  const editItem = (item: any) => {
    setEditingItem(item)
    setIsModalOpen(true)
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
                <div className="relative">
                  <img 
                    src={item.imageUrl} 
                    alt={item.caption} 
                    className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => viewDetails(item)}
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found'
                    }}
                  />
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => viewDetails(item)}
                      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      title="View"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => editItem(item)}
                      className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[#1a5c2e] flex items-center">
                    <FolderOpen size={16} className="mr-2" />
                    {item.albumName}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{item.caption || 'No caption'}</p>
                  <span className="inline-flex items-center mt-2 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    <Tag size={12} className="mr-1" />
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <CRUDModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingItem(null)
          }}
          title={editingItem ? 'Edit Gallery Item' : 'Add Gallery Item'}
          onSubmit={handleSave}
          fields={fields}
          initialData={editingItem}
        />

        {/* Image Preview Modal */}
        {showPreviewModal && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[#1a5c2e]">Gallery Item Details</h2>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Image */}
                <div>
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.caption}
                    className="w-full h-auto max-h-96 object-contain rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found'
                    }}
                  />
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Album Name</p>
                    <p className="font-medium flex items-center">
                      <FolderOpen size={16} className="mr-2" />
                      {selectedItem.albumName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium flex items-center">
                      <Tag size={16} className="mr-2" />
                      {selectedItem.category}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Caption</p>
                    <p className="font-medium">{selectedItem.caption || 'No caption'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Created On</p>
                    <p className="font-medium">{new Date(selectedItem.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Image URL</p>
                    <p className="font-medium text-sm text-blue-600 truncate">{selectedItem.imageUrl}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    editItem(selectedItem)
                    setShowPreviewModal(false)
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Edit Item
                </button>
                <button
                  onClick={() => setShowPreviewModal(false)}
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
