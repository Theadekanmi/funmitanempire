import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'About Us - Meet CEO Racheal Oluwafunmilayo Odekanle',
  description: 'Learn about Racheal Oluwafunmilayo Odekanle, CEO of Funmitan Empire Limited. From Ile-Ife, Nigeria to the UK, celebrating African cultural heritage through fashion.',
  keywords: ['Racheal Odekanle', 'CEO', 'African fashion', 'Ile-Ife', 'Nigerian fashion designer', 'UK African fashion'],
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16 lg:py-24">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                About Funmitan Empire Limited
              </h1>
              <p className="text-xl text-primary-100 leading-relaxed">
                Celebrating African cultural heritage through premium fashion and authentic designs
              </p>
            </div>
          </div>
        </section>

        {/* CEO Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* CEO Image */}
              <div className="lg:order-2">
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center">
                    <div className="text-center text-primary-600">
                      <div className="w-32 h-32 mx-auto mb-4 bg-primary-300 rounded-full flex items-center justify-center">
                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 100 100">
                          <circle cx="50" cy="35" r="15" />
                          <path d="M25 75 Q25 55 50 55 Q75 55 75 75 Z" />
                        </svg>
                      </div>
                      <p className="font-medium text-lg">Racheal Oluwafunmilayo Odekanle</p>
                      <p className="text-sm">CEO & Founder</p>
                    </div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent-500 rounded-full opacity-20"></div>
                  <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary-500 rounded-full opacity-20"></div>
                </div>
              </div>

              {/* CEO Story */}
              <div className="lg:order-1">
                <div className="mb-6">
                  <span className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    Meet Our CEO
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                    Racheal Oluwafunmilayo Odekanle
                  </h2>
                </div>

                <div className="prose prose-lg max-w-none text-gray-700">
                  <p className="mb-6">
                    Born and raised in the historic city of <strong>Ile-Ife, Osun State, Nigeria</strong>, 
                    Racheal's fashion journey began shortly after completing her secondary school education. 
                    Before pursuing further education at The Polytechnic Ibadan, Saki Campus, her passion 
                    for fashion took root.
                  </p>

                  <p className="mb-6">
                    Her exceptional skills and dedication earned recognition from local and national 
                    authorities. After relocating to the <strong>United Kingdom</strong>, where she built 
                    a happy family life as a married woman and mother of three baby boys (including twins), 
                    Racheal continued to nurture her love for fashion.
                  </p>

                  <p className="mb-6">
                    She brought her expertise to the UK, offering a range of services including:
                  </p>

                  <ul className="list-disc list-inside mb-6 space-y-2">
                    <li>Bespoke African designs for men, women, and children</li>
                    <li>Sales of premium African fabrics</li>
                    <li>Ready-to-wear clothing collections</li>
                    <li>Sewing accessories and materials</li>
                  </ul>

                  <p className="text-lg font-medium text-primary-700">
                    All celebrating African cultural heritage and bringing authentic designs to the UK market.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">10+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">1000+</div>
                    <div className="text-sm text-gray-600">Happy Customers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Mission */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  To celebrate and preserve African cultural heritage through premium fashion, 
                  bringing authentic designs and quality craftsmanship to families across the UK. 
                  We strive to make African fashion accessible while maintaining the highest 
                  standards of quality and authenticity.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To become the leading destination for authentic African fashion in the UK, 
                  bridging cultures through beautiful designs that honor tradition while 
                  embracing contemporary style. We envision a world where African heritage 
                  is celebrated and cherished globally.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do at Funmitan Empire Limited
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Quality */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality</h3>
                <p className="text-gray-600">
                  We use only the finest materials and employ skilled craftsmanship to ensure 
                  every piece meets our high standards.
                </p>
              </div>

              {/* Authenticity */}
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Authenticity</h3>
                <p className="text-gray-600">
                  Our designs honor traditional African patterns and techniques, 
                  bringing genuine cultural heritage to modern fashion.
                </p>
              </div>

              {/* Family */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Family</h3>
                <p className="text-gray-600">
                  As a mother and family woman, Racheal understands the importance of 
                  clothing that brings families together and creates lasting memories.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary-600 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Experience Authentic African Fashion?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Discover our collection of premium designs that celebrate heritage and embrace modern style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/women" className="btn-white">
                Shop Women's Collection
              </a>
              <a href="/contact" className="btn-outline-white">
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}