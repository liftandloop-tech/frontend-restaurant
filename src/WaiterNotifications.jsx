import React, { useState, useEffect } from "react";
import { getOrders } from "./utils/orders";

const WaiterNotifications = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const response = await getOrders({ status: "served" });
        if (response.success && response.data) {
          // Filter orders that have waiters assigned
          const servedOrders = response.data.filter(order =>
            order.waiterId && (order.status === "served" || order.status === "completed")
          );
          setOrders(servedOrders);
        }
      } catch (err) {
        console.error("Error loading waiter notifications:", err);
        setError("Failed to load notifications");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();

    // Refresh every 30 seconds
    const interval = setInterval(loadOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="text-gray-500">Loading waiter notifications...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="text-red-500">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Waiter Service Notifications
          </h1>
          <p className="text-gray-600">
            Track which waiter is serving which orders
          </p>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500 text-lg mb-2">No active service notifications</div>
              <div className="text-gray-400">Orders being served by waiters will appear here</div>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {/* Order Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">
                        #{order.orderNumber?.slice(-4) || order._id?.slice(-4)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        Order #{order.orderNumber || order._id?.slice(-6)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatTime(order.updatedAt || order.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'served'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status === 'served' ? 'Served' : 'Completed'}
                  </div>
                </div>

                {/* Waiter Info */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {order.waiterId?.fullName || order.waiterId?.name || 'Unknown Waiter'}
                      </div>
                      <div className="text-xs text-gray-500">Serving this order</div>
                    </div>
                  </div>
                </div>

                {/* Customer & Table Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Customer:</span>
                    <span className="font-medium">{order.customerId?.name || order.customerName || 'Walk-in'}</span>
                  </div>
                  {order.tableNumber && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Table:</span>
                      <span className="font-medium">Table {order.tableNumber}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium capitalize">{order.source || 'dine-in'}</span>
                  </div>
                </div>

                {/* Order Items Summary */}
                <div className="border-t pt-4">
                  <div className="text-sm text-gray-600 mb-2">Items served:</div>
                  <div className="space-y-1 max-h-20 overflow-y-auto">
                    {order.items && order.items.length > 0 ? (
                      order.items.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.qty}x {item.name}</span>
                          <span className="text-gray-500">${(item.price * item.qty).toFixed(2)}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500">No items</div>
                    )}
                    {order.items && order.items.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{order.items.length - 3} more items
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between font-semibold text-sm mt-2 pt-2 border-t">
                    <span>Total:</span>
                    <span>${order.total?.toFixed(2) || '0.00'}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Auto-refresh indicator */}
        <div className="text-center mt-8 text-sm text-gray-500">
          Auto-refreshing every 30 seconds • Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default WaiterNotifications;
