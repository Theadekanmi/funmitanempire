import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Terms of Service - Website Terms & Conditions',
  description: 'Read our terms of service for shopping at Funmitan Empire Limited. Your rights and responsibilities as our customer.',
  keywords: ['terms of service', 'terms and conditions', 'user agreement', 'legal terms'],
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
              <p className="text-lg text-gray-600">
                Last updated: January 1, 2024
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700">
                  By accessing and using the Funmitan Empire Limited website, you accept and agree to be bound 
                  by the terms and provision of this agreement. If you do not agree to abide by the above, 
                  please do not use this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Products and Services</h2>
                <p className="text-gray-700 mb-4">
                  Funmitan Empire Limited offers authentic African fashion, fabrics, and accessories. We strive to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Provide accurate product descriptions and images</li>
                  <li>Maintain high quality standards</li>
                  <li>Process orders promptly</li>
                  <li>Offer excellent customer service</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Ordering and Payment</h2>
                <p className="text-gray-700 mb-4">
                  When you place an order with us:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>All orders are subject to acceptance and availability</li>
                  <li>Prices are in GBP and include VAT where applicable</li>
                  <li>Payment is processed securely through PayPal</li>
                  <li>We reserve the right to refuse or cancel orders</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Shipping and Delivery</h2>
                <p className="text-gray-700 mb-4">
                  Our shipping policy includes:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Free delivery to UK mainland postcodes</li>
                  <li>Free delivery for core Manchester areas</li>
                  <li>International shipping available (charges apply)</li>
                  <li>Delivery times are estimates and not guaranteed</li>
                  <li>Risk of loss passes to customer upon delivery</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Returns and Exchanges</h2>
                <p className="text-gray-700 mb-4">
                  Our return policy:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>30-day return window from delivery date</li>
                  <li>Items must be unused and in original condition</li>
                  <li>Custom/bespoke items may not be returnable</li>
                  <li>Customer responsible for return shipping costs</li>
                  <li>Refunds processed within 5-10 business days</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
                <p className="text-gray-700">
                  All content on this website, including but not limited to text, graphics, logos, images, 
                  and software, is the property of Funmitan Empire Limited and is protected by copyright 
                  and other intellectual property laws.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. User Conduct</h2>
                <p className="text-gray-700 mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Use the website for any unlawful purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Upload malicious code or content</li>
                  <li>Interfere with the website's functionality</li>
                  <li>Harass other users or our staff</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
                <p className="text-gray-700">
                  To the fullest extent permitted by law, Funmitan Empire Limited shall not be liable for 
                  any indirect, incidental, special, consequential, or punitive damages, or any loss of 
                  profits or revenues, whether incurred directly or indirectly.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Governing Law</h2>
                <p className="text-gray-700">
                  These terms shall be governed by and construed in accordance with the laws of England and Wales. 
                  Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">
                    <strong>Funmitan Empire Limited</strong><br/>
                    Email: funmitanempire@gmail.com<br/>
                    Phone: +447368369348<br/>
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