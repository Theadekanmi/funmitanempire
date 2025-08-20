'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useCart } from '@/hooks/useCart'
import { getImageUrl } from '@/utils/api'
import Link from 'next/link'
import { TrashIcon } from '@heroicons/react/24/outline'

export default function CartPage() {
  const { cartItems, totalAmount, updateItem, removeItem, clearCart, loading } = useCart()

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(itemId)
    } else {
      updateItem(itemId, newQuantity)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your cart...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          {cartItems.length > 0 && (
            <p className="text-gray-600">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-2xl font-medium text-gray-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-500 mb-8">
              Looks like you haven't added anything to your cart yet
            </p>
            <Link 
              href="/women"
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => {
                    const product = item.product
                    const price = product.sale_price || product.price
                    
                    return (
                      <div key={item.id} className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 relative">
                            <img
                              src={getImageUrl(product.image)}
                              alt={product.name}
                              className="object-cover rounded-md w-full h-full"
                              loading="lazy"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="text-lg font-medium text-gray-900">
                                  <Link 
                                    href={`/products/${product.slug}`}
                                    className="hover:text-orange-600 transition-colors"
                                  >
                                    {product.name}
                                  </Link>
                                </h3>
                                {product.category && (
                                  <p className="text-sm text-gray-500 mt-1">
                                    {product.category.name}
                                  </p>
                                )}
                                <p className="text-lg font-semibold text-gray-900 mt-2">
                                  £{parseFloat(price).toFixed(2)}
                                </p>
                              </div>
                              
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            </div>
                            
                            <div className="flex items-center mt-4">
                              <label htmlFor={`quantity-${item.id}`} className="sr-only">
                                Quantity
                              </label>
                              <div className="flex items-center border border-gray-300 rounded-md">
                                <button
                                  type="button"
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  className="px-3 py-1 text-gray-500 hover:text-gray-700"
                                >
                                  -
                                </button>
                                <input
                                  type="number"
                                  id={`quantity-${item.id}`}
                                  value={item.quantity}
                                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                                  className="w-16 px-2 py-1 text-center border-0 focus:ring-0"
                                  min="1"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  className="px-3 py-1 text-gray-500 hover:text-gray-700"
                                >
                                  +
                                </button>
                              </div>
                              
                              <span className="ml-4 text-sm text-gray-500">
                                Subtotal: £{(parseFloat(price) * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <button
                  onClick={clearCart}
                  className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                >
                  Clear Cart
                </button>
                <Link
                  href="/women"
                  className="text-orange-600 hover:text-orange-700 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Order Summary
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">£{totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {totalAmount >= 50 ? 'Free' : '£4.99'}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-medium text-gray-900">Total</span>
                      <span className="text-lg font-medium text-gray-900">
                        £{(totalAmount + (totalAmount >= 50 ? 0 : 4.99)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {totalAmount < 50 && (
                  <p className="text-sm text-gray-500 mt-4">
                    Add £{(50 - totalAmount).toFixed(2)} more for free shipping
                  </p>
                )}
                
                <Link 
                  href="/checkout"
                  className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors mt-6 text-center block"
                >
                  Proceed to Checkout
                </Link>
                
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    Secure checkout • 30-day returns
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}