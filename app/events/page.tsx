import { Metadata } from 'next'
import { UpcomingEvents } from '@/components/UpcomingEvents'

export const metadata: Metadata = {
  title: 'Upcoming Events',
  description: 'Check out our upcoming events and add them to your calendar.',
}

export default function EventsPage() {
  return (
    <main>
      <UpcomingEvents />
    </main>
  )
}
