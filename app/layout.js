'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/hooks/useAuth'
import { CartProvider } from '@/hooks/useCart'
import { WishlistProvider } from '@/hooks/useWishlist'
import CookieConsent from '@/components/gdpr/CookieConsent'
import DebugConsole from '@/components/debug/DebugConsole'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <title>Funmitan Empire - African Fashion & Fabrics | UK Fashion Store</title>
        <meta name="description" content="Discover premium fashion wear for women, teens, and men. Quality fabrics, gele, and ready-made designs. Fast UK delivery, Manchester free shipping. Shop authentic African fashion." />
        <meta name="keywords" content="fashion, African fashion, gele, fabrics, women's clothing, men's clothing, teens fashion, UK fashion store, Manchester delivery, African fabrics" />
        <meta name="author" content="Funmitan Empire Limited" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://funmitanempire.com/" />
        <meta property="og:title" content="Funmitan Empire - African Fashion & Fabrics" />
        <meta property="og:description" content="Discover premium fashion wear for women, teens, and men. Quality fabrics, gele, and ready-made designs." />
        <meta property="og:image" content="https://funmitanempire.com/funmitan-logo.svg" />
        <meta property="og:site_name" content="Funmitan Empire" />
        <meta property="og:locale" content="en_GB" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://funmitanempire.com/" />
        <meta property="twitter:title" content="Funmitan Empire - African Fashion & Fabrics" />
        <meta property="twitter:description" content="Discover premium fashion wear for women, teens, and men. Quality fabrics, gele, and ready-made designs." />
        <meta property="twitter:image" content="https://funmitanempire.com/funmitan-logo.svg" />
        
        {/* Additional SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#dd6b20" />
        <meta name="msapplication-TileColor" content="#dd6b20" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://funmitanempire.com/" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Funmitan Empire Limited",
              "url": "https://funmitanempire.com",
              "logo": "https://funmitanempire.com/funmitan-logo.svg",
              "description": "African fashion wear for women, teens, and men. Quality fabrics, gele, and ready-made designs.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Manchester",
                "addressCountry": "GB"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+44 7368369348",
                "contactType": "customer service",
                "email": "funmitanempire@gmail.com"
              },
              "sameAs": [
                "https://facebook.com/funmitanempire",
                "https://instagram.com/funmitanempire",
                "https://tiktok.com/@funmitanempire"
              ]
            })
          }}
        />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              {children}
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  className: 'text-sm font-medium',
                  success: { style: { background: '#10b981', color: 'white' } },
                  error: { style: { background: '#ef4444', color: 'white' } },
                }}
              />
              <CookieConsent />
              <DebugConsole />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}