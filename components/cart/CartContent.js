'use client';

import { useState, useEffect, useRef } from 'react';
import { getCart, updateCartItem, removeFromCart } from '@/utils/api';
import { useAuth } from '@/hooks/useAuth';

export default function CartContent() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [initialized, setInitialized] = useState(false);
  const [suppressEmpty, setSuppressEmpty] = useState(true);
  const { user, loading: authLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    const t = setTimeout(() => setSuppressEmpty(false), 400);
    return () => clearTimeout(t);
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      if (!isAuthenticated) {
        const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(localCart);
        return;
      }

      const data = await getCart();
      let items = [];
      if (data && data.items) items = data.items;
      else if (data && data.results) items = data.results;
      else if (Array.isArray(data)) items = data;
      else if (data && data.data) items = data.data;
      setCartItems(items);
    } catch (err) {
      console.error('🛒 Cart fetch failed:', err);
      setError('Failed to load cart');
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    setInitialized(false);
    fetchCart();
  }, [authLoading, isAuthenticated]);

  const hasAuthToken = typeof window !== 'undefined' && !!localStorage.getItem('authToken');
  const pendingAuth = !isAuthenticated && hasAuthToken;

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price || item.product?.price || 0);
      const quantity = parseInt(item.quantity || 1);
      return sum + (price * quantity);
    }, 0);
  };

  const calculateShipping = (postcode = '') => {
    const subtotal = calculateSubtotal();
    if (postcode.toUpperCase().startsWith('M')) return 0;
    const ukMainlandPrefixes = ['B', 'BR', 'CB', 'CM', 'CO', 'CR', 'CV', 'DA', 'E', 'EC', 'EN', 'HA', 'HP', 'IG', 'KT', 'LU', 'MK', 'N', 'NW', 'OX', 'RG', 'RM', 'SE', 'SG', 'SL', 'SM', 'SS', 'SW', 'TN', 'TW', 'UB', 'W', 'WC', 'WD', 'AL', 'PE', 'NG', 'LE', 'DE', 'S', 'DN', 'LN', 'HU', 'YO', 'LS', 'BD', 'HG', 'DL', 'TS', 'NE', 'SR', 'DH', 'CA', 'LA', 'PR', 'FY', 'BB', 'BL', 'OL', 'SK', 'WA', 'CW', 'ST', 'WS', 'DY', 'WV', 'TF', 'SY', 'LD', 'HR', 'GL', 'SN', 'BA', 'BS', 'TA', 'EX', 'PL', 'TQ', 'DT', 'BH', 'SO', 'PO', 'GU', 'RH', 'BN', 'CF', 'SA', 'NP', 'G', 'ML', 'EH', 'KY', 'FK', 'DD'];
    const prefix = postcode.toUpperCase().substring(0, 2).trim() || postcode.toUpperCase().substring(0, 1);
    const isUkMainland = ukMainlandPrefixes.some(p => prefix.startsWith(p));
    if (isUkMainland) return subtotal >= 50 ? 0 : 5.99;
    const remotePrefixes = ['AB', 'IV', 'KW', 'PA', 'PH', 'HS', 'ZE', 'KA', 'DG', 'BT', 'IM', 'JE', 'GY', 'TR'];
    if (remotePrefixes.some(p => prefix.startsWith(p))) return 8.99;
    return 15.99;
  };

  const calculateTotal = () => calculateSubtotal() + calculateShipping();

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      // Optimistic update
      setCartItems(prev => prev.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item));
      if (isAuthenticated) {
        await updateCartItem(itemId, newQuantity);
      } else {
        const updated = (cartItems || []).map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item);
        localStorage.setItem('cart', JSON.stringify(updated));
      }
    } catch (err) {
      fetchCart();
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      // Optimistic update
      setCartItems(prev => prev.filter(item => item.id !== itemId));
      if (isAuthenticated) {
        await removeFromCart(itemId);
      } else {
        const updated = (cartItems || []).filter(item => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(updated));
      }
    } catch (err) {
      fetchCart();
    }
  };

  // Spinner while first load, auth pending, or minimum delay to avoid empty flash
  if (authLoading || pendingAuth || !initialized || loading || suppressEmpty) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading your cart...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-600 mb-4">Looks like you haven't added anything to your cart yet</p>
        <a 
          href="/"
          className="inline-block px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Start Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
      
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
            <img 
              src={item.product?.image || item.image || '/placeholder.jpg'} 
              alt={item.product?.name || item.name || 'Product'}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.product?.name || item.name || 'Product'}</h3>
              <p className="text-sm text-gray-600">
                Size: {item.size || 'N/A'} | Color: {item.color || 'N/A'}
              </p>
              <p className="text-lg font-semibold">£{item.price || item.product?.price || 0}</p>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={item.quantity || 1}
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                className="border rounded px-2 py-1"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Postcode for shipping calculation */}
      <div className="border-t pt-4">
        <div className="mb-4">
          <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-2">
            Enter your postcode for shipping calculation:
          </label>
          <input
            type="text"
            id="postcode"
            value={''} // No postcode state, always empty for now
            onChange={(e) => {}} // No postcode setter, always empty for now
            placeholder="e.g., M1 1AA"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>£{calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>{calculateShipping() === 0 ? 'Free' : `£${calculateShipping().toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>£{calculateTotal().toFixed(2)}</span>
          </div>
        </div>
        
        <button className="w-full mt-4 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}