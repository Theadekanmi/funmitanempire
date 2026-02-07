'use client'

import React from 'react'
import CategoryBanner from '@/components/products/CategoryBanner'
import ProductGrid from '@/components/products/ProductGrid'
import { notFound } from 'next/navigation'

export default function DynamicCategoryPage({ params }) {
  const { category } = params
  
  // Map category slugs to display names and descriptions
  const categoryInfo = {
    'women': {
      title: "Women's Collection",
      description: "Elegant and stylish fashion for the modern woman"
    },
    'men': {
      title: "Men's Collection",
      description: "Fashion and accessories for men"
    },
    'teens': {
      title: "Teens Collection",
      description: "Fashion and accessories for teenagers"
    },
    'fabrics': {
      title: "Fabrics & Materials",
      description: "Premium African fabrics and materials"
    },
    'gele': {
      title: "Gele & Headwraps",
      description: "Beautiful African headwraps and gele collections"
    },
    'trending': {
      title: "Trending Now",
      description: "Hottest fashion items trending right now"
    },
    'bubu-gown': {
      title: "Bubu Gown",
      description: "Premium African Bubu Gowns"
    },
    'kids-bubu-gown': {
      title: "Kids Bubu Gown",
      description: "Made with Ankara 100% cotton. From ages 5 to ages 13"
    },
    'sale': {
      title: "Sale Items",
      description: "Amazing deals on selected items"
    }
  }

  const info = categoryInfo[category]
  
  // If category doesn't exist in our map, show 404
  if (!info) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CategoryBanner 
        title={info.title}
        description={info.description}
        image={`/images/${category}-banner.jpg`}
      />
      
      <div className="container mx-auto px-4 py-8">
        <ProductGrid category={category} />
      </div>
    </div>
  )
}
