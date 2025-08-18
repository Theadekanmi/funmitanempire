'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { newsletter } from '@/utils/api'
import toast from 'react-hot-toast'

export default function NewsletterPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email.trim()) {
      toast.error('Please enter your email address')
      return
    }

    setLoading(true)
    try {
      await newsletter.subscribe(email)
      toast.success('Successfully subscribed to our newsletter!')
      setEmail('')
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      toast.error('Failed to subscribe. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h1>
          <p className="text-xl text-gray-600">
            Get the latest fashion trends, exclusive offers, and new arrivals delivered to your inbox
          </p>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join Our Fashion Community
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Be the first to know about new collections, sales, and styling tips
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📬</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Weekly Updates
            </h3>
            <p className="text-gray-600">
              Get curated fashion content and styling tips every week
            </p>
          </div>

          <div className="text-center">
            <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎁</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Exclusive Offers
            </h3>
            <p className="text-gray-600">
              Access subscriber-only discounts and early sale access
            </p>
          </div>

          <div className="text-center">
            <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              New Arrivals
            </h3>
            <p className="text-gray-600">
              Be the first to discover our latest collections and designs
            </p>
          </div>
        </div>

        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            What Our Subscribers Say
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6">
              <p className="text-gray-600 mb-4">
                "I love the weekly styling tips and always get excited about the new arrivals emails!"
              </p>
              <div className="font-medium text-gray-900">Sarah M.</div>
            </div>
            <div className="bg-white rounded-lg p-6">
              <p className="text-gray-600 mb-4">
                "The exclusive discounts are amazing. I've saved so much money on beautiful pieces!"
              </p>
              <div className="font-medium text-gray-900">Jessica L.</div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            We respect your privacy. Unsubscribe at any time.
            <br />
            By subscribing, you agree to our Privacy Policy and Terms of Service.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
