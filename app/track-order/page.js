'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [trackingInfo, setTrackingInfo] = useState(null)

  const handleTrack = async (e) => {
    e.preventDefault()
    if (!orderNumber.trim()) return

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/orders/${orderNumber}/track/`)
      if (response.ok) {
        const order = await response.json()
        
        const statusMap = {
          'pending': 'Order Confirmed',
          'processing': 'Processing',
          'shipped': 'In Transit',
          'delivered': 'Delivered',
          'cancelled': 'Cancelled'
        }

        setTrackingInfo({
          orderNumber: order.order_number,
          status: statusMap[order.status] || order.status,
          estimatedDelivery: order.estimated_delivery || 'To be updated',
          trackingNumber: order.tracking_number || 'Not assigned yet',
          carrier: order.carrier || 'TBD',
          fullName: order.full_name,
          address: `${order.address}, ${order.city}, ${order.postal_code}, ${order.country}`,
          totalAmount: order.total_amount,
          createdAt: new Date(order.created_at).toLocaleDateString(),
          shippedAt: order.shipped_at ? new Date(order.shipped_at).toLocaleDateString() : null
        })
      } else {
        alert('Order not found. Please check your order number.')
      }
    } catch (error) {
      console.error('Error tracking order:', error)
      alert('Error tracking order. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Track Your Order</h1>
            <p className="text-gray-600">
              Enter your order number to track your package.
            </p>
          </div>
          
          {/* Track Order Form */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <form onSubmit={handleTrack} className="space-y-4">
              <div>
                <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Order Number
                </label>
                <input
                  type="text"
                  id="orderNumber"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Enter your order number (e.g., ORD-12345678)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
              >
                Track Order
              </button>
            </form>
          </div>



          {/* Tracking Results */}
          {trackingInfo && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order #{trackingInfo.orderNumber}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-medium text-gray-700">Status</h3>
                  <p className="text-green-600 font-semibold">{trackingInfo.status}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Customer</h3>
                  <p className="text-gray-900">{trackingInfo.fullName}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Tracking Number</h3>
                  <p className="text-gray-900">{trackingInfo.trackingNumber}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Carrier</h3>
                  <p className="text-gray-900">{trackingInfo.carrier}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Order Date</h3>
                  <p className="text-gray-900">{trackingInfo.createdAt}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Total Amount</h3>
                  <p className="text-gray-900">£{trackingInfo.totalAmount}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Shipping Address</h3>
                <p className="text-gray-600 mb-4">{trackingInfo.address}</p>
                
                {trackingInfo.shippedAt && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800">
                      <span className="font-medium">Shipped Date:</span> {trackingInfo.shippedAt}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}