import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import { PlusCircle, Edit, Trash2 } from 'lucide-react'

async function getEvents() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch events')
  }
  return res.json()
}

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return <div>Access Denied</div>
  }
  const events = await getEvents()

  return (
    <div className="min-h-screen bg-no-repeat bg-cover bg-center py-24 bg-[url('/events.jpg')] flex items-center justify-center">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl text-white tracking-tighter mb-8 text-center">Manage Events</h1>
        <div className="bg-white rounded-2xl shadow-sm p-8 max-w-5xl mx-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-700">Title</TableHead>
                <TableHead className="text-gray-700">Date</TableHead>
                <TableHead className="text-gray-700">Time</TableHead>
                <TableHead className="text-gray-700">Location</TableHead>
                <TableHead className="text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event: any) => (
                <TableRow key={event._id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{format(new Date(event.date), "MMMM d, yyyy")}</TableCell>
                  <TableCell>{event.time}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>
                    <Button asChild size="sm" className="mr-2 bg-yellow-500 hover:bg-yellow-600">
                      <Link href={`/admin/edit-event/${event._id}`}><Edit className="w-4 h-4 mr-1" /> Edit</Link>
                    </Button>
                    <Button variant="destructive" size="sm"><Trash2 className="w-4 h-4 mr-1" /> Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-8 text-center">
            <Button asChild className="rounded-xl bg-red-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105">
              <Link href="/admin/add-event"><PlusCircle className="w-5 h-5 mr-2" /> Add New Event</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

