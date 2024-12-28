'use client'

import { useState, useEffect, useRef } from 'react'
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { addToCalendar } from '@/lib/calendar'
import { motion } from 'framer-motion'

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
  const [currentIndex, setCurrentIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/events')
        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }
        const data = await response.json()
        setEvents(data)
      } catch {
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

    return (
      <div className="bg-gray-100 rounded-md p-2 mb-4">
        <span className="text-sm font-medium text-gray-600 block">{dateLabel}</span>
        <span className="text-lg font-semibold text-gray-800 block">{event.time}</span>
      </div>
    )
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === events.length - 1 ? 0 : prevIndex + 1
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
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              ref={sliderRef}
              className="flex transition-all duration-300 ease-in-out"
              animate={{
                x: `${-currentIndex * 100}%`,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {events.map((event) => (
                <div key={event._id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-4">
                  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
                    <div className="flex items-start gap-4 mb-4">
                      {getDateBox(event)}
                      <div className="flex-1 min-w-0 mb-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
                        <p className="text-sm text-gray-600">{event.description.substring(0, 100)}...</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="self-end mt-auto"
                      onClick={() => addToCalendar(event)}
                    >
                      <Plus className="h-4 w-4 mr-1.5" />
                      <span>Add to calendar</span>
                    </Button>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2"
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

