'use client'

import React from 'react'
import CategoryBanner from '@/components/products/CategoryBanner'
import ProductGrid from '@/components/products/ProductGrid'

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      <CategoryBanner 
        title="All Products"
        description="Discover our complete collection of premium African fashion, fabrics, and accessories"
      />
      
      <div className="container mx-auto px-4 py-8">
        <ProductGrid />
      </div>
    </div>
  );
}
