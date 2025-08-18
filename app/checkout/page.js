'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const { user, isAuthenticated } = useAuth()
  const { cartItems, total, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
    country: 'United Kingdom',
    notes: ''
  })

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to checkout')
      router.push('/account')
      return
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty')
      router.push('/')
      return
    }

    // Pre-fill form with user data
    if (user) {
      setFormData(prev => ({
        ...prev,
        full_name: `${user.first_name} ${user.last_name}`.trim(),
        email: user.email,
        phone: user.phone_number || '',
        address: user.address || '',
        city: user.city || '',
        postal_code: user.postal_code || '',
        country: user.country || 'United Kingdom'
      }))
    }
  }, [isAuthenticated, user, cartItems, router])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const calculateShipping = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    const postcode = formData.postal_code.toUpperCase()
    
    // Manchester: FREE
    if (postcode.startsWith('M')) return 0
    
    // UK mainland: FREE over £50
    const ukMainlandPrefixes = [
      'B', 'BR', 'CB', 'CM', 'CO', 'CR', 'CV', 'DA', 'E', 'EC', 'EN', 'HA', 'HP', 'IG', 'KT',
      'LU', 'MK', 'N', 'NW', 'OX', 'RG', 'RM', 'SE', 'SG', 'SL', 'SM', 'SS', 'SW', 'TN',
      'TW', 'UB', 'W', 'WC', 'WD', 'AL', 'PE', 'NG', 'LE', 'DE', 'S', 'DN', 'LN', 'HU',
      'YO', 'LS', 'BD', 'HG', 'DL', 'TS', 'NE', 'SR', 'DH', 'CA', 'LA', 'PR', 'FY', 'BB',
      'BL', 'OL', 'SK', 'WA', 'CW', 'ST', 'WS', 'DY', 'WV', 'TF', 'SY', 'LD',
      'HR', 'GL', 'SN', 'BA', 'BS', 'TA', 'EX', 'PL', 'TQ', 'DT', 'BH', 'SO', 'PO', 'GU',
      'RH', 'BN', 'CF', 'SA', 'NP', 'G', 'ML', 'EH', 'KY', 'FK', 'DD'
    ]
    
    const prefix = postcode.substring(0, 2).trim() || postcode.substring(0, 1)
    const isUkMainland = ukMainlandPrefixes.some(p => prefix.startsWith(p))
    
    if (isUkMainland) return subtotal >= 50 ? 0 : 5.99
    
    // Remote UK areas
    const remotePrefixes = ['AB', 'IV', 'KW', 'PA', 'PH', 'HS', 'ZE', 'KA', 'DG', 'BT', 'IM', 'JE', 'GY', 'TR']
    if (remotePrefixes.some(p => prefix.startsWith(p))) return 8.99
    
    // International
    return 15.99
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const shipping = calculateShipping()
  const finalTotal = subtotal + shipping

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/orders/create_from_cart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const order = await response.json()
        await clearCart()
        toast.success('Order placed successfully!')
        router.push(`/orders`)
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || 'Failed to place order')
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated || cartItems.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postal_code"
                      value={formData.postal_code}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Ireland">Ireland</option>
                      <option value="France">France</option>
                      <option value="Germany">Germany</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Any special instructions for your order..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Processing...' : `Place Order - £${finalTotal.toFixed(2)}`}
                </button>
              </form>
            </div>
            
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 pb-4 border-b border-gray-200">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0">
                      {/* Product image would go here */}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">£{(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 space-y-2 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `£${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>£{finalTotal.toFixed(2)}</span>
                </div>
              </div>
              
              {formData.postal_code && (
                <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm text-orange-700">
                    {formData.postal_code.toUpperCase().startsWith('M') ? (
                      '🎉 FREE delivery to Manchester!'
                    ) : shipping === 0 ? (
                      '🎉 FREE delivery (order over £50)!'
                    ) : (
                      `📦 Shipping: £${shipping.toFixed(2)}`
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}