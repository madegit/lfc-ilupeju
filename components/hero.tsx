"use client"

import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  return (
    <div className="min-h-[90vh] md:min-h-screen pt-20 flex flex-col relative">
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.jpg"
          alt="Church background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <main className="flex-grow flex items-center justify-center relative z-10 px-4 md:px-0">
        <div className="text-center text-white">
          <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-6xl md:mb-6 tracking-tighter">
            <span className="py-4">Welcome to </span> <br />
            <span className="text-6xl py-2 md:text-6xl mb-6 lg:text-8xl xl:text-10xl font-protest-revolution text-yellow-400">Living Faith Church</span>
            <br /> <span className="py-2">Ilupeju-Ekiti</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-xl xl:text-2xl mx-10 tracking-tight my-4 md:mb-8">
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

