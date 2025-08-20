import Link from 'next/link'
import AddToCartButton from '@/components/cart/AddToCartButton'

const API_BASE = '/api/v1'
const BACKEND_ORIGIN = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000'

async function fetchProduct(slug) {
  try {
    const res = await fetch(`${BACKEND_ORIGIN}${API_BASE}/products/${slug}/`, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if (!res.ok) return null
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export default async function ProductDetailPage({ params }) {
  const { slug } = params
  const product = await fetchProduct(slug)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <p className="text-gray-600 mt-2">We couldn't find that product.</p>
          <Link href="/" className="mt-4 inline-block text-primary-600">Go back home</Link>
        </div>
      </div>
    )
  }

  const imageSrc = product.image
    ? (product.image.startsWith('http') ? product.image : `${BACKEND_ORIGIN}${product.image}`)
    : null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-10">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-gray-700 hover:text-primary-600">Home</Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link href={`/${product.category?.slug}`} className="text-gray-700 hover:text-primary-600">
                  {product.category?.name}
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-500">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="aspect-square bg-gray-100 relative">
              {imageSrc ? (
                <img 
                  src={imageSrc} 
                  alt={product.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2">No image available</p>
                  </div>
                </div>
              )}
              
              {/* Sale Badge */}
              {product.on_sale && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                  Sale
                </div>
              )}
              
              {/* Featured Badge */}
              {product.is_featured && (
                <div className="absolute top-4 right-4 bg-primary-600 text-white px-2 py-1 rounded-md text-sm font-medium">
                  Featured
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-4">
              <span className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                {product.category?.name}
              </span>
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-6">
              {product.on_sale ? (
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold text-red-600">£{product.current_price}</span>
                  <span className="text-xl text-gray-500 line-through">£{product.price}</span>
                  <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded">
                    Save £{(parseFloat(product.price) - parseFloat(product.current_price)).toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-900">£{product.current_price || product.price}</span>
              )}
            </div>
            
            <div className="prose prose-gray max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
            </div>
            
            {/* Stock Status */}
            <div className="mb-6">
              <div className="flex items-center">
                {product.stock_quantity > 0 ? (
                  <>
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-green-700 font-medium">In Stock ({product.stock_quantity} available)</span>
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                    <span className="text-red-700 font-medium">Out of Stock</span>
                  </>
                )}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-4">
              <AddToCartButton 
                productId={product.id} 
                className="w-full bg-primary-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 transition-all duration-200 text-lg"
                disabled={product.stock_quantity === 0}
              />
              
              <div className="flex space-x-4">
                <Link 
                  href={`/${product.category?.slug}`} 
                  className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 text-center"
                >
                  View More {product.category?.name}
                </Link>
                <Link 
                  href="/" 
                  className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 text-center"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
            
            {/* Product Features */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Product Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Premium Quality Materials
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Fast UK Delivery
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Easy Returns & Exchanges
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
