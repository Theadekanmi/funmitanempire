'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 overflow-hidden">
      <div className="container-custom py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <h1 className="heading-primary mb-6 text-balance">
              African Fashion for the
              <span className="text-primary-600 block">Modern You</span>
            </h1>
            
            <p className="text-body mb-8 max-w-lg">
              Discover our curated collection of premium fashion wear, authentic African fabrics, 
              and traditional gele. Quality craftsmanship meets contemporary style.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link 
                href="/women" 
                className="btn-primary inline-flex items-center justify-center group"
              >
                Shop Women's Collection
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/fabrics" 
                className="btn-secondary inline-flex items-center justify-center"
              >
                Browse Fabrics
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-primary-600 mb-1">
                  1000+
                </div>
                <div className="text-sm text-gray-600">
                  Happy Customers
                </div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-primary-600 mb-1">
                  500+
                </div>
                <div className="text-sm text-gray-600">
                  Products
                </div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-primary-600 mb-1">
                  24h
                </div>
                <div className="text-sm text-gray-600">
                  Fast Delivery
                </div>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary-200 to-primary-300">
              {/* Placeholder for hero image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-primary-700">
                  <div className="w-32 h-32 mx-auto mb-4 bg-primary-400 rounded-full flex items-center justify-center">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 100 100">
                      <circle cx="50" cy="30" r="15" />
                      <path d="M20 70 Q30 50 50 70 Q70 50 80 70 L80 85 Q50 95 20 85 Z" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium">Fashion Collection</p>
                  <p className="text-sm opacity-75">Premium Quality</p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-white bg-opacity-20 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-white bg-opacity-20 rounded-full"></div>
              <div className="absolute top-1/2 left-4 w-8 h-8 bg-white bg-opacity-20 rounded-full"></div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 hidden lg:block">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">FREE Delivery</p>
                  <p className="text-xs text-gray-600">Manchester (any amount) | UK mainland £50+</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 hidden lg:block">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">4.9/5 Rating</p>
                  <p className="text-xs text-gray-600">From 1000+ reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-200 to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-primary-200 to-transparent opacity-20"></div>
    </section>
  )
}

export default HeroSection