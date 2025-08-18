'use client'

import { useEffect, useState } from 'react'

export default function SecurityCheck() {
  const [isSecure, setIsSecure] = useState(false)

  useEffect(() => {
    // Check if the site is running on HTTPS in production
    const checkSecurity = () => {
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      const isHTTPS = window.location.protocol === 'https:'
      
      // For localhost development, we don't require HTTPS
      // For production, we require HTTPS
      setIsSecure(isLocalhost || isHTTPS)
    }

    checkSecurity()
  }, [])

  // Only show warning if not secure and not in development
  if (isSecure || process.env.NODE_ENV === 'development') {
    return null
  }

  return (
    <div className="bg-red-600 text-white text-center py-2 text-sm font-medium">
      ⚠️ This connection is not secure. Please ensure you're using HTTPS for secure transactions.
    </div>
  )
}
