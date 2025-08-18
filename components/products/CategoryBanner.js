'use client'

import React from 'react'

export default function CategoryBanner({ title, description, totalProducts }) {
  return (
    <section className="bg-gradient-to-r from-orange-500 to-pink-500 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {title}
          </h1>
          <p className="text-xl text-orange-100 mb-6 max-w-3xl mx-auto">
            {description}
          </p>
          {totalProducts && (
            <div className="inline-flex items-center bg-white bg-opacity-20 rounded-full px-6 py-2">
              <span className="text-lg font-semibold">
                {totalProducts} Product{totalProducts !== 1 ? 's' : ''} Available
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
