'use client'

import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CategoryBanner from '@/components/products/CategoryBanner'
import ProductGrid from '@/components/products/ProductGrid'

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CategoryBanner 
        title="All Products"
        description="Discover our complete collection of premium African fashion, fabrics, and accessories"
      />
      
      <div className="container mx-auto px-4 py-8">
        <ProductGrid />
      </div>
      <Footer />
    </div>
  );
}
