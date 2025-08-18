'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/products/ProductCard'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { performProductSearch } from '@/utils/api'

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const query = searchParams.get('q')
    if (query) {
      setSearchQuery(query)
      performSearch(query)
    }
  }, [searchParams])

  const performSearch = async (query) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Use the API function instead of mock data
      const results = await performProductSearch(query)
      setSearchResults(results)
    } catch (error) {
      console.error('Search error:', error)
      setError('Failed to search products. Please try again.')
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      performSearch(searchQuery.trim())
      
      // Update URL without page reload
      const url = new URL(window.location)
      url.searchParams.set('q', searchQuery.trim())
      window.history.pushState({}, '', url)
    }
  }

  if (isLoading) {
    return (
      <div>
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-600"
              >
                <MagnifyingGlassIcon className="w-6 h-6" />
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Search Products</h1>
        
        <form onSubmit={handleSearch} className="max-w-2xl">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-600"
            >
              <MagnifyingGlassIcon className="w-6 h-6" />
            </button>
          </div>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
          <button
            onClick={() => performSearch(searchQuery)}
            className="mt-2 text-red-600 hover:text-red-700 font-medium"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Search Results */}
      {searchQuery && !error && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {searchResults.length > 0 
                ? `${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} for "${searchQuery}"`
                : `No results found for "${searchQuery}"`
              }
            </h2>
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : !isLoading && searchQuery && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <MagnifyingGlassIcon className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">
                Try searching with different keywords or browse our categories
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => {
                    setSearchQuery('women wear')
                    performSearch('women wear')
                    const url = new URL(window.location)
                    url.searchParams.set('q', 'women wear')
                    window.history.pushState({}, '', url)
                  }}
                  className="bg-primary-100 text-primary-700 px-4 py-2 rounded-lg hover:bg-primary-200 transition-colors"
                >
                  Women's Fashion
                </button>
                <button
                  onClick={() => {
                    setSearchQuery('men wear')
                    performSearch('men wear')
                    const url = new URL(window.location)
                    url.searchParams.set('q', 'men wear')
                    window.history.pushState({}, '', url)
                  }}
                  className="bg-primary-100 text-primary-700 px-4 py-2 rounded-lg hover:bg-primary-200 transition-colors"
                >
                  Men's Collection
                </button>
                <button
                  onClick={() => {
                    setSearchQuery('teen fashion')
                    performSearch('teen fashion')
                    const url = new URL(window.location)
                    url.searchParams.set('q', 'teen fashion')
                    window.history.pushState({}, '', url)
                  }}
                  className="bg-primary-100 text-primary-700 px-4 py-2 rounded-lg hover:bg-primary-200 transition-colors"
                >
                  Teen Collection
                </button>
                <button
                  onClick={() => {
                    setSearchQuery('fabrics')
                    performSearch('fabrics')
                    const url = new URL(window.location)
                    url.searchParams.set('q', 'fabrics')
                    window.history.pushState({}, '', url)
                  }}
                  className="bg-primary-100 text-primary-700 px-4 py-2 rounded-lg hover:bg-primary-200 transition-colors"
                >
                  Fabrics
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Suggested Searches */}
      {!searchQuery && !error && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Popular Searches</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Women Wear', 'Men Wear', 'Teen Fashion', 'Ankara Dress', 
              'African Print', 'Gele', 'Fabrics', 'Dashiki',
              'Women Clothing', 'Men Clothing', 'Traditional Wear', 'Casual Wear',
              'Formal Dress', 'African Fabric', 'Head Wrap', 'Sale Items'
            ].map((term) => (
              <button
                key={term}
                onClick={() => {
                  setSearchQuery(term)
                  performSearch(term)
                  const url = new URL(window.location)
                  url.searchParams.set('q', term)
                  window.history.pushState({}, '', url)
                }}
                className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors"
              >
                <div className="font-medium text-gray-900">{term}</div>
              </button>
            ))}
          </div>
          
          {/* Search Tips */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">Search Tips</h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p><strong>Try searching for:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>"Women wear" or "Women clothing" for all women's items</li>
                <li>"Men wear" or "Men clothing" for all men's items</li>
                <li>"Teen fashion" for teenage collections</li>
                <li>"African print" for traditional patterns</li>
                <li>"Fabric" for materials and textiles</li>
                <li>"Gele" or "Head wrap" for traditional headwear</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchResults