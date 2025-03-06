import { Sedgwick_Ave, Parkinsans } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import Footer from '@/components/Footer'
import { Providers } from '@/components/Providers'

export const metadata = {
  title: 'Living Faith Church - Ilupeju Ekiti',
  description: 'Welcome to Living Faith Church in Ilupeju Ekiti. Join us in worship, community, and service as we grow together in faith.',
}

const protestRevolution = Sedgwick_Ave({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-protest-revolution',
})

const outfit = Parkinsans({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${protestRevolution.variable} ${outfit.variable}`}>
      <body className={outfit.className}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

