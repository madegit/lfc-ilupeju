import { Event } from '@/types/event'

export function addToCalendar(event: Event) {
  const { title, description, date, time, location } = event
  const [hours, minutes] = time.split(':').map(Number)
  const startTime = new Date(date)
  startTime.setHours(hours, minutes)
  const endTime = new Date(startTime.getTime() + 60 * 60 * 1000) // Assume 1 hour duration

  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&dates=${startTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`

  window.open(googleCalendarUrl, '_blank')
}

