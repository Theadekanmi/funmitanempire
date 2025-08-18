import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Help & Customer Support - Get Assistance',
  description: 'Get help with your Funmitan Empire order, shipping, returns, and more. Customer support and frequently asked questions.',
  keywords: ['help', 'customer support', 'FAQ', 'assistance', 'customer service'],
}

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Help & Support</h1>
              <p className="text-lg text-gray-600">
                We're here to help you with any questions or concerns
              </p>
            </div>

            {/* Quick Contact */}
            <div className="bg-primary-50 border border-primary-200 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-primary-900 mb-4">Need Immediate Help?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-900">Email Support</h3>
                    <p className="text-primary-700">hello@funmitanempire.com</p>
                    <p className="text-sm text-primary-600">Response within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-900">Phone Support</h3>
                    <p className="text-primary-700">+44 (0) 20 1234 5678</p>
                    <p className="text-sm text-primary-600">Mon-Fri 9AM-5PM GMT</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                {/* Shipping & Delivery */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 text-blue-600">🚚 Shipping & Delivery</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Do you offer free delivery?</h4>
                      <p className="text-gray-600">Yes! We offer free delivery to all UK mainland postcodes and free delivery for core Manchester areas. International shipping is available with custom quotes.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">How long does delivery take?</h4>
                      <p className="text-gray-600">UK mainland orders typically arrive within 2-3 business days. Manchester core areas may receive same-day or next-day delivery.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Can I track my order?</h4>
                      <p className="text-gray-600">Yes! You'll receive tracking information via email once your order ships. You can also track your order <a href="/track-order" className="text-primary-600 hover:text-primary-700">here</a>.</p>
                    </div>
                  </div>
                </div>

                {/* Orders & Payments */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 text-green-600">💳 Orders & Payments</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">What payment methods do you accept?</h4>
                      <p className="text-gray-600">We accept PayPal and all major credit/debit cards. You don't need a PayPal account to pay with your card through our secure checkout.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Can I modify or cancel my order?</h4>
                      <p className="text-gray-600">Please contact us immediately at hello@funmitanempire.com if you need to modify or cancel your order. We'll do our best to accommodate changes before shipping.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Is my payment information secure?</h4>
                      <p className="text-gray-600">Yes, all payments are processed securely through PayPal's encrypted payment system. We never store your payment information on our servers.</p>
                    </div>
                  </div>
                </div>

                {/* Returns & Exchanges */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 text-purple-600">↩️ Returns & Exchanges</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">What is your return policy?</h4>
                      <p className="text-gray-600">We offer a 30-day return policy for unused items in original condition. Custom/bespoke items may have different terms.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">How do I return an item?</h4>
                      <p className="text-gray-600">Contact our support team to initiate a return. We'll provide you with return instructions and any necessary labels.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Who pays for return shipping?</h4>
                      <p className="text-gray-600">Customers are responsible for return shipping costs unless the item was defective or incorrectly sent.</p>
                    </div>
                  </div>
                </div>

                {/* Products & Sizing */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 text-orange-600">👗 Products & Sizing</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Do you offer custom sizing?</h4>
                      <p className="text-gray-600">Yes! Racheal offers bespoke African designs with custom sizing for men, women, and children. Contact us to discuss your requirements and pricing.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Are your fabrics authentic?</h4>
                      <p className="text-gray-600">Absolutely! All our fabrics are sourced directly from trusted suppliers and represent authentic African textiles and patterns.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">How do I care for my African fabrics?</h4>
                      <p className="text-gray-600">Care instructions vary by fabric type. We include specific care instructions with each order. Generally, gentle machine wash or hand wash in cold water is recommended.</p>
                    </div>
                  </div>
                </div>

                {/* Gele Services */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 text-pink-600">👑 Gele Services</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Do you offer Gele tying services?</h4>
                      <p className="text-gray-600">Yes! Racheal provides professional Gele tying services for special occasions. Basic styling starts at £25. <a href="/gele" className="text-primary-600 hover:text-primary-700">Learn more</a>.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">How do I book a Gele tying appointment?</h4>
                      <p className="text-gray-600">Contact us via email or phone to schedule your appointment. We recommend booking at least 1 week in advance for special events.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form CTA */}
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
              <p className="text-gray-600 mb-6">
                Can't find the answer you're looking for? Our friendly customer service team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="btn-primary">
                  Contact Support
                </a>
                <a href="mailto:hello@funmitanempire.com" className="btn-secondary">
                  Email Us Directly
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