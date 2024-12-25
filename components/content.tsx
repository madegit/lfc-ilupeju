import Image from 'next/image'

export function Content() {
  return (
    <div className="bg-gray text-white py-24">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold">
              <span className="text-yellow-400 font-protest-revolution">Where faith meets family.</span>
            </h2>
            
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                Welcome to Living Faith Church, Ilupeju Ekiti, where faith meets family. We are committed to spreading the love of Christ through worship, community, and impactful service.
              </p>
              
           
              <p>
                Join us in celebrating God’s grace and building a stronger community together.
              </p>
            </div>
          </div>
          
          <div className="relative h-[600px]">
            <div 
              className="absolute top-0 left-0 w-[90%] h-72 rounded-2xl overflow-hidden shadow-xl"
              style={{ transform: 'rotate(-3deg)' }}
            >
              <Image
                src="/pastor.jpg?height=400&width=600"
                alt="Team working"
                fill
                className="object-cover"
              />
            </div>
            
            <div 
              className="absolute top-64 left-10 w-[90%] h-72 rounded-2xl overflow-hidden shadow-xl"
              style={{ transform: 'rotate(2deg)' }}
            >
              <Image
                src="/community.jpg?height=400&width=600"
                alt="Team photo"
                fill
                className="object-cover"
              />
            </div>
            
            <div 
              className="absolute bottom-0 right-0 bg-red-500 rounded-full p-6 text-center shadow-xl"
              style={{ transform: 'rotate(12deg)' }}
            >
              <span className="block text-xs font-medium text-white">COMMUNITY OUTREACH</span>
              <span className="block text-3xl font-bold text-white">❤ 4+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

