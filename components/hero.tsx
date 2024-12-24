"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.jpg?height=1080&width=1920"
          alt="Church background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <header className="relative z-20">
        <nav className="container mx-auto px-4 py-4 md:py-6 flex flex-wrap justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/lfc.png?height=50&width=50"
              alt="Living Faith Church Logo"
              width={50}
              height={50}
            />
          </div>
          <div className="flex items-center md:hidden">
            <Link href="/contact" className="mr-4 inline-block bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-400 transition duration-300">
              Contact Us
            </Link>
            <button 
              className="text-white z-20"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
          <div className={`${isMenuOpen ? 'fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm' : 'hidden'} md:hidden`} onClick={() => setIsMenuOpen(false)}></div>
          <ul className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row fixed md:relative inset-x-0 top-0 md:top-auto h-[80%] md:h-auto overflow-y-auto md:overflow-visible bg-black bg-opacity-80 md:bg-transparent p-4 md:p-0 space-y-4 md:space-y-0 md:space-x-10 text-white text-md md:text-lg tracking-tight transition-all duration-300 ease-in-out z-30`}>
            <li className="mt-16 md:mt-0"><Link href="/" className="block py-2 hover:underline">Home</Link></li>
            <li><Link href="/about" className="block py-2 hover:underline">About Us</Link></li>
            <li><Link href="/events" className="block py-2 hover:underline">Events</Link></li>
            <li><Link href="/gallery" className="block py-2 hover:underline">Gallery</Link></li>
            <li><Link href="/projects" className="block py-2 hover:underline">Projects</Link></li>
          </ul>
          <div className="hidden md:block">
            <Link href="/contact" className="inline-block bg-red-500 text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-red-400 transition duration-300">
              Contact Us
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow flex items-center justify-center relative z-10 px-4 md:px-0">
        <div className="text-center text-white">
          <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-6xl md:mb-6 tracking-tighter">
            <span className="py-4">Welcome to </span> <br />
            <span className="text-6xl py-2 md:text-6xl mb-6 lg:text-8xl xl:text-10xl font-protest-revolution text-yellow-400">Living Faith Church</span>
            <br /> <span className="py-2">Ilupeju-Ekiti</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-xl xl:text-2xl tracking-tight my-4 md:mb-8">
            Experience Faith, Community, and Love.
          </p>
          <Link href="/join-us" className="inline-block border-2 border-yellow-400 text-yellow-400 px-6 py-2 md:px-8 md:py-3 rounded-full text-base md:text-lg font-semibold hover:bg-yellow-400 hover:text-gray-900 transition duration-300">
            Join Us Today
          </Link>
        </div>
      </main>
    </div>
  )
}

