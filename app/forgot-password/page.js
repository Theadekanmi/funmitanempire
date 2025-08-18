'use client'

import { useState } from 'react'
import { requestPasswordReset } from '@/utils/api'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      await requestPasswordReset(email)
      setMessage('If that email exists, a reset link has been sent.')
    } catch (e) {
      setMessage('If that email exists, a reset link has been sent.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="w-full border rounded px-3 py-2 mb-4" />
        <button className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition-colors">Send Reset Link</button>
        {message && <p className="text-sm text-gray-700 mt-4">{message}</p>}
      </form>
    </div>
  )
}
