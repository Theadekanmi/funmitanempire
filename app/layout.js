import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <title>Funmitan Empire - African Fashion & Fabrics | UK Fashion Store</title>
        <meta name="description" content="Discover premium fashion wear for women, teens, and men. Quality fabrics, gele, and ready-made designs. Fast UK delivery, Manchester free shipping. Shop authentic African fashion." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div>Testing - Frontend is working!</div>
        {children}
      </body>
    </html>
  )
}