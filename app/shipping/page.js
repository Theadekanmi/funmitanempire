import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Shipping & Delivery Information - Funmitan Empire Limited',
  description: 'Learn about our shipping options. Free delivery to UK mainland postcodes and core Manchester areas. International shipping quotes available.',
  keywords: ['shipping', 'delivery', 'UK delivery', 'Manchester delivery', 'international shipping'],
}

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping & Delivery</h1>
              <p className="text-lg text-gray-600">
                Fast, reliable delivery options to get your African fashion to you quickly
              </p>
            </div>

            {/* UK Delivery */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 mb-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-900">Free UK Mainland Delivery</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-green-900 mb-3">Coverage</h3>
                  <ul className="text-green-800 space-y-2">
                    <li>✅ All UK mainland postcodes</li>
                    <li>✅ England, Scotland, Wales</li>
                    <li>✅ No minimum order required</li>
                    <li>⭐ Special: Free delivery for core Manchester areas</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-green-900 mb-3">Delivery Times</h3>
                  <ul className="text-green-800 space-y-2">
                    <li>🚚 Standard: 2-3 business days</li>
                    <li>⚡ Manchester core: Same day/Next day</li>
                    <li>📦 Tracking provided for all orders</li>
                    <li>📧 Email notifications</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* International Shipping */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-blue-900">International Shipping</h2>
              </div>
              
              <div className="text-blue-800 mb-4">
                <p className="mb-4">
                  We're proud to ship our authentic African fashion worldwide! 
                  Shipping costs vary by destination and order size.
                </p>
                
                <div className="bg-blue-100 rounded-lg p-4 mb-4">
                  <p className="font-medium">📞 Get Your Quote Today</p>
                  <p className="text-sm">Contact us with your location and items for a personalized shipping quote 🙏</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-blue-900 mb-3">Popular Destinations</h3>
                  <ul className="text-blue-800 space-y-1 text-sm">
                    <li>🇺🇸 United States: 7-14 days</li>
                    <li>🇨🇦 Canada: 7-14 days</li>
                    <li>🇦🇺 Australia: 10-21 days</li>
                    <li>🇳🇬 Nigeria: 7-14 days</li>
                    <li>🇬🇭 Ghana: 7-14 days</li>
                    <li>🇰🇪 Kenya: 10-21 days</li>
                    <li>🇿🇦 South Africa: 10-21 days</li>
                    <li>🇫🇷 France: 3-7 days</li>
                    <li>🇩🇪 Germany: 3-7 days</li>
                    <li>And many more...</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-blue-900 mb-3">What's Included</h3>
                  <ul className="text-blue-800 space-y-1 text-sm">
                    <li>✅ Secure packaging</li>
                    <li>✅ Tracking information</li>
                    <li>✅ Insurance coverage</li>
                    <li>✅ Customs documentation</li>
                    <li>✅ Email updates</li>
                    <li>⚠️ Customs fees may apply</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Order Processing */}
            <div className="bg-gray-50 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Processing</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Order Placed</h3>
                  <p className="text-sm text-gray-600">We receive and confirm your order immediately</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Processing</h3>
                  <p className="text-sm text-gray-600">1-2 business days for quality checks and packaging</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">3</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Shipped</h3>
                  <p className="text-sm text-gray-600">Your order is dispatched with tracking information</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">4</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Delivered</h3>
                  <p className="text-sm text-gray-600">Enjoy your beautiful African fashion!</p>
                </div>
              </div>
            </div>

            {/* Special Services */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-purple-900 mb-6">Special Delivery Services</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-purple-900 mb-3">Express Delivery</h3>
                  <p className="text-purple-800 mb-3">
                    Need your items urgently? We offer express delivery options for special occasions.
                  </p>
                  <ul className="text-purple-800 text-sm space-y-1">
                    <li>• Next day delivery available</li>
                    <li>• Perfect for events and weddings</li>
                    <li>• Contact us for availability</li>
                    <li>• Additional charges apply</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-purple-900 mb-3">Custom Orders</h3>
                  <p className="text-purple-800 mb-3">
                    Bespoke designs by Racheal may require additional time for creation.
                  </p>
                  <ul className="text-purple-800 text-sm space-y-1">
                    <li>• 2-4 weeks for custom designs</li>
                    <li>• Personal consultation included</li>
                    <li>• Regular progress updates</li>
                    <li>• Worth the wait for perfect fit!</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact for Shipping */}
            <div className="text-center bg-primary-600 text-white rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">Questions About Shipping?</h2>
              <p className="text-primary-100 mb-6">
                Our team is here to help with any shipping questions or special requests.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="btn-white">
                  Contact Customer Service
                </a>
                <a href="/track-order" className="btn-outline-white">
                  Track Your Order
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}