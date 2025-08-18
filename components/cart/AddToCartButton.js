'use client'

import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import toast from 'react-hot-toast'

export default function AddToCartButton({ product, quantity = 1, size = null, color = null, className = '' }) {
  const [loading, setLoading] = useState(false)
  const { addItem } = useCart()

  const handleAdd = async () => {
    setLoading(true)
    try {
      await addItem(product, quantity, { size, color })
    } catch (e) {
      console.error('Failed to add to cart:', e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={handleAdd} disabled={loading} className={className || 'w-full bg-orange-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-700 disabled:opacity-50'}>
      {loading ? 'Adding...' : 'Add to cart'}
    </button>
  )
}
