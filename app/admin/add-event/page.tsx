"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, PlusCircle } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function AddEvent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      alert('You must be signed in to add an event');
      return;
    }

    const response = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, date, time, location }),
    });

    if (response.ok) {
      router.push('/admin/event-added');
    } else {
      alert('Error adding event');
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-no-repeat bg-cover bg-center py-24 bg-[url('/events.jpg')] flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md mx-auto">
          <p className="text-center text-xl font-medium text-gray-900">Access denied. Please sign in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-no-repeat bg-cover bg-center py-24 bg-[url('/events.jpg')] flex items-center justify-center">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl text-white tracking-tighter mb-8 text-center">Add New Event</h1>
        <div className="bg-white rounded-2xl shadow-sm p-8 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-1 tracking-tight">Title</label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="rounded-xl text-gray-900 focus:ring-yellow-500 focus:border-yellow-500 border-gray-300"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-1 tracking-tight">Description</label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="rounded-xl text-gray-900 focus:ring-yellow-500 focus:border-yellow-500 border-gray-300"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-900 mb-1 tracking-tight">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal rounded-xl border-gray-300 hover:border-gray-400 focus:ring-yellow-500 text-gray-900 focus:border-yellow-500",
                        !date && "text-gray-400"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                      {date ? format(date, "PPP") : <span className="text-gray-900">Select a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2 rounded-xl shadow-md border border-gray-200 bg-white text-gray-900">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="rounded-xl hover:bg-gray-100 focus:ring-yellow-500"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-900 mb-1 tracking-tight">Time</label>
                <Input
                  type="time"
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="rounded-xl text-gray-900 focus:ring-yellow-500 focus:border-yellow-500 border-gray-300 hover:border-gray-400 transition duration-150"
                />
              </div>
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-900 mb-1 tracking-tight">Location</label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="rounded-xl text-gray-900 focus:ring-yellow-500 focus:border-yellow-500 border-gray-300"
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                className="rounded-xl bg-red-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105 max-w-xs w-full"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Add New Event
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
