'use client'

import React from 'react'
import CategoryBanner from '@/components/products/CategoryBanner';
import ProductGrid from '@/components/products/ProductGrid';

export default function WomenPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CategoryBanner 
        title="Women's Collection"
        description="Elegant and stylish fashion for the modern woman"
        image="/images/women-banner.jpg"
      />
      
      <div className="container mx-auto px-4 py-8">
        <ProductGrid category="women" />
      </div>
    </div>
  );
}
