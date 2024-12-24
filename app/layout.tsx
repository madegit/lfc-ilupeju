import { Sedgwick_Ave, Manrope } from 'next/font/google'
import './globals.css'

const protestRevolution = Sedgwick_Ave({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-protest-revolution',
})

const outfit = Manrope({ 
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
      <body className={outfit.className}>{children}</body>
    </html>
  )
}
