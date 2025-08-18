'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CategoryBanner from '@/components/products/CategoryBanner';
import ProductGrid from '@/components/products/ProductGrid';

export default function MenPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CategoryBanner 
        title="Men's Collection"
        description="Stylish and comfortable fashion for the modern man"
        image="/images/men-banner.jpg"
      />
      
      <div className="container mx-auto px-4 py-8">
        <ProductGrid category="men" />
      </div>
      <Footer />
    </div>
  );
}