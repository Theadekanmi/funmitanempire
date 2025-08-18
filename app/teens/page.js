'use client'

import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CategoryBanner from '@/components/products/CategoryBanner';
import ProductGrid from '@/components/products/ProductGrid';

export default function TeensPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CategoryBanner 
        title="Teens Collection"
        description="Trendy and fashionable styles for teenagers"
        image="/images/teens-banner.jpg"
      />
      
      <div className="container mx-auto px-4 py-8">
        <ProductGrid category="teens" />
      </div>
      <Footer />
    </div>
  );
}