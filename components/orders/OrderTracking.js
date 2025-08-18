'use client';

import { useState, useEffect } from 'react';
import { getOrders, getOrder } from '@/utils/api';

export default function OrderTracking({ orderNumber = null }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (orderNumber) {
      fetchOrder(orderNumber);
    } else {
      fetchOrders();
    }
  }, [orderNumber]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrder = async (orderNum) => {
    try {
      setLoading(true);
      const data = await getOrder(orderNum);
      setSelectedOrder(data);
    } catch (err) {
      setError('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'processing': 'bg-blue-100 text-blue-800',
      'shipped': 'bg-purple-100 text-purple-800',
      'delivered': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800',
      'refunded': 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'pending': '⏳',
      'processing': '⚙️',
      'shipped': '📦',
      'delivered': '✅',
      'cancelled': '❌',
      'refunded': '💰',
    };
    return icons[status] || '❓';
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (selectedOrder) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Order #{selectedOrder.order_number}</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
              {getStatusIcon(selectedOrder.status)} {selectedOrder.status.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Order Details</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Order Date:</span> {new Date(selectedOrder.created_at).toLocaleDateString()}</p>
                <p><span className="font-medium">Total Amount:</span> £{selectedOrder.total_amount}</p>
                <p><span className="font-medium">Shipping Cost:</span> £{selectedOrder.shipping_cost}</p>
                <p><span className="font-medium">Tax:</span> £{selectedOrder.tax_amount}</p>
                <p><span className="font-medium">Total with Shipping:</span> £{selectedOrder.total_with_shipping}</p>
                <p><span className="font-medium">Payment Method:</span> {selectedOrder.payment_method}</p>
                <p><span className="font-medium">Payment Status:</span> {selectedOrder.payment_status}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Shipping Address</h3>
              <div className="space-y-1 text-sm">
                <p>{selectedOrder.shipping_address}</p>
                <p>{selectedOrder.shipping_city}</p>
                <p>{selectedOrder.shipping_postal_code}</p>
                <p>{selectedOrder.shipping_country}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Order Items</h3>
            <div className="space-y-3">
              {selectedOrder.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-500">IMG</span>
                    </div>
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity} | Size: {item.size} | Color: {item.color}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">£{item.price}</p>
                    <p className="text-sm text-gray-600">Total: £{item.total}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedOrder.notes && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Notes</h3>
              <p className="text-gray-600">{selectedOrder.notes}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No orders found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Order #{order.order_number}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">£{order.total_with_shipping}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)} {order.status.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                </p>
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
