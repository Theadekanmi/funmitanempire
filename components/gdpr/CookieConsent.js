'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
      timestamp: new Date().toISOString()
    }))
    setShowBanner(false)
  }

  const acceptNecessary = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
      timestamp: new Date().toISOString()
    }))
    setShowBanner(false)
  }

  const customizeSettings = () => {
    setShowDetails(!showDetails)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-orange-600 shadow-2xl z-50">
      <div className="max-w-7xl mx-auto p-4">
        {!showDetails ? (
          // Simple consent banner
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🍪 We value your privacy
              </h3>
              <p className="text-sm text-gray-600">
                We use cookies to enhance your browsing experience, serve personalized content, 
                and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. 
                <Link href="/privacy-policy" className="text-orange-600 hover:text-orange-700 underline ml-1">
                  Read our Privacy Policy
                </Link>
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:flex-nowrap">
              <button
                onClick={acceptNecessary}
                className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Necessary Only
              </button>
              <button
                onClick={customizeSettings}
                className="px-4 py-2 text-sm bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
              >
                Customize
              </button>
              <button
                onClick={acceptAll}
                className="px-6 py-2 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          // Detailed cookie settings
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Cookie Settings</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="grid gap-4 max-h-64 overflow-y-auto">
              {/* Necessary Cookies */}
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Necessary Cookies</h4>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">Always Active</span>
                </div>
                <p className="text-sm text-gray-600">
                  Essential for the website to function properly. Includes authentication, cart, and security features.
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Analytics Cookies</h4>
                  <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                </div>
                <p className="text-sm text-gray-600">
                  Help us understand how visitors interact with our website by collecting anonymous information.
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Marketing Cookies</h4>
                  <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                </div>
                <p className="text-sm text-gray-600">
                  Used to show you relevant advertisements and measure the effectiveness of our marketing campaigns.
                </p>
              </div>

              {/* Preference Cookies */}
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Preference Cookies</h4>
                  <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                </div>
                <p className="text-sm text-gray-600">
                  Remember your preferences and settings to provide a personalized experience.
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-gray-200">
              <button
                onClick={acceptNecessary}
                className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Save Selection
              </button>
              <button
                onClick={acceptAll}
                className="px-6 py-2 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                Accept All
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
