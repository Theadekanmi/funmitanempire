'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'

export default function DebugConsole() {
  const [isOpen, setIsOpen] = useState(false)
  const [logs, setLogs] = useState([])
  const { user, isAuthenticated } = useAuth()
  const { cartItems } = useCart()

  // Only show in development
  if (process.env.NODE_ENV === 'production') return null

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [...prev.slice(-50), { message, type, timestamp }])
  }

  const checkAllSystems = () => {
    addLog('🔍 Starting system check...', 'info')
    
    // Auth check
    addLog(`👤 Auth: ${isAuthenticated ? '✅ Logged in' : '❌ Not logged in'}`, isAuthenticated ? 'success' : 'error')
    if (user) addLog(`📧 User: ${user.email}`, 'info')
    
    // Cart check
    addLog(`🛒 Cart: ${cartItems.length} items`, cartItems.length > 0 ? 'success' : 'warning')
    
    // API check
    fetch('http://127.0.0.1:8000/api/v1/products/')
      .then(res => addLog(`📡 API: ${res.ok ? '✅ Connected' : '❌ Error'}`, res.ok ? 'success' : 'error'))
      .catch(() => addLog('📡 API: ❌ Connection failed', 'error'))
    
    // Local storage check
    const token = localStorage.getItem('authToken')
    addLog(`🔑 Token: ${token ? '✅ Present' : '❌ Missing'}`, token ? 'success' : 'error')
    
    addLog('✅ System check complete', 'success')
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
          title="Debug Console"
        >
          🔧
        </button>
      )}
      
      {isOpen && (
        <div className="bg-white border border-gray-300 rounded-lg shadow-xl w-96 max-h-96 flex flex-col">
          <div className="flex items-center justify-between p-3 bg-gray-100 border-b border-gray-300">
            <h3 className="font-semibold text-gray-900">Debug Console</h3>
            <div className="flex space-x-2">
              <button
                onClick={checkAllSystems}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Check All
              </button>
              <button
                onClick={() => setLogs([])}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-1 text-xs font-mono">
            {logs.length === 0 ? (
              <p className="text-gray-500">No logs yet. Click "Check All" to run diagnostics.</p>
            ) : (
              logs.map((log, index) => (
                <div
                  key={index}
                  className={`p-1 rounded ${
                    log.type === 'error' ? 'bg-red-50 text-red-700' :
                    log.type === 'success' ? 'bg-green-50 text-green-700' :
                    log.type === 'warning' ? 'bg-yellow-50 text-yellow-700' :
                    'bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="text-gray-500">{log.timestamp}</span> {log.message}
                </div>
              ))
            )}
          </div>
          
          <div className="p-2 bg-gray-50 border-t border-gray-200 text-xs">
            <div className="grid grid-cols-2 gap-2 text-center">
              <div>Auth: {isAuthenticated ? '✅' : '❌'}</div>
              <div>Cart: {cartItems.length} items</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
