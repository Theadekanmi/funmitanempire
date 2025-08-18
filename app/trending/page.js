'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductGrid from '@/components/products/ProductGrid'

export default function TrendingPage() {

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🔥 Trending Now
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the hottest fashion pieces everyone is talking about. 
            From traditional gele to modern ready-to-wear, these are our most popular items.
          </p>
        </div>

        {/* Trending Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">👗</div>
            <h3 className="font-semibold text-gray-900">Dresses</h3>
            <p className="text-sm text-gray-600">Elegant & Stylish</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">🧣</div>
            <h3 className="font-semibold text-gray-900">Gele</h3>
            <p className="text-sm text-gray-600">Traditional Beauty</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">✨</div>
            <h3 className="font-semibold text-gray-900">Fabrics</h3>
            <p className="text-sm text-gray-600">Premium Quality</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">👔</div>
            <h3 className="font-semibold text-gray-900">Men's Wear</h3>
            <p className="text-sm text-gray-600">Modern & Classic</p>
          </div>
        </div>

        {/* Trending Stats */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg p-8 text-white mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">1000+</div>
              <div className="text-orange-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold">50+</div>
              <div className="text-orange-100">Trending Items</div>
            </div>
            <div>
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-orange-100">Customer Support</div>
            </div>
          </div>
        </div>

        {/* Trending Products */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Most Popular Products</h2>
          
          <ProductGrid category="trending" />
        </div>

        {/* Social Proof */}
        <div className="bg-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Join the Trend!</h2>
          <p className="text-gray-600 mb-6">
            Follow us on social media to stay updated with the latest fashion trends and exclusive offers.
          </p>
          
          <div className="flex justify-center space-x-4">
            <a 
              href="https://www.facebook.com/share/1AHGWcKrWq/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              📘 Facebook
            </a>
            <a 
              href="https://instagram.com/funmitan2022" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
            >
              📸 Instagram
            </a>
            <a 
              href="https://tiktok.com/@funmitan2022" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              🎵 TikTok
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
