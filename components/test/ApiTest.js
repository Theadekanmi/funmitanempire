'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import toast from 'react-hot-toast';

const ApiTest = () => {
  const [testResults, setTestResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const runTests = async () => {
    setIsLoading(true);
    const results = {};

    try {
      // Test 1: Health check
      try {
        const healthResponse = await fetch('/health/');
        results.health = healthResponse.ok ? '✅ Connected' : '❌ Failed';
      } catch (error) {
        results.health = '❌ Connection failed';
      }

      // Test 2: Categories API
      try {
        const categoriesResponse = await api.categories.getAll();
        results.categories = categoriesResponse ? '✅ Working' : '❌ Failed';
      } catch (error) {
        results.categories = `❌ Error: ${error.message}`;
      }

      // Test 3: Products API
      try {
        const productsResponse = await api.products.getAll();
        results.products = productsResponse ? '✅ Working' : '❌ Failed';
      } catch (error) {
        results.products = `❌ Error: ${error.message}`;
      }

      // Test 4: Featured Products
      try {
        const featuredResponse = await api.products.getFeatured();
        results.featured = featuredResponse ? '✅ Working' : '❌ Failed';
      } catch (error) {
        results.featured = `❌ Error: ${error.message}`;
      }

      // Test 5: Search API
      try {
        const searchResponse = await api.products.search('women');
        results.search = searchResponse ? '✅ Working' : '❌ Failed';
      } catch (error) {
        results.search = `❌ Error: ${error.message}`;
      }

    } catch (error) {
      console.error('Test error:', error);
    }

    setTestResults(results);
    setIsLoading(false);
  };

  useEffect(() => {
    runTests();
  }, []);

  return (
    <div className="container-custom py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Frontend-Backend Connection Test
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              API Connection Status
            </h2>
            <button
              onClick={runTests}
              disabled={isLoading}
              className="btn-primary"
            >
              {isLoading ? 'Testing...' : 'Run Tests'}
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">Backend Health Check:</span>
              <span className={testResults.health?.includes('✅') ? 'text-green-600' : 'text-red-600'}>
                {testResults.health || '⏳ Testing...'}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">Categories API:</span>
              <span className={testResults.categories?.includes('✅') ? 'text-green-600' : 'text-red-600'}>
                {testResults.categories || '⏳ Testing...'}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">Products API:</span>
              <span className={testResults.products?.includes('✅') ? 'text-green-600' : 'text-red-600'}>
                {testResults.products || '⏳ Testing...'}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">Featured Products:</span>
              <span className={testResults.featured?.includes('✅') ? 'text-green-600' : 'text-red-600'}>
                {testResults.featured || '⏳ Testing...'}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">Search API:</span>
              <span className={testResults.search?.includes('✅') ? 'text-green-600' : 'text-red-600'}>
                {testResults.search || '⏳ Testing...'}
              </span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Connection Details:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Frontend URL: http://localhost:3001</li>
                              <li>• Backend URL: {process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000'}</li>
                <li>• API Base: {process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000'}/api/v1/</li>
              <li>• CORS: Configured for localhost:3000</li>
            </ul>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">Next Steps:</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• If tests fail, check if Django backend is running</li>
              <li>• Add sample products through Django admin</li>
              <li>• Test search functionality with real data</li>
              <li>• Implement authentication flow</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiTest; 