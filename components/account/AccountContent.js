'use client'

import React, { useEffect, useState } from 'react'
import { UserIcon, EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { useAuth } from '@/hooks/useAuth'
import { useRouter, useSearchParams } from 'next/navigation'

const AccountContent = () => {
  const { login, register, user, isAuthenticated, loading: authLoading } = useAuth()
  const searchParams = useSearchParams()
  const initialTab = (searchParams.get('tab') === 'register') ? 'register' : 'login'
  const [activeTab, setActiveTab] = useState(initialTab)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const router = useRouter()
  
  // All hooks must be called before any early returns
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [registerData, setRegisterData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' })

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab === 'register' || tab === 'login') {
      setActiveTab(tab)
    }
  }, [searchParams])

  // Show loading while auth is being determined
  if (authLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await login(loginData)
      router.push('/account')
    } catch (err) {
      // Error handling is done in the useAuth hook
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    setIsLoading(true)
    try {
      const payload = {
        username: registerData.email.split('@')[0],
        email: registerData.email,
        password: registerData.password,
        password_confirm: registerData.confirmPassword,
        first_name: registerData.firstName,
        last_name: registerData.lastName,
      }
      
      // Wait for registration to complete
      const result = await register(payload)
      
      // Only switch to login tab if registration was successful
      if (result && result.message) {
        // Clear the form
        setRegisterData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' })
        // Show success state
        setRegisterSuccess(true)
        // Switch to login tab after a short delay to show success message
        setTimeout(() => {
          setRegisterSuccess(false)
          setActiveTab('login')
        }, 3000) // Wait 3 seconds to show success message
      }
    } catch (err) {
      // Error handling is done in the useAuth hook
      console.error('Registration error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value })
  const handleRegisterChange = (e) => setRegisterData({ ...registerData, [e.target.name]: e.target.value })

  // If user is already logged in, show dashboard (after all hooks)
  if (isAuthenticated && user) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <span className="text-4xl mr-3">🎉</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.first_name || user.username}!</h1>
              <p className="text-gray-600">Great to see you back. Manage your orders and account settings below.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="/orders" className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">My Orders</h3>
              <p className="text-gray-600 text-sm">View and track your orders</p>
            </a>
            <a href="/account/settings" className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">Account Settings</h3>
              <p className="text-gray-600 text-sm">Update your profile and preferences</p>
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
        <p className="text-gray-600">{activeTab === 'login' ? 'Welcome back! Sign in to your account.' : 'Create an account to track orders and save your preferences.'}</p>
      </div>

      <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
        <button onClick={() => setActiveTab('login')} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'login' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>Sign In</button>
        <button onClick={() => setActiveTab('register')} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'register' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>Register</button>
      </div>

      {activeTab === 'login' && (
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><EnvelopeIcon className="h-5 w-5 text-gray-400" /></div><input type="email" id="login-email" name="email" value={loginData.email} onChange={handleLoginChange} placeholder="Enter your email" className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" required /></div>
          </div>
          <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><LockClosedIcon className="h-5 w-5 text-gray-400" /></div><input type={showPassword ? 'text' : 'password'} id="login-password" name="password" value={loginData.password} onChange={handleLoginChange} placeholder="Enter your password" className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" required /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">{showPassword ? (<EyeSlashIcon className="h-5 w-5 text-gray-400" />) : (<EyeIcon className="h-5 w-5 text-gray-400" />)}</button></div>
          </div>
          <div className="flex items-center justify-between"><div className="flex items-center"><input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded" /><label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label></div><a href="/forgot-password" className="text-sm text-orange-600 hover:text-orange-700">Forgot password?</a></div>
          <button type="submit" disabled={isLoading} className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{isLoading ? (<div className="flex items-center justify-center"><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>Signing In...</div>) : ('Sign In')}</button>
        </form>
      )}

      {activeTab === 'register' && (
        <>
          {registerSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Account created successfully! Please check your email for verification.
                  </p>
                </div>
              </div>
            </div>
          )}
          <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div><label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name</label><div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><UserIcon className="h-5 w-5 text-gray-400" /></div><input type="text" id="firstName" name="firstName" value={registerData.firstName} onChange={handleRegisterChange} placeholder="First name" className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" required /></div></div>
            <div><label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name</label><input type="text" id="lastName" name="lastName" value={registerData.lastName} onChange={handleRegisterChange} placeholder="Last name" className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" required /></div>
          </div>
          <div><label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label><div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><EnvelopeIcon className="h-5 w-5 text-gray-400" /></div><input type="email" id="register-email" name="email" value={registerData.email} onChange={handleRegisterChange} placeholder="Enter your email" className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" required /></div></div>
          <div><label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-2">Password</label><div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><LockClosedIcon className="h-5 w-5 text-gray-400" /></div><input type={showPassword ? 'text' : 'password'} id="register-password" name="password" value={registerData.password} onChange={handleRegisterChange} placeholder="Create a password" className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" required minLength={6} /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">{showPassword ? (<EyeSlashIcon className="h-5 w-5 text-gray-400" />) : (<EyeIcon className="h-5 w-5 text-gray-400" />)}</button></div></div>
          <div><label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label><div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><LockClosedIcon className="h-5 w-5 text-gray-400" /></div><input type={showPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" value={registerData.confirmPassword} onChange={handleRegisterChange} placeholder="Confirm your password" className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" required minLength={6} /></div></div>
          <div className="flex items-center"><input id="terms" name="terms" type="checkbox" className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded" required /><label htmlFor="terms" className="ml-2 block text-sm text-gray-900">I agree to the <a href="/terms" className="text-orange-600 hover:text-orange-700">Terms of Service</a> and <a href="/privacy-policy" className="text-orange-600 hover:text-orange-700">Privacy Policy</a></label></div>
          <button type="submit" disabled={isLoading} className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{isLoading ? (<div className="flex items-center justify-center"><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>Creating Account...</div>) : ('Create Account')}</button>
        </form>
        </>
      )}

      <div className="mt-8 text-center"><p className="text-sm text-gray-600">Need help? <a href="/contact" className="text-orange-600 hover:text-orange-700">Contact our customer support</a></p></div>
    </div>
  )
}

export default AccountContent