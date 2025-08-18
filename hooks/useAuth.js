'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '@/utils/api'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for existing auth state
        const token = localStorage.getItem('authToken')
        const userData = localStorage.getItem('user')
        
        if (token && userData) {
          try {
            // Restore user state immediately from localStorage
            const user = JSON.parse(userData)
            setUser(user)
            
            // Set up auto logout after 30 minutes of inactivity
            let logoutTimer
            const resetLogoutTimer = () => {
              clearTimeout(logoutTimer)
              logoutTimer = setTimeout(() => {
                logout()
                toast.info('You have been logged out due to inactivity')
              }, 30 * 60 * 1000) // 30 minutes
            }

            // Reset timer on user activity
            const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
            events.forEach(event => {
              document.addEventListener(event, resetLogoutTimer, true)
            })

            resetLogoutTimer() // Start the timer

            // Cleanup on unmount
            return () => {
              clearTimeout(logoutTimer)
              events.forEach(event => {
                document.removeEventListener(event, resetLogoutTimer, true)
              })
            }
          } catch (error) {
            console.error('Error parsing user data:', error)
            localStorage.removeItem('authToken')
            localStorage.removeItem('user')
            setUser(null)
          }
        } else {
          // No token or user data
          setUser(null)
        }
      } finally {
        // Always set loading to false after auth state is determined
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [])

  const login = async (credentials) => {
    try {
      const data = await auth.login(credentials)
      
      // Handle both direct access token and tokens object
      const accessToken = data.access || data.tokens?.access
      if (accessToken) {
        localStorage.setItem('authToken', accessToken)
        localStorage.setItem('user', JSON.stringify(data.user))
        setUser(data.user)
      }
      
      toast.success('Logged in successfully')
      return data
    } catch (error) {
      const errorMessage = error.message || 'Login failed'
      toast.error(errorMessage)
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const data = await auth.register(userData)
      
      // Check if there's a success message from the backend
      if (data.message) {
        toast.success(data.message)
      } else {
        toast.success('Account created successfully! Please check your email for verification.')
      }
      
      return data
    } catch (error) {
      let errorMessage = 'Registration failed'
      try {
        const errorData = JSON.parse(error.message)
        if (errorData.error) {
          errorMessage = errorData.error
        } else if (errorData.email && errorData.email[0]) {
          errorMessage = errorData.email[0]
        } else if (errorData.username && errorData.username[0]) {
          errorMessage = errorData.username[0]
        }
      } catch (parseError) {
        // If parsing fails, use the original error message
        errorMessage = error.message || 'Registration failed'
      }
      
      toast.error(errorMessage)
      throw error
    }
  }

  const logout = async () => {
    try {
      await auth.logout()
      setUser(null)
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      toast.success('Logged out successfully')
      // Redirect to login page
      window.location.href = '/account'
    } catch (error) {
      console.error('Logout error:', error)
      // Clear local state even if API call fails
      setUser(null)
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      window.location.href = '/account'
    }
  }

  const updateProfile = async (profileData) => {
    try {
      const updatedUser = await auth.updateProfile(profileData)
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
      toast.success('Profile updated successfully')
      return updatedUser
    } catch (error) {
      const errorMessage = error.message || 'Profile update failed'
      toast.error(errorMessage)
      throw error
    }
  }

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}