'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import ProductCard from '@/components/products/ProductCard'
import { getImageUrl } from '@/utils/api'
import Link from 'next/link'
import { ArrowLeftIcon, HeartIcon } from '@heroicons/react/24/outline'

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/v1/products/${params.slug}/`)
        if (!response.ok) throw new Error('Product not found')
        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchProduct()
    }
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
            <Link 
              href="/products"
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/products" className="text-gray-500 hover:text-gray-700 flex items-center">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={getImageUrl(product.images?.[selectedImage] || product.image)}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-orange-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={getImageUrl(image)}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="flex items-center space-x-4">
              {product.sale_price ? (
                <>
                  <span className="text-3xl font-bold text-orange-600">£{product.sale_price}</span>
                  <span className="text-xl text-gray-500 line-through">£{product.price}</span>
                </>
              ) : (
                <span className="text-3xl font-bold text-gray-900">£{product.price}</span>
              )}
            </div>

            <div className="space-y-4">
              <button className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                Add to Cart
              </button>
              <button className="w-full border border-orange-600 text-orange-600 py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition-colors">
                Add to Wishlist
              </button>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-2">Product Details</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Category:</strong> {product.category?.name}</p>
                <p><strong>Material:</strong> {product.material || 'Not specified'}</p>
                <p><strong>Care Instructions:</strong> {product.care_instructions || 'Not specified'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
