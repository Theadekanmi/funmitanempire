'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CategoryBanner from '@/components/products/CategoryBanner';
import ProductGrid from '@/components/products/ProductGrid';

export default function FabricsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CategoryBanner 
        title="Fabrics Collection"
        description="High-quality fabrics for custom designs and traditional wear"
        image="/images/fabrics-banner.jpg"
      />
      
      <div className="container mx-auto px-4 py-8">
        <ProductGrid category="fabrics" />
      </div>
      <Footer />
    </div>
  );
}