'use client'

import Link from 'next/link'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/hooks/useCart'
import { getImageUrl } from '@/utils/api'
import { useState, useEffect } from 'react'

export default function ProductCard({ product }) {
  const { addItem, removeItem, cartItems } = useCart()
  const [imageError, setImageError] = useState(false)
  
  // Check if product is in cart - this will update automatically when cartItems changes
  const cartItem = cartItems.find(item => item.product.id === product.id)
  const isInCart = !!cartItem

  const handleCartAction = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      if (isInCart) {
        // Remove from cart
        await removeItem(cartItem.id)
      } else {
        // Add to cart
        await addItem(product, 1)
      }
    } catch (error) {
      console.error('Error with cart action:', error)
    }
  }

  const price = product.sale_price || product.price
  const originalPrice = product.sale_price ? product.price : null
  const imageUrl = imageError ? '/placeholder-image.svg' : getImageUrl(product.image)

  return (
    <Link href={`/products/${product.slug}`} prefetch={false} className="group">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
            onError={() => setImageError(true)}
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.is_on_sale && (
              <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                SALE
              </span>
            )}
            {product.is_featured && (
              <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">
                FEATURED
              </span>
            )}
            {product.stock_quantity === 0 && (
              <span className="bg-gray-500 text-white text-xs font-semibold px-2 py-1 rounded">
                OUT OF STOCK
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {product.stock_quantity > 0 && (
              <button
                onClick={handleCartAction}
                className={`p-2 rounded-full shadow-md transition-colors ${
                  isInCart 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-orange-600 text-white hover:bg-orange-700'
                }`}
                title={isInCart ? 'Remove from cart' : 'Add to cart'}
              >
                {isInCart ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <ShoppingCartIcon className="h-5 w-5" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Product info */}
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
            {product.name}
          </h3>
          
          {product.category && (
            <p className="text-sm text-gray-500 mb-2">
              {product.category.name}
            </p>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-semibold text-gray-900">
              £{parseFloat(price).toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                £{parseFloat(originalPrice).toFixed(2)}
              </span>
            )}
          </div>

          {/* Colors and sizes */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1 mb-2">
              <span className="text-xs text-gray-500">Colors:</span>
              <div className="flex gap-1">
                {product.colors.slice(0, 3).map((color, index) => (
                  <div
                    key={index}
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
                {product.colors.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{product.colors.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <div className="text-xs text-gray-500">
              Sizes: {product.sizes.slice(0, 4).join(', ')}
              {product.sizes.length > 4 && '...'}
            </div>
          )}

          {/* Stock status */}
          {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
            <p className="text-xs text-orange-600 mt-2">
              Only {product.stock_quantity} left in stock
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}