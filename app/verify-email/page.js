'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import toast from 'react-hot-toast'

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const [token, setToken] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [showEmailForm, setShowEmailForm] = useState(false)

  useEffect(() => {
    const urlToken = searchParams.get('token')
    
    if (urlToken) {
      setToken(urlToken)
      verifyEmailWithToken(urlToken)
    } else {
      setShowEmailForm(true)
    }
  }, [searchParams])

  const verifyEmailWithToken = async (verificationToken) => {
    setLoading(true)
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/auth/verify-email/?token=${verificationToken}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (response.ok) {
        const data = await response.json()
        setMessage('Email verified successfully! You are now logged in.')
        toast.success('Email verified successfully!')
        
        // Auto login if tokens are provided
        if (data.tokens) {
          localStorage.setItem('authToken', data.tokens.access)
          localStorage.setItem('user', JSON.stringify(data.user))
          // Redirect to account after short delay
          setTimeout(() => {
            window.location.href = '/account'
          }, 2000)
        }
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Verification failed')
        toast.error('Verification failed')
      }
    } catch (err) {
      setError('Network error during verification')
      toast.error('Network error during verification')
    } finally {
      setLoading(false)
    }
  }

  const handleResendVerification = async (e) => {
    e.preventDefault()
    if (!email) {
      setError('Please enter your email address')
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/auth/resend-verification/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setMessage('Verification email sent! Please check your inbox.')
        toast.success('Verification email sent!')
        setEmail('')
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to send verification email')
        toast.error('Failed to send verification email')
      }
    } catch (err) {
      setError('Network error. Please try again.')
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-6">Email Verification</h1>
          
          {loading && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
              <p className="text-gray-600">
                {showEmailForm ? 'Sending verification email...' : 'Verifying your email...'}
              </p>
            </div>
          )}
          
          {message && !loading && (
            <div className="text-center">
              <div className="text-green-600 text-6xl mb-4">✓</div>
              <p className="text-green-600 mb-6">{message}</p>
              <a
                href="/account"
                className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition-colors"
              >
                Go to Account
              </a>
            </div>
          )}
          
          {error && !loading && !showEmailForm && (
            <div className="text-center">
              <div className="text-red-600 text-6xl mb-4">✗</div>
              <p className="text-red-600 mb-6">{error}</p>
              <button
                onClick={() => setShowEmailForm(true)}
                className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition-colors"
              >
                Resend Verification Email
              </button>
            </div>
          )}

          {showEmailForm && !loading && !message && (
            <div>
              <p className="text-gray-600 text-center mb-6">
                Enter your email address to receive a verification link
              </p>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleResendVerification} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter your email address"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Send Verification Email
                </button>
              </form>

              <div className="mt-4 text-center">
                <a href="/account" className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                  ← Back to Account
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}