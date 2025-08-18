'use client'

import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductGrid from '@/components/products/ProductGrid'
import CategoryBanner from '@/components/products/CategoryBanner'

const products = [
  {
    id: 2,
    name: 'African Print Wrap Top',
    price: 32.99,
    originalPrice: 45.99,
    image: '/products/women/top1.jpg',
    category: 'Tops',
    isNew: false,
    isSale: true,
    rating: 4.7,
    reviews: 89,
    colors: ['Green', 'Purple'],
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 3,
    name: 'Traditional Gele Headwrap',
    price: 34.99,
    originalPrice: 49.99,
    image: '/products/women/gele1.jpg',
    category: 'Accessories',
    isNew: false,
    isSale: true,
    rating: 4.9,
    reviews: 156,
    colors: ['Gold', 'Silver', 'Rose Gold'],
    sizes: ['One Size'],
  },
  {
    id: 12,
    name: 'Trendy High-Waist Jeans',
    price: 54.99,
    originalPrice: 74.99,
    image: '/products/teens/jeans1.jpg',
    category: 'Bottoms',
    isNew: false,
    isSale: true,
    rating: 4.8,
    reviews: 156,
    colors: ['Light Blue', 'Dark Blue', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 22,
    name: 'Embroidered Dashiki Shirt',
    price: 79.99,
    originalPrice: 99.99,
    image: '/products/men/dashiki1.jpg',
    category: 'Shirts',
    isNew: false,
    isSale: true,
    rating: 4.7,
    reviews: 89,
    colors: ['Black', 'Royal Blue', 'Green'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 32,
    name: 'Authentic Wax Print - Floral',
    price: 32.99,
    originalPrice: 42.99,
    image: '/products/fabrics/wax1.jpg',
    category: 'Wax Print',
    isNew: false,
    isSale: true,
    rating: 4.8,
    reviews: 98,
    colors: ['Purple Multi', 'Orange Multi', 'Pink Multi'],
    sizes: ['Per Yard'],
    unit: 'per yard',
  },
  {
    id: 42,
    name: 'Embroidered Head Wrap',
    price: 45.99,
    originalPrice: 65.99,
    image: '/products/gele/embroidered1.jpg',
    category: 'Embroidered',
    isNew: false,
    isSale: true,
    rating: 4.8,
    reviews: 89,
    colors: ['Royal Blue', 'Deep Purple', 'Emerald Green'],
    sizes: ['One Size'],
  },
  {
    id: 36,
    name: 'Batik Style African Print',
    price: 28.99,
    originalPrice: 35.99,
    image: '/products/fabrics/batik1.jpg',
    category: 'Batik',
    isNew: false,
    isSale: true,
    rating: 4.6,
    reviews: 78,
    colors: ['Indigo Multi', 'Brown Multi', 'Green Multi'],
    sizes: ['Per Yard'],
    unit: 'per yard',
  },
  {
    id: 46,
    name: 'Cotton Head Wrap Set',
    price: 28.99,
    originalPrice: 39.99,
    image: '/products/gele/cotton-set1.jpg',
    category: 'Cotton',
    isNew: false,
    isSale: true,
    rating: 4.6,
    reviews: 203,
    colors: ['Earth Tones', 'Bright Multi', 'Pastels'],
    sizes: ['One Size'],
  }
]

const categoryInfo = {
  title: "Sale - Amazing Deals on African Fashion",
  description: "Don't miss these incredible savings on our premium African fashion collection! From elegant dresses to authentic fabrics, discover discounts up to 50% off. Limited time offers on carefully selected items - shop now while stocks last!",
  totalProducts: products.length,
}

export default function SalePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Sale Banner */}
        <section className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white py-4">
          <div className="container-custom">
            <div className="flex items-center justify-center text-center">
              <div className="flex items-center space-x-4">
                <div className="animate-pulse">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-bold text-lg">SALE NOW ON!</span>
                <span className="text-yellow-300">Up to 50% Off Selected Items</span>
                <div className="animate-pulse">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CategoryBanner {...categoryInfo} />
        
        {/* Sale Stats */}
        <section className="py-12 bg-gradient-to-r from-red-50 to-pink-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-red-600 mb-2">50%</div>
                <div className="text-sm text-gray-600">Maximum Discount</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-pink-600 mb-2">{products.length}</div>
                <div className="text-sm text-gray-600">Items on Sale</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-purple-600 mb-2">FREE</div>
                <div className="text-sm text-gray-600">UK Delivery</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-green-600 mb-2">30</div>
                <div className="text-sm text-gray-600">Day Returns</div>
              </div>
            </div>
          </div>
        </section>
        
        <ProductGrid products={products} category="sale" />
        
        {/* Sale Newsletter */}
        <section className="section-padding bg-gradient-to-r from-red-600 to-pink-600 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Never Miss a Sale Again!
            </h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Be the first to know about our exclusive discounts, flash sales, and special offers. 
              Join our VIP list for early access to sales.
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:outline-none"
                />
                <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-red-200 mt-3">
                No spam, unsubscribe anytime. Special offers and early access only.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}