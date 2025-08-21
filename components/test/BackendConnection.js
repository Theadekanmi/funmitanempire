'use client';

import { useState, useEffect } from 'react';
import { getProducts, getCategories } from '@/utils/api';

export default function BackendConnection() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiResponse, setApiResponse] = useState({});

  useEffect(() => {
    const testConnection = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Test products API
        const productsData = await getProducts();
        // Test categories API
        const categoriesData = await getCategories();
        
        // Handle different response formats
        const productsArray = Array.isArray(productsData) ? productsData : 
                            productsData.results || productsData.data || [];
        
        const categoriesArray = Array.isArray(categoriesData) ? categoriesData : 
                              categoriesData.results || categoriesData.data || [];
        
        setProducts(productsArray);
        setCategories(categoriesArray);
        setApiResponse({ products: productsData, categories: categoriesData });
        

        
      } catch (err) {
        console.error('❌ Backend connection failed:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Testing backend connection...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <h3 className="font-bold">Connection Failed</h3>
          <p className="text-sm">{error}</p>
          <p className="text-xs mt-2">
            Make sure the Django server is running at {process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
        <h3 className="font-bold">✅ Backend Connection Successful!</h3>
        <p className="text-sm">Frontend is now connected to Django backend</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Categories ({categories.length})</h3>
          <div className="space-y-2">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div key={category.id} className="bg-white p-3 rounded border">
                  <h4 className="font-medium">{category.name}</h4>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              ))
            ) : (
              <div className="bg-yellow-100 p-3 rounded border">
                <p className="text-sm text-yellow-800">No categories found</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Products ({products.length})</h3>
          <div className="space-y-2">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="bg-white p-3 rounded border">
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-gray-600">£{product.price}</p>
                  <p className="text-xs text-gray-500">{product.category?.name}</p>
                </div>
              ))
            ) : (
              <div className="bg-yellow-100 p-3 rounded border">
                <p className="text-sm text-yellow-800">No products found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded">
        <h4 className="font-semibold mb-2">API Endpoints Working:</h4>
        <ul className="text-sm space-y-1">
          <li>✅ GET /api/v1/products/</li>
          <li>✅ GET /api/v1/categories/</li>
                          <li>✅ Admin Panel: {process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000'}/admin/</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded">
        <h4 className="font-semibold mb-2">Raw API Response:</h4>
        <details className="text-xs">
          <summary className="cursor-pointer">Click to view raw response</summary>
          <pre className="mt-2 bg-white p-2 rounded overflow-auto">
            {JSON.stringify(apiResponse, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
}
