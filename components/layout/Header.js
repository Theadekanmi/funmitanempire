'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'
import { 
  MagnifyingGlassIcon, 
  ShoppingBagIcon, 
  UserIcon,
  Bars3Icon,
  XMarkIcon 
} from '@heroicons/react/24/outline'

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  const { totalItems } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  const navigation = [
    { name: 'Women', href: '/women' },
    { name: 'Men', href: '/men' },
    { name: 'Teens', href: '/teens' },
    { name: 'Fabrics', href: '/fabrics' },
    { name: 'Gele', href: '/gele' },
    { name: 'Sale', href: '/sale' },
  ]

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      {/* Top banner */}
      <div className="bg-orange-600 text-white text-center py-2 text-sm">
        🚚 FREE delivery: Manchester (any amount) | UK mainland £50+ | 📞 Call us: +447368369348
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <img 
              src="/funmitan-logo.svg" 
              alt="Funmitan Empire Limited" 
              className="h-12 w-12 mr-3"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-800">
                Funmitan Empire
              </h1>
              <p className="text-xs text-orange-600">Limited</p>
            </div>
          </Link>

          {/* Search bar - desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:ring-orange-500 focus:border-orange-500"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-4 bg-orange-600 text-white rounded-r-md hover:bg-orange-700"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search icon - mobile */}
            <Link href="/search" className="md:hidden">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-600" />
            </Link>

            {/* Account */}
            <div className="relative">
              {isAuthenticated ? (
                <div className="group">
                  <UserIcon className="h-6 w-6 text-gray-600 cursor-pointer" />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <div className="py-1">
                      <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        My Account
                      </Link>
                      <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        My Orders
                      </Link>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href="/account">
                  <UserIcon className="h-6 w-6 text-gray-600" />
                </Link>
              )}
            </div>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <ShoppingBagIcon className="h-6 w-6 text-gray-600" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-gray-600" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation - desktop */}
        <nav className="hidden md:flex space-x-8 py-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="py-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:ring-orange-500 focus:border-orange-500"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 bottom-0 px-4 bg-orange-600 text-white rounded-r-md"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
              </div>
            </form>

            {/* Mobile navigation */}
            <nav className="space-y-1 pb-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-orange-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}