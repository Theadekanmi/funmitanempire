'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { cart as cartAPI } from '@/utils/api'
import { useAuth } from './useAuth'
import toast from 'react-hot-toast'

const CartContext = createContext()

export function CartProvider({ children }) {
  const { user, isAuthenticated, loading: authLoading } = useAuth()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)

  // Load cart data
  const loadCart = async () => {
    setLoading(true)
    if (!isAuthenticated) {
      // Load from localStorage for anonymous users
      const localCart = localStorage.getItem('cart')
      if (localCart) {
        try {
          setCartItems(JSON.parse(localCart))
        } catch (error) {
          console.error('Error parsing local cart:', error)
          localStorage.removeItem('cart')
          setCartItems([])
        }
      } else {
        setCartItems([])
      }
      setLoading(false)
      return
    }

    try {
      const data = await cartAPI.get()
      // Backend returns cart object with items array
      setCartItems(data.items || [])
    } catch (error) {
      console.error('Error loading cart:', error)
      setCartItems([])
    } finally {
      setLoading(false)
    }
  }

  // Save cart to localStorage for anonymous users
  const saveLocalCart = (items) => {
    if (!isAuthenticated) {
      localStorage.setItem('cart', JSON.stringify(items))
    }
  }

  // Add item to cart
  const addItem = async (product, quantity = 1) => {
    if (isAuthenticated) {
      try {
        await cartAPI.addItem(product.id, quantity)
        // Reload cart to get updated data
        await loadCart()
        toast.success(`${product.name} added to cart!`)
      } catch (error) {
        console.error('Cart add error:', error)
        toast.error('Failed to add item to cart')
        throw error
      }
    } else {
      // Handle anonymous user cart
      const existingItem = cartItems.find(item => item.product.id === product.id)
      let newItems
      
      if (existingItem) {
        newItems = cartItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        newItems = [...cartItems, { product, quantity, id: Date.now() }]
      }
      
      setCartItems(newItems)
      saveLocalCart(newItems)
      toast.success(`${product.name} added to cart!`)
    }
  }

  // Update item quantity
  const updateItem = async (itemId, quantity) => {
    if (quantity <= 0) {
      return removeItem(itemId)
    }

    if (isAuthenticated) {
      try {
        // Optimistic update to prevent blinking
        const newItems = cartItems.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
        setCartItems(newItems)
        await cartAPI.updateItem(itemId, quantity)
        toast.success('Cart updated')
      } catch (error) {
        console.error('Cart update error:', error)
        toast.error('Failed to update cart. Restoring cart...')
        // Reload cart in case of error
        await loadCart()
        throw error
      }
    } else {
      const newItems = cartItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
      setCartItems(newItems)
      saveLocalCart(newItems)
      toast.success('Cart updated')
    }
  }

  // Remove item from cart
  const removeItem = async (itemId) => {
    if (isAuthenticated) {
      try {
        // Optimistic update to prevent blinking
        const newItems = cartItems.filter(item => item.id !== itemId)
        setCartItems(newItems)
        await cartAPI.removeItem(itemId)
        toast.success('Item removed from cart')
      } catch (error) {
        toast.error('Failed to remove item. Restoring cart...')
        await loadCart()
        throw error
      }
    } else {
      const newItems = cartItems.filter(item => item.id !== itemId)
      setCartItems(newItems)
      saveLocalCart(newItems)
      toast.success('Item removed from cart')
    }
  }

  // Clear cart
  const clearCart = async () => {
    if (isAuthenticated) {
      try {
        await cartAPI.clear()
        setCartItems([])
        toast.success('Cart cleared')
      } catch (error) {
        toast.error('Failed to clear cart')
        throw error
      }
    } else {
      setCartItems([])
      localStorage.removeItem('cart')
      toast.success('Cart cleared')
    }
  }

  // Calculate totals
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalAmount = cartItems.reduce((sum, item) => {
    const price = item.product.sale_price || item.product.price
    return sum + (price * item.quantity)
  }, 0)

  // Load cart when user or auth status changes; avoid loading while auth is resolving
  useEffect(() => {
    const hasAuthToken = typeof window !== 'undefined' && !!localStorage.getItem('authToken')
    if (authLoading) {
      setLoading(true)
      return
    }
    // If not authenticated but token exists, wait (avoid showing empty guest cart)
    if (!isAuthenticated && hasAuthToken) {
      setLoading(true)
      return
    }
    loadCart()
  }, [authLoading, isAuthenticated, user])

  const value = {
    cartItems,
    loading,
    totalItems,
    totalAmount,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    loadCart,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}