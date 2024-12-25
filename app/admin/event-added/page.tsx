import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { CheckCircle } from 'lucide-react'

export default function EventAdded() {
  return (
    <div className="container mx-auto px-4 py-40 text-center">
      <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
      <h1 className="text-3xl font-bold mb-4 tracking-tight">Event Added Successfully</h1>
      <p className="mb-8 tracking-tight">Your event has been added to the calendar.</p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/events">View All Events</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/admin/add-event">Add Another Event</Link>
        </Button>
      </div>
    </div>
  )
}