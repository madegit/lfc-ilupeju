'use client'

import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { addToCalendar } from '@/lib/calendar'

interface Event {
  _id: string
  title: string
  description: string
  date: string
  time: string
  location: string
}

export function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/events')
        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }
        const data = await response.json()
        setEvents(data)
      } catch (err) {
        setError('Failed to load events. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const getDateBox = (event: Event) => {
    const eventDate = new Date(event.date)
    const today = new Date()
    const isToday = eventDate.toDateString() === today.toDateString()
    const dateLabel = isToday ? 'TODAY' : `${eventDate.getDate()} - ${eventDate.getDate() + 9} ${eventDate.toLocaleString('default', { month: 'short' }).toUpperCase()}`

    let bgColor = 'bg-green-50'
    if (isToday) bgColor = 'bg-blue-50'
    else if (event.title.toLowerCase().includes('wool')) bgColor = 'bg-pink-50'
    else if (event.title.toLowerCase().includes('light')) bgColor = 'bg-rose-50'

    return (
      <div className={`flex flex-col items-center justify-center w-[100px] h-[72px] ${bgColor} rounded-xl`}>
        <span className="text-xs font-medium text-gray-600 tracking-tight">{dateLabel}</span>
        <span className="text-xl font-bold text-gray-900 tracking-tight">{event.time}</span>
      </div>
    )
  }

  if (loading) {
    return <div className="text-center py-8">Loading events...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>
  }

  return (
    <div className="bg-white py-24 bg-no-repeat bg-cover bg-[url('/events.jpg')] bg-center flex items-center justify-center" >
      <div className="container mx-auto px-6 md:px-14">
        <h2 className="text-4xl font-protest-revolution md:text-6xl font-bold text-yellow-500 my-8">
          Upcoming Events
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div key={event._id} className="bg-white rounded-2xl shadow-sm p-6 flex flex-col">
              <div className="flex items-start gap-4 mb-4">
                {getDateBox(event)}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 tracking-tighter">{event.title}</h3>
                  <p className="text-sm text-gray-600 leading-snug tracking-tight">{event.description.substring(0, 60)}...</p>
                      </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-xl border border-gray-200 self-end mt-auto text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                onClick={() => addToCalendar(event)}
              >
                <Plus className="h-4 w-4 mr-1.5" />
                <span className="tracking-tight">Add to calendar</span>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

