'use client'

import { createContext, useContext, useState } from 'react'
import toast from 'react-hot-toast'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([])

  const isInWishlist = (productId) => {
    return false // Always return false since wishlist is disabled
  }

  const toggleWishlist = async (product) => {
    toast.info('Wishlist feature temporarily disabled')
    return
  }

  const value = {
    wishlistItems: [],
    wishlistCount: 0,
    isInWishlist,
    toggleWishlist,
    loadWishlist: () => {},
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}