import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Policies</h1>
            
            <div className="space-y-8">
              {/* Payment Verification Policy */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payment Verification Policy</h2>
                <div className="prose prose-lg">
                  <p className="text-gray-700 mb-4">
                    At Funmitan Empire Limited, we prioritize the security of our customers and the integrity of our transactions. 
                    All payments are verified before any orders are processed or shipped.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Payment Verification Process</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>All payments are verified through our secure payment gateway</li>
                    <li>Orders are only processed after successful payment verification</li>
                    <li>We reserve the right to hold orders for additional verification if necessary</li>
                    <li>Failed payments will result in order cancellation</li>
                    <li>Refunds are processed within 5-7 business days for cancelled orders</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Security Measures</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>All transactions are encrypted using SSL technology</li>
                    <li>We do not store your payment information on our servers</li>
                    <li>Payment processing is handled by secure third-party providers</li>
                    <li>We monitor transactions for suspicious activity</li>
                  </ul>
                </div>
              </section>

              {/* Shipping Policy */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shipping Policy</h2>
                <div className="prose prose-lg">
                  <p className="text-gray-700 mb-4">
                    We offer fast and reliable shipping across the UK with tracking for all orders.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Shipping Options</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li><strong>Standard Delivery:</strong> 3-5 business days - £5.99</li>
                    <li><strong>Express Delivery:</strong> 1-2 business days - £9.99</li>
                    <li><strong>Free Shipping:</strong> Available on orders over £50</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Order Processing</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Orders are processed within 24 hours of payment verification</li>
                    <li>You will receive tracking information via email</li>
                    <li>Delivery times may vary during peak seasons</li>
                  </ul>
                </div>
              </section>

              {/* Return Policy */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Return Policy</h2>
                <div className="prose prose-lg">
                  <p className="text-gray-700 mb-4">
                    We want you to be completely satisfied with your purchase. If you're not happy, we're here to help.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Return Conditions</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Returns accepted within 30 days of delivery</li>
                    <li>Items must be unworn, unwashed, and in original packaging</li>
                    <li>Custom or personalized items cannot be returned</li>
                    <li>Sale items are final sale unless defective</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Return Process</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Contact our customer service team to initiate a return</li>
                    <li>Return shipping is free for defective items</li>
                    <li>Refunds are processed within 5-7 business days</li>
                    <li>Original shipping costs are non-refundable</li>
                  </ul>
                </div>
              </section>

              {/* Privacy Policy */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Privacy Policy</h2>
                <div className="prose prose-lg">
                  <p className="text-gray-700 mb-4">
                    Your privacy is important to us. We are committed to protecting your personal information.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Information We Collect</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Name, email address, and shipping information</li>
                    <li>Payment information (processed securely by third parties)</li>
                    <li>Order history and preferences</li>
                    <li>Website usage data for improvement</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">How We Use Your Information</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Process and fulfill your orders</li>
                    <li>Send order confirmations and tracking updates</li>
                    <li>Provide customer support</li>
                    <li>Improve our website and services</li>
                    <li>Send marketing communications (with your consent)</li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
