'use client';

import { useState, useEffect } from 'react';
import { wishlist } from '@/utils/api';
import { useAuth } from '@/hooks/useAuth';
import ProductCard from '@/components/products/ProductCard';

export default function WishlistContent() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      if (!user) {
        const localWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setWishlistItems(localWishlist);
        return;
      }

      const data = await wishlist.get();
      
      // Handle different response formats
      let items = [];
      if (data && data.items) {
        items = data.items;
      } else if (data && data.results) {
        items = data.results;
      } else if (Array.isArray(data)) {
        items = data;
      } else if (data && data.data) {
        items = data.data;
      }
      setWishlistItems(items);
      
    } catch (err) {
      console.error('💖 Wishlist fetch failed:', err);
      setError('Failed to load wishlist');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const handleRemoveFromWishlist = async (productId) => {
    try {

      await wishlist.remove(productId);
      fetchWishlist(); // Refresh wishlist
    } catch (err) {
      console.error('💖 Remove from wishlist failed:', err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading wishlist...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>{error}</p>
        <button 
          onClick={fetchWishlist}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
        <p className="text-gray-600 mb-4">Add some products to your wishlist!</p>
        <a 
          href="/"
          className="inline-block px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">My Wishlist</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="relative">
            <ProductCard product={item.product || item} />
            <button
              onClick={() => handleRemoveFromWishlist(item.product?.id || item.id)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}