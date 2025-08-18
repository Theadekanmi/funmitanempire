'use client'

import React, { useState } from 'react'
import { MagnifyingGlassIcon, CheckCircleIcon, ClockIcon, TruckIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState('')
  const [email, setEmail] = useState('')
  const [trackingResult, setTrackingResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTrackOrder = async (e) => {
    e.preventDefault()
    
    if (!orderNumber.trim() || !email.trim()) {
      toast.error('Please enter both order number and email')
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Mock tracking data
      const mockOrder = {
        orderNumber: orderNumber.toUpperCase(),
        email: email,
        status: 'shipped',
        orderDate: '2024-01-15',
        estimatedDelivery: '2024-01-18',
        items: [
          { name: 'Elegant Ankara Maxi Dress', quantity: 1, price: 89.99 },
          { name: 'Traditional Gele Headwrap', quantity: 1, price: 34.99 }
        ],
        trackingSteps: [
          { status: 'confirmed', date: '2024-01-15 10:30', description: 'Order confirmed and payment received', completed: true },
          { status: 'processing', date: '2024-01-15 14:20', description: 'Order being prepared for shipment', completed: true },
          { status: 'shipped', date: '2024-01-16 09:15', description: 'Package shipped via Royal Mail', completed: true },
          { status: 'out_for_delivery', date: '2024-01-18 08:00', description: 'Out for delivery', completed: false },
          { status: 'delivered', date: '', description: 'Package delivered', completed: false }
        ],
        shippingAddress: 'Manchester, UK',
        trackingNumber: 'RM123456789GB'
      }

      setTrackingResult(mockOrder)
      setIsLoading(false)
    }, 1500)
  }

  const getStatusIcon = (status, completed) => {
    if (completed) {
      return <CheckCircleIcon className="w-6 h-6 text-green-600" />
    } else if (status === 'out_for_delivery') {
      return <TruckIcon className="w-6 h-6 text-blue-600" />
    } else {
      return <ClockIcon className="w-6 h-6 text-gray-400" />
    }
  }

  return (
    <div>
      {/* Tracking Form */}
      <div className="bg-gray-50 rounded-xl p-8 mb-8">
        <form onSubmit={handleTrackOrder} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Order Number *
              </label>
              <input
                type="text"
                id="orderNumber"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="e.g., FE2024001"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto bg-primary-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Tracking Order...
              </div>
            ) : (
              <>
                <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
                Track Order
              </>
            )}
          </button>
        </form>
      </div>

      {/* Tracking Results */}
      {trackingResult && (
        <div className="space-y-8">
          {/* Order Summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <div className="text-sm text-gray-600">Order Number</div>
                <div className="font-medium text-gray-900">{trackingResult.orderNumber}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Order Date</div>
                <div className="font-medium text-gray-900">{trackingResult.orderDate}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Estimated Delivery</div>
                <div className="font-medium text-gray-900">{trackingResult.estimatedDelivery}</div>
              </div>
            </div>

            {/* Items */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-medium text-gray-900 mb-4">Items Ordered</h3>
              <div className="space-y-3">
                {trackingResult.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-600">Quantity: {item.quantity}</div>
                    </div>
                    <div className="font-medium">£{item.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tracking Progress */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Tracking Progress</h2>
              <div className="text-sm text-gray-600">
                Tracking: {trackingResult.trackingNumber}
              </div>
            </div>

            <div className="space-y-6">
              {trackingResult.trackingSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(step.status, step.completed)}
                  </div>
                  
                  <div className="flex-1">
                    <div className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                      {step.description}
                    </div>
                    {step.date && (
                      <div className="text-sm text-gray-600 mt-1">
                        {step.date}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-shrink-0">
                    {step.completed && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Complete
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
            <p className="text-blue-800 mb-4">
              If you have any questions about your order or delivery, our customer service team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/contact" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center">
                Contact Support
              </a>
              <a href="mailto:hello@funmitanempire.com" className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-center">
                Email Us
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Help Section */}
      {!trackingResult && (
        <div className="bg-gray-50 rounded-xl p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Need Help Finding Your Order?</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Order Number:</strong> You can find this in your order confirmation email. It typically starts with "FE" followed by numbers.
            </p>
            <p>
              <strong>Email Address:</strong> Use the same email address you used when placing your order.
            </p>
            <p>
              <strong>Still Can't Find It?</strong> Contact our customer service team at{' '}
              <a href="mailto:hello@funmitanempire.com" className="text-primary-600 hover:text-primary-700">
                hello@funmitanempire.com
              </a>{' '}
              or call us at +44 (0) 20 1234 5678.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderTracking