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
  const [isMobile, setIsMobile] = useState(false)

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

    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
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
      <div className={`flex flex-col items-center justify-center w-[100px] h-[72px] ${bgColor} rounded-xl border`}>
        <span className="text-xs font-medium text-gray-600 tracking-tight">{dateLabel}</span>
        <span className="text-xl font-bold text-gray-900 tracking-tight">{event.time}</span>
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

  const visibleCards = isMobile ? 1 : 3
  const totalSlides = Math.ceil(events.length / visibleCards)

  if (loading) {
    return <div className="text-center py-8">Loading events...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>
  }

  return (
    <div className="bg-white py-20 bg-no-repeat bg-cover bg-[url('/events.jpg')] bg-center flex items-center justify-center" >
      <div className="container mx-auto px-6 md:px-14">
        <h2 className="text-5xl font-protest-revolution md:text-6xl font-bold text-yellow-500 my-10">
          Upcoming Events
        </h2>
        <div className="relative w-full max-w-6xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              ref={sliderRef}
              className="flex"
              animate={{
                x: `${-currentIndex * (100 / visibleCards)}%`,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {events.map((event) => (
                <motion.div
                  key={event._id}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-white bg-opacity-95 backdrop-filter backdrop-blur-md rounded-3xl shadow-sm p-6 flex flex-col h-full">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
                      {getDateBox(event)}
                      <div className="flex-1 min-w-0 text-center sm:text-left">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 tracking-tighter">{event.title}</h3>
                        <p className="text-sm text-gray-600 leading-snug tracking-tight">{event.description.substring(0, 60)}...</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="rounded-xl border border-gray-200 self-center sm:self-end mt-auto text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      onClick={() => addToCalendar(event)}
                    >
                      <Plus className="h-4 w-4 mr-1.5" />
                      <span className="tracking-tight">Add to calendar</span>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -left-1 shadow-md transform -translate-y-1/2 -translate-x-1/2 rounded-full"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -right-1 transform -translate-y-1/2 translate-x-1/2 rounded-full"
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <div className="flex justify-center mt-4">
            {[...Array(totalSlides)].map((_, slideIndex) => (
              <button
                key={slideIndex}
                className={`h-2 w-2 rounded-full mx-1 ${
                  Math.floor(currentIndex / visibleCards) === slideIndex ? 'bg-gray-800' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentIndex(slideIndex * visibleCards)}
                aria-label={`Go to slide ${slideIndex + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}