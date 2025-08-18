'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductCard from '@/components/products/ProductCard'
import { products } from '@/utils/api'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setSearchResults([])
        return
      }

      setLoading(true)
      setError(null)
      
      try {
        const data = await products.search(query)
        setSearchResults(data.results || [])
      } catch (error) {
        console.error('Search error:', error)
        setError('Failed to perform search')
      } finally {
        setLoading(false)
      }
    }

    performSearch()
  }, [query])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          {query && (
            <p className="text-gray-600">
              {loading ? 'Searching...' : `Results for "${query}"`}
              {!loading && searchResults.length > 0 && (
                <span className="ml-2">({searchResults.length} items found)</span>
              )}
            </p>
          )}
        </div>

        {error && (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
            ))}
          </div>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : query && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search terms or browse our categories
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Women', 'Men', 'Teens', 'Fabrics', 'Gele'].map((category) => (
                <a
                  key={category}
                  href={`/${category.toLowerCase()}`}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Browse {category}
                </a>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}