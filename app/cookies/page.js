import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Cookie Policy - How We Use Cookies',
  description: 'Learn about how Funmitan Empire Limited uses cookies to improve your browsing experience and website functionality.',
  keywords: ['cookie policy', 'cookies', 'tracking', 'website analytics'],
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
              <p className="text-lg text-gray-600">
                Last updated: January 1, 2024
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
                <p className="text-gray-700">
                  Cookies are small text files that are placed on your computer or mobile device when you visit 
                  our website. They help us provide you with a better experience by remembering your preferences 
                  and improving the functionality of our site.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Cookies</h2>
                <p className="text-gray-700 mb-4">
                  Funmitan Empire Limited uses cookies for several purposes:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>To remember your login status and preferences</li>
                  <li>To keep items in your shopping cart</li>
                  <li>To analyze website traffic and performance</li>
                  <li>To provide personalized content and recommendations</li>
                  <li>To ensure website security</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>
                
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Essential Cookies</h3>
                    <p className="text-blue-800">
                      These cookies are necessary for the website to function properly. They enable basic 
                      features like page navigation, shopping cart functionality, and secure areas access.
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-900 mb-2">Performance Cookies</h3>
                    <p className="text-green-800">
                      These cookies collect information about how visitors use our website, helping us 
                      improve site performance and user experience. All information is anonymous.
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-purple-900 mb-2">Functionality Cookies</h3>
                    <p className="text-purple-800">
                      These cookies remember your preferences and settings to provide a more personalized 
                      experience, such as your preferred language or region.
                    </p>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-orange-900 mb-2">Marketing Cookies</h3>
                    <p className="text-orange-800">
                      These cookies track your browsing habits to deliver relevant advertisements and 
                      measure the effectiveness of our marketing campaigns.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
                <p className="text-gray-700 mb-4">
                  We may also use third-party services that place cookies on your device:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li><strong>Google Analytics:</strong> To analyze website traffic and user behavior</li>
                  <li><strong>PayPal:</strong> For secure payment processing</li>
                  <li><strong>Social Media Platforms:</strong> For social sharing features</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Your Cookie Preferences</h2>
                <p className="text-gray-700 mb-4">
                  You have several options for managing cookies:
                </p>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Browser Settings</h3>
                  <p className="text-gray-700 text-sm">
                    Most web browsers allow you to control cookies through their settings. You can typically:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 text-sm mt-2 space-y-1">
                    <li>View cookies stored on your device</li>
                    <li>Delete existing cookies</li>
                    <li>Block all cookies</li>
                    <li>Block third-party cookies only</li>
                    <li>Get notifications when cookies are set</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 text-sm">
                    <strong>Note:</strong> Disabling certain cookies may affect the functionality of our website 
                    and limit your ability to use some features, such as the shopping cart or user account.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookie Consent</h2>
                <p className="text-gray-700">
                  By continuing to use our website, you consent to our use of cookies as described in this policy. 
                  We may update this policy from time to time, and we encourage you to review it periodically.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about our use of cookies, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">
                    <strong>Funmitan Empire Limited</strong><br/>
                    Email: funmitanempire@gmail.com<br/>
                    Phone: +44 (0) 20 1234 5678<br/>
                    Address: Manchester, United Kingdom
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}