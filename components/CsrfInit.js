'use client'

import { useEffect } from 'react'
import { ensureCsrfToken } from '@/utils/api'

export default function CsrfInit() {
  useEffect(() => {
    // Initialize CSRF token when the app loads
    ensureCsrfToken()
  }, [])

  return null // This component doesn't render anything
}
