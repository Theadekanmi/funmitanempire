'use client'

import React from 'react'
import { StarIcon } from '@heroicons/react/24/solid'

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'London, UK',
      rating: 5,
      text: 'Absolutely love the quality of the fabrics! The Ankara dress I ordered exceeded my expectations. Fast delivery and excellent customer service.',
      product: 'Ankara Dress Collection',
    },
    {
      id: 2,
      name: 'Amara Okafor',
      location: 'Manchester, UK',
      rating: 5,
      text: 'The gele headwraps are authentic and beautifully crafted. Perfect for special occasions. Funmitan Empire has become my go-to for African fashion.',
      product: 'Traditional Gele',
    },
    {
      id: 3,
      name: 'Emily Thompson',
      location: 'Birmingham, UK',
      rating: 5,
      text: 'Ordered fabrics for my daughter\'s graduation outfit. The quality is outstanding and the patterns are vibrant. Will definitely order again!',
      product: 'Premium Fabrics',
    },
    {
      id: 4,
      name: 'David Wilson',
      location: 'Liverpool, UK',
      rating: 4,
      text: 'Great selection of men\'s wear. The shirts fit perfectly and the material feels premium. Delivery was quick too.',
      product: 'Men\'s Casual Shirts',
    },
  ]

  return (
    <div className="container-custom">
      <div className="text-center mb-12">
        <h2 className="heading-secondary mb-4">
          What Our Customers Say
        </h2>
        <p className="text-body max-w-2xl mx-auto">
          Join thousands of satisfied customers who love our premium fashion and authentic African fabrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <div 
            key={testimonial.id} 
            className={`card p-6 ${index === 0 || index === 3 ? 'md:transform md:-translate-y-4' : ''}`}
          >
            {/* Rating Stars */}
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-5 h-5 ${
                    i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {testimonial.rating}.0
              </span>
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-gray-700 mb-6 leading-relaxed">
              "{testimonial.text}"
            </blockquote>

            {/* Customer Info */}
            <div className="flex items-center">
              {/* Avatar Placeholder */}
              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                {testimonial.name.charAt(0)}
              </div>
              
              <div className="flex-1">
                <div className="font-semibold text-gray-900">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-600">
                  {testimonial.location}
                </div>
                <div className="text-xs text-primary-600 font-medium">
                  Purchased: {testimonial.product}
                </div>
              </div>

              {/* Quote Icon */}
              <div className="text-primary-200">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div className="text-3xl font-bold text-primary-600 mb-2">1000+</div>
          <div className="text-sm text-gray-600">Happy Customers</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-primary-600 mb-2">4.8</div>
          <div className="text-sm text-gray-600">Average Rating</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
          <div className="text-sm text-gray-600">Products Sold</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-primary-600 mb-2">99%</div>
          <div className="text-sm text-gray-600">Satisfaction Rate</div>
        </div>
      </div>
    </div>
  )
}

export default TestimonialsSection