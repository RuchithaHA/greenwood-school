'use client'

import { useEffect, useState } from 'react'

interface Event {
  id: number
  title: string
  description: string
  eventDate: string
  category: string
  imageUrl?: string
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

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

  const today = new Date()
  const upcomingEvents = events.filter((e) => new Date(e.eventDate) >= today)
  const pastEvents = events.filter((e) => new Date(e.eventDate) < today)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-[#1a5c2e] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Events</h1>
          <p className="text-xl">Stay Updated with School Activities</p>
        </div>
      </section>

      {loading ? (
        <div className="py-20 text-center text-gray-600">Loading events...</div>
      ) : (
        <div className="py-16">
          <div className="container mx-auto px-4">
            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
              <>
                <h2 className="text-4xl font-bold text-[#1a5c2e] mb-8">Upcoming Events</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      {event.imageUrl && (
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-3 py-1 bg-[#f4a61d] text-[#1a5c2e] text-sm font-semibold rounded-full">
                            {event.category}
                          </span>
                          <span className="text-gray-600 text-sm">{formatDate(event.eventDate)}</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#1a5c2e] mb-2">{event.title}</h3>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Past Events */}
            {pastEvents.length > 0 && (
              <>
                <h2 className="text-4xl font-bold text-[#1a5c2e] mb-8">Past Events</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastEvents.map((event) => (
                    <div
                      key={event.id}
                      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow opacity-75"
                    >
                      {event.imageUrl && (
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm font-semibold rounded-full">
                            {event.category}
                          </span>
                          <span className="text-gray-600 text-sm">{formatDate(event.eventDate)}</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#1a5c2e] mb-2">{event.title}</h3>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {events.length === 0 && (
              <div className="text-center text-gray-600 py-20">
                No events scheduled at this time.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
