'use client'

import React, { useState, useEffect } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

const ProductFilters = ({ products, onFilterChange, category }) => {
  const [filters, setFilters] = useState({
    priceRange: [0, 200],
    categories: [],
    sizes: [],
    colors: [],
  })

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    category: true,
    size: true,
    color: true,
  })

  // Extract unique values from products
  const uniqueCategories = [...new Set(products.map(p => p.category))]
  const uniqueSizes = [...new Set(products.flatMap(p => p.sizes || []))]
  const uniqueColors = [...new Set(products.flatMap(p => p.colors || []))]
  const priceRange = [
    Math.min(...products.map(p => p.price)),
    Math.max(...products.map(p => p.price))
  ]

  useEffect(() => {
    onFilterChange(filters)
  }, [filters, onFilterChange])

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value)
    const newPriceRange = e.target.name === 'minPrice' 
      ? [value, filters.priceRange[1]]
      : [filters.priceRange[0], value]
    
    setFilters({ ...filters, priceRange: newPriceRange })
  }

  const handleCheckboxChange = (type, value) => {
    const current = filters[type]
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value]
    
    setFilters({ ...filters, [type]: updated })
  }

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    })
  }

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 200],
      categories: [],
      sizes: [],
      colors: [],
    })
  }

  const hasActiveFilters = 
    filters.categories.length > 0 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 200

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full py-2 text-left"
        >
          <span className="font-medium text-gray-900">Price Range</span>
          {expandedSections.price ? (
            <ChevronUpIcon className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
          )}
        </button>
        
        {expandedSections.price && (
          <div className="mt-4 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">Min</label>
                <input
                  type="number"
                  name="minPrice"
                  value={filters.priceRange[0]}
                  onChange={handlePriceChange}
                  min={priceRange[0]}
                  max={priceRange[1]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">Max</label>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.priceRange[1]}
                  onChange={handlePriceChange}
                  min={priceRange[0]}
                  max={priceRange[1]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="text-sm text-gray-600">
              £{filters.priceRange[0]} - £{filters.priceRange[1]}
            </div>
          </div>
        )}
      </div>

      {/* Categories */}
      {uniqueCategories.length > 1 && (
        <div className="mb-6">
          <button
            onClick={() => toggleSection('category')}
            className="flex items-center justify-between w-full py-2 text-left"
          >
            <span className="font-medium text-gray-900">Category</span>
            {expandedSections.category ? (
              <ChevronUpIcon className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDownIcon className="w-4 h-4 text-gray-500" />
            )}
          </button>
          
          {expandedSections.category && (
            <div className="mt-4 space-y-3">
              {uniqueCategories.map((cat) => (
                <label key={cat} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(cat)}
                    onChange={() => handleCheckboxChange('categories', cat)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-3 text-sm text-gray-700">{cat}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sizes */}
      {uniqueSizes.length > 0 && (
        <div className="mb-6">
          <button
            onClick={() => toggleSection('size')}
            className="flex items-center justify-between w-full py-2 text-left"
          >
            <span className="font-medium text-gray-900">Size</span>
            {expandedSections.size ? (
              <ChevronUpIcon className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDownIcon className="w-4 h-4 text-gray-500" />
            )}
          </button>
          
          {expandedSections.size && (
            <div className="mt-4 space-y-3">
              {uniqueSizes.map((size) => (
                <label key={size} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.sizes.includes(size)}
                    onChange={() => handleCheckboxChange('sizes', size)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-3 text-sm text-gray-700">{size}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Colors */}
      {uniqueColors.length > 0 && (
        <div className="mb-6">
          <button
            onClick={() => toggleSection('color')}
            className="flex items-center justify-between w-full py-2 text-left"
          >
            <span className="font-medium text-gray-900">Color</span>
            {expandedSections.color ? (
              <ChevronUpIcon className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDownIcon className="w-4 h-4 text-gray-500" />
            )}
          </button>
          
          {expandedSections.color && (
            <div className="mt-4 space-y-3">
              {uniqueColors.map((color) => (
                <label key={color} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.colors.includes(color)}
                    onChange={() => handleCheckboxChange('colors', color)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-3 text-sm text-gray-700">{color}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Active Filters</h4>
          <div className="space-y-2">
            {filters.categories.length > 0 && (
              <div className="text-sm">
                <span className="text-gray-600">Categories: </span>
                <span className="text-gray-900">{filters.categories.join(', ')}</span>
              </div>
            )}
            {filters.sizes.length > 0 && (
              <div className="text-sm">
                <span className="text-gray-600">Sizes: </span>
                <span className="text-gray-900">{filters.sizes.join(', ')}</span>
              </div>
            )}
            {filters.colors.length > 0 && (
              <div className="text-sm">
                <span className="text-gray-600">Colors: </span>
                <span className="text-gray-900">{filters.colors.join(', ')}</span>
              </div>
            )}
            {(filters.priceRange[0] > 0 || filters.priceRange[1] < 200) && (
              <div className="text-sm">
                <span className="text-gray-600">Price: </span>
                <span className="text-gray-900">£{filters.priceRange[0]} - £{filters.priceRange[1]}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductFilters