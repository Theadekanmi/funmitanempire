'use client';

import { useState, useEffect, useCallback } from 'react';
import { searchProducts } from '@/utils/api';
import ProductCard from '@/components/products/ProductCard';

export default function SearchResults({ query }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Memoize the search function
  const performSearch = useCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.trim().length < 1) {
      setProducts([]);
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      console.log('🔍 SEARCH DEBUG: Starting search for:', searchQuery);
      
      // Use the API function directly
      const data = await searchProducts(searchQuery);
      console.log('🔍 SEARCH DEBUG: API response:', data);
      
      // Handle different response formats
      let productsArray = [];
      if (Array.isArray(data)) {
        productsArray = data;
      } else if (data && data.results) {
        productsArray = data.results;
      } else if (data && data.data) {
        productsArray = data.data;
      } else if (data && Array.isArray(data)) {
        productsArray = data;
      }
      
      console.log('🔍 SEARCH DEBUG: Processed products array:', productsArray);
      setProducts(productsArray);
      
    } catch (err) {
      console.error('🔍 SEARCH DEBUG: Search failed:', err);
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log('🔍 SEARCH DEBUG: useEffect triggered with query:', query);
    
    // Debounce search to avoid too many API calls
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300); // Reduced debounce time

    return () => clearTimeout(timeoutId);
  }, [query, performSearch]);

  if (loading) {
    return (
      <div className="py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Searching for "{query}"...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <div className="text-center text-red-600">
          <p>Search failed. Please try again.</p>
          <p className="text-sm mt-2">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!query || query.trim().length < 1) {
    return (
      <div className="py-8">
        <div className="text-center text-gray-600">
          <p>Enter keywords to search for products</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No results found for "{query}"
          </h3>
          <p className="text-gray-600">
            Try different keywords or browse our categories
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Search Results for "{query}"
        </h3>
        <p className="text-gray-600">
          Found {products.length} product{products.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}