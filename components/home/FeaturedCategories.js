'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const FeaturedCategories = () => {
  const categories = [
    {
      id: 'women',
      name: 'Women\'s Fashion',
      description: 'Elegant dresses, stylish tops, and contemporary designs',
      href: '/women',
      color: 'from-pink-500 to-rose-600',
      featured: true,
    },
    {
      id: 'teens',
      name: 'Teen Collection',
      description: 'Trendy and age-appropriate fashion for teenagers',
      href: '/teens',
      color: 'from-purple-500 to-indigo-600',
      featured: true,
    },
    {
      id: 'men',
      name: 'Men\'s Wear',
      description: 'Classic and modern styles for the contemporary man',
      href: '/men',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      id: 'fabrics',
      name: 'Premium Fabrics',
      description: 'Authentic African fabrics and premium textiles',
      href: '/fabrics',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      id: 'gele',
      name: 'Gele Collection',
      description: 'Traditional headwraps with modern styling',
      href: '/gele',
      color: 'from-amber-500 to-orange-600',
    },
    {
      id: 'sale',
      name: 'Sale Items',
      description: 'Great deals on premium fashion items',
      href: '/sale',
      color: 'from-red-500 to-pink-600',
      isAccent: true,
    },
  ]

  return (
    <div className="container-custom">
      <div className="text-center mb-12">
        <h2 className="heading-secondary mb-4">
          Shop by Category
        </h2>
        <p className="text-body max-w-2xl mx-auto">
          Explore our carefully curated collections designed for every style and occasion
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90`}></div>
            
            {/* Content */}
            <div className="relative p-8 h-64 flex flex-col justify-between text-white">
              {/* Badge */}
              {category.featured && (
                <div className="absolute top-4 right-4">
                  <span className="bg-white bg-opacity-20 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                    Featured
                  </span>
                </div>
              )}
              
              {category.isAccent && (
                <div className="absolute top-4 right-4">
                  <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                    SALE
                  </span>
                </div>
              )}

              {/* Category Icon */}
              <div className="flex-1 flex items-center justify-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 100 100">
                    <circle cx="50" cy="30" r="15" />
                    <path d="M20 70 Q30 50 50 70 Q70 50 80 70 L80 85 Q50 95 20 85 Z" />
                  </svg>
                </div>
              </div>

              {/* Text Content */}
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-200 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm opacity-90 mb-4">
                  {category.description}
                </p>
                <div className="flex items-center justify-center text-sm font-medium group-hover:translate-x-1 transition-transform">
                  Shop Now
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default FeaturedCategories