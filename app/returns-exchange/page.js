import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ReturnsExchangePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Returns & Exchange Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>
              
              <p className="text-gray-700 mb-6">
                At Funmitan Empire Limited, we want you to be completely satisfied with your purchase. 
                If you're not happy with your order, we're here to help with our flexible returns and exchange policy.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Return Policy</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Return Window</h3>
              <p className="text-gray-700 mb-4">
                We accept returns within <strong>30 days</strong> of the delivery date for most items. 
                Some restrictions apply (see below).
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Return Conditions</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Items must be unworn, unwashed, and in original condition</li>
                <li>All original tags and labels must be attached</li>
                <li>Items must be in original packaging</li>
                <li>No signs of wear, damage, or alteration</li>
                <li>Items must not have been used or tried on extensively</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Items Not Eligible for Return</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Custom or personalized items</li>
                <li>Sale items marked as "Final Sale"</li>
                <li>Items with missing tags or labels</li>
                <li>Damaged or altered items</li>
                <li>Items that have been worn or washed</li>
                <li>Gift cards and digital products</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Exchange Policy</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Exchange Options</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Exchange for a different size (subject to availability)</li>
                <li>Exchange for a different color (subject to availability)</li>
                <li>Exchange for a different style (subject to availability)</li>
                <li>Exchange for store credit</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Exchange Process</h3>
              <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-6">
                <li>Contact our customer service team within 30 days</li>
                <li>Provide your order number and reason for exchange</li>
                <li>We'll provide a return shipping label (if applicable)</li>
                <li>Ship the item back to us in original condition</li>
                <li>Once received, we'll process your exchange</li>
                <li>New item will be shipped to you</li>
              </ol>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Return or Exchange</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 1: Contact Us</h3>
              <p className="text-gray-700 mb-4">
                Email us at <strong>returns@funmitanempire.com</strong> or call us at <strong>+44 (0) 20 1234 5678</strong> 
                with your order number and reason for return/exchange.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 2: Package Your Item</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Ensure the item is in original condition</li>
                <li>Include all original tags and labels</li>
                <li>Use the original packaging if possible</li>
                <li>Include a copy of your order confirmation</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 3: Ship Your Return</h3>
              <p className="text-gray-700 mb-4">
                We'll provide you with a prepaid shipping label for returns within the UK. 
                For international returns, shipping costs are the responsibility of the customer.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Refund Information</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Refund Processing</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Refunds are processed within 5-7 business days</li>
                <li>Original shipping costs are non-refundable</li>
                <li>Return shipping costs are covered by us for UK returns</li>
                <li>Refunds are issued to the original payment method</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Store Credit</h3>
              <p className="text-gray-700 mb-6">
                If you prefer, we can issue store credit instead of a refund. Store credit never expires 
                and can be used for future purchases.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Defective Items</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Issues</h3>
              <p className="text-gray-700 mb-4">
                If you receive a defective item, we'll provide a full refund or replacement at no cost to you.
              </p>

              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Contact us immediately upon discovering the defect</li>
                <li>Include photos of the defect if possible</li>
                <li>We'll provide a prepaid return label</li>
                <li>Full refund or replacement will be processed</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">International Returns</h2>
              
              <p className="text-gray-700 mb-4">
                For international orders, return shipping costs are the responsibility of the customer. 
                We recommend using a tracked shipping service.
              </p>

              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Return shipping costs are not refunded</li>
                <li>Customs duties are not refunded</li>
                <li>Processing time may be longer for international returns</li>
                <li>We recommend using a tracked shipping service</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer Service</h3>
                <p className="text-gray-700 mb-4">
                  For questions about returns or exchanges, please contact us:
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li><strong>Email:</strong> returns@funmitanempire.com</li>
                  <li><strong>Phone:</strong> +44 (0) 20 1234 5678</li>
                  <li><strong>Hours:</strong> Monday-Friday, 9:00 AM - 6:00 PM GMT</li>
                  <li><strong>Address:</strong> Funmitan Empire Limited, London, UK</li>
                </ul>
              </div>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I return a sale item?</h3>
                  <p className="text-gray-700">
                    Sale items marked as "Final Sale" cannot be returned. Regular sale items can be returned 
                    within the standard 30-day window.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does it take to process my return?</h3>
                  <p className="text-gray-700">
                    Once we receive your return, we process it within 2-3 business days. Refunds are issued 
                    within 5-7 business days.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I exchange for a different size?</h3>
                  <p className="text-gray-700">
                    Yes, you can exchange for a different size subject to availability. Contact our customer 
                    service team to arrange the exchange.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">What if I received the wrong item?</h3>
                  <p className="text-gray-700">
                    If you received the wrong item, contact us immediately. We'll provide a prepaid return 
                    label and ship the correct item at no cost to you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
