'use client'

import { useEffect, useState } from 'react'

interface GalleryItem {
  id: number
  albumName: string
  imageUrl: string
  caption?: string
  category: string
}

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

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

  const categories = ['All', 'Sports', 'Annual Day', 'Campus', 'Science Fair']
  const filteredGallery =
    selectedCategory === 'All'
      ? gallery
      : gallery.filter((item) => item.category === selectedCategory)

  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-[#1a5c2e] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Gallery</h1>
          <p className="text-xl">Capturing Moments at Greenwood School</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#f4a61d] text-[#1a5c2e]'
                    : 'bg-white text-[#1a5c2e] hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      {loading ? (
        <div className="py-20 text-center text-gray-600">Loading gallery...</div>
      ) : (
        <section className="py-16">
          <div className="container mx-auto px-4">
            {filteredGallery.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGallery.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                    onClick={() => setSelectedImage(item)}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.caption || item.albumName}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-[#1a5c2e]">{item.albumName}</h3>
                      {item.caption && (
                        <p className="text-gray-600 text-sm mt-1">{item.caption}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-600 py-20">
                No images found in this category.
              </div>
            )}
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.caption || selectedImage.albumName}
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white text-4xl hover:text-[#f4a61d]"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            {selectedImage.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                <p className="text-center">{selectedImage.caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
