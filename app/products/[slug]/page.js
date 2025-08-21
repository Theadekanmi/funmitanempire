'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import ProductCard from '@/components/products/ProductCard'

<<<<<<< HEAD
async function fetchProduct(slug) {
  try {
    // Use absolute URL for backend API call
    const res = await fetch(`${BACKEND_ORIGIN}/api/v1/products/${slug}/`, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
=======
export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const BACKEND_ORIGIN = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000'

  async function fetchProduct(slug) {
    try {
      // Use absolute URL for backend API call
      const res = await fetch(`${BACKEND_ORIGIN}/api/v1/products/${slug}/`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
>>>>>>> c79f2702dd7c5aa264d159b1b308f3c06a9aa666
      }

      const data = await res.json()
      setProduct(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching product:', error)
      setError(error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (params.slug) {
      fetchProduct(params.slug)
    }
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Product</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <a href="/" className="text-orange-600 hover:text-orange-700">
            ← Go back home
          </a>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <p className="text-gray-600 mb-4">We couldn't find that product.</p>
          <a href="/" className="text-orange-600 hover:text-orange-700">
            ← Go back home
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-auto rounded-lg"
            />
          </div>
          
          {/* Product Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-2xl font-bold text-orange-600 mb-4">£{product.current_price}</p>
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <div className="space-y-4">
              <div>
                <span className="font-semibold text-gray-700">Category:</span>
                <span className="ml-2 text-gray-600">{product.category?.name}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Stock:</span>
                <span className="ml-2 text-gray-600">{product.stock_quantity} available</span>
              </div>
            </div>
            
            <button className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors mt-6">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
