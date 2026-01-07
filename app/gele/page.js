'use client'

import CategoryBanner from '@/components/products/CategoryBanner';
import ProductGrid from '@/components/products/ProductGrid';

export default function GelePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      <CategoryBanner 
        title="Gele Collection"
        description="Traditional head wraps and accessories for special occasions"
        image="/images/gele-banner.jpg"
      />
      
      <div className="container mx-auto px-4 py-8">
        <ProductGrid category="gele" />
      </div>
    </div>
  );
}
