'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { products } from '@/utils/api';
import ProductCard from '@/components/products/ProductCard';

export default function ProductGrid({ category = null, filters = {} }) {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Debug info
  useEffect(() => {
    console.log('🔍 ProductGrid Debug Info:');
    console.log('  Category:', category);
    console.log('  Current Page:', currentPage);
    console.log('  Total Pages:', totalPages);
    console.log('  Total Products:', totalProducts);
    console.log('  Products on this page:', productsList.length);
    console.log('  Loading:', loading);
    console.log('  Error:', error);
  }, [category, currentPage, totalPages, totalProducts, productsList.length, loading, error]);

  // Memoize the fetch function to prevent unnecessary re-renders
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching products for category:', category);
      console.log('Filters:', filters);
      console.log('Current page:', currentPage);
      
      // Build query parameters
      const params = { ...filters };
      if (category) {
        // Use category slug for filtering
        params.category__slug = category;
      }
      
      console.log('API params:', params);
      
      const data = await products.getAll({ ...params, page: currentPage });
      console.log('API response data:', data);
      console.log('API response structure:', {
        isArray: Array.isArray(data),
        hasResults: !!data.results,
        hasData: !!data.data,
        count: data.count,
        next: data.next,
        previous: data.current_page || currentPage
      });
      
      // Handle pagination response
      const productsArray = Array.isArray(data) ? data : 
                          data.results || data.data || [];
      
      console.log('Processed products array:', productsArray);
      setProductsList(productsArray);
      
      // Set pagination info
      if (data.count !== undefined) {
        setTotalProducts(data.count);
        setTotalPages(Math.ceil(data.count / 20)); // 20 products per page
        console.log('📊 Pagination set:', { count: data.count, totalPages: Math.ceil(data.count / 20) });
      }
      
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError(err.message);
      setProductsList([]);
    } finally {
      setLoading(false);
    }
  }, [category, currentPage]); // Remove JSON.stringify(filters) to prevent infinite loops

  useEffect(() => {
    // Reset to page 1 when category changes
    setCurrentPage(1);
  }, [category]);

  useEffect(() => {
    // Only fetch if we have a valid category or no category specified
    if (category !== undefined) {
      fetchProducts();
    }
  }, [category, currentPage]); // Direct dependency on category and currentPage

  if (loading) {
    return (
      <div className="py-8">
        <div className="text-center mb-4">
          <p className="text-gray-600">Loading products...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <div className="text-center text-red-600">
          <p>Failed to load products. Please try again.</p>
          <p className="text-sm mt-2">Error: {error}</p>
          <button 
            onClick={() => fetchProducts()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (productsList.length === 0) {
    return (
      <div className="py-8">
        <div className="text-center text-gray-600">
          <p>No products found in this category.</p>
          <p className="text-sm mt-2">Category: {category}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 text-sm text-gray-600">
        Showing {productsList.length} of {totalProducts} product{totalProducts !== 1 ? 's' : ''} for category: {category || 'All Categories'}
        {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
      </div>
      

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {productsList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
          >
            Previous
          </button>
          
          <div className="flex space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-2 rounded-lg ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}
      
      {/* View All Products Link for categories with many products */}
      {totalProducts > 20 && (
        <div className="mt-6 text-center">
          <Link 
            href="/products" 
            className="inline-block bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            View All {totalProducts} Products
          </Link>
        </div>
      )}
    </div>
  );
}