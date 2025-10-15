'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/hooks/useAuth'
import { CartProvider } from '@/hooks/useCart'
import { WishlistProvider } from '@/hooks/useWishlist'
import CookieConsent from '@/components/gdpr/CookieConsent'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

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
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Header />
              <main className="pt-20">
                {children}
              </main>
              <Footer />
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  className: 'text-sm font-medium',
                  success: {
                    style: {
                      background: '#10b981',
                      color: 'white',
                    },
                  },
                  error: {
                    style: {
                      background: '#ef4444',
                      color: 'white',
                    },
                  },
                }}
              />
              <CookieConsent />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}