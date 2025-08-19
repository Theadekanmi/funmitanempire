'use client';

import { useState } from 'react';
import { searchProducts } from '@/utils/api';

export default function TestSearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      console.log('🔍 Testing search for:', query);
      
      // Test 1: Direct fetch
      console.log('🔍 Test 1: Direct fetch...');
              const directResponse = await fetch(`/api/v1/products/?search=${encodeURIComponent(query)}`);
      console.log('Direct fetch status:', directResponse.status);
      
      if (directResponse.ok) {
        const directData = await directResponse.json();
        console.log('Direct fetch data:', directData);
      }
      
      // Test 2: API function
      console.log('🔍 Test 2: API function...');
      const apiData = await searchProducts(query);
      console.log('API function data:', apiData);
      
      const productsArray = Array.isArray(apiData) ? apiData : 
                          apiData.results || apiData.data || [];
      
      setResults(productsArray);
      console.log('Final results:', productsArray);
      
    } catch (err) {
      console.error('Search test failed:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Search Test Page</h1>
      
      <div className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search term..."
          className="border p-2 mr-2"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && (
        <div className="text-red-600 mb-4">
          Error: {error}
        </div>
      )}

      {results.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Found {results.length} result(s):
          </h2>
          <div className="space-y-2">
            {results.map((product) => (
              <div key={product.id} className="border p-4 rounded">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-600">£{product.price}</p>
                <p className="text-sm text-gray-500">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && !error && results.length === 0 && query && (
        <div className="text-gray-600">
          No results found for "{query}"
        </div>
      )}
    </div>
  );
}
