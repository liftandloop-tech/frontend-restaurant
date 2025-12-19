import React, { useState, useEffect } from "react";
import { getOrders } from "../../utils/orders";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("draft");

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getOrders();
        if (response.success && response.data) {
          setOrders(response.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders based on active tab
  useEffect(() => {
    let filtered = [];

    switch (activeTab) {
      case "draft":
        filtered = orders.filter(order => order.status === "draft");
        break;
      case "new":
        filtered = orders.filter(order => order.status === "pending");
        break;
      case "active":
        filtered = orders.filter(order =>
          ["confirmed", "preparing", "ready"].includes(order.status)
        );
        break;
      case "completed":
        filtered = orders.filter(order => ["served", "completed"].includes(order.status));
        break;
      case "cancelled":
        filtered = orders.filter(order => order.status === "cancelled");
        break;
      default:
        filtered = orders;
    }

    // Sort by creation date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredOrders(filtered);
  }, [orders, activeTab]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  const getTabCounts = () => {
    return {
      draft: orders.filter(order => order.status === "draft").length,
      new: orders.filter(order => order.status === "pending").length,
      active: orders.filter(order => ["confirmed", "preparing", "ready"].includes(order.status)).length,
      completed: orders.filter(order => ["served", "completed"].includes(order.status)).length,
      cancelled: orders.filter(order => order.status === "cancelled").length,
    };
  };

  const tabLabels = [
    { name: "Draft Orders", key: "draft", count: getTabCounts().draft },
    { name: "New Orders", key: "new", count: getTabCounts().new },
    { name: "Active Orders", key: "active", count: getTabCounts().active },
    { name: "Completed Orders", key: "completed", count: getTabCounts().completed },
    { name: "Cancelled Orders", key: "cancelled", count: getTabCounts().cancelled },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm mt-10 p-6">
      {/* Tab row */}
      <div className="flex gap-2 mb-6">
        {tabLabels.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === tab.key
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
              }`}
          >
            {tab.name}
            <span
              className={`px-2 py-1 text-xs rounded-full ${activeTab === tab.key
                  ? "bg-blue-500 text-white"
                  : tab.key === "completed"
                    ? "bg-green-100 text-green-800"
                    : tab.key === "cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Orders table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                Order ID
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                Customer/Table
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                Type
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                Status
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                Time
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                Items
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                Amount
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                Staff/Source
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="9" className="py-8 text-center text-gray-500">
                  Loading orders...
                </td>
              </tr>
            ) : filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="9" className="py-8 text-center text-gray-500">
                  No orders found in this category
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order._id || order.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">
                    {order.orderNumber || `#${order._id?.slice(-6)}`}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    <div className="font-medium">
                      {order.customerName || order.customerId?.name || order.customerId?.fullName || 'Guest'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {order.tableNumber ? `Table ${order.tableNumber}` : 'Walk-in'}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                      {order.source || 'dine-in'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${order.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'preparing' ? 'bg-orange-100 text-orange-800' :
                              order.status === 'ready' ? 'bg-green-100 text-green-800' :
                                order.status === 'served' ? 'bg-purple-100 text-purple-800' :
                                  order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                    order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                      'bg-gray-100 text-gray-800'
                      }`}>
                      {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'Unknown'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {order.items?.length || 0} items
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-900">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    <div className="font-medium">
                      {order.waiterId?.fullName || order.waiterId?.name || (typeof order.waiterId === 'object' ? 'Unknown' : (order.waiterId ? 'Staff' : 'Unknown'))}
                    </div>
                    <div className="text-xs text-gray-500 capitalize">
                      {order.source || 'dine-in'}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alert(`View order: ${order.orderNumber || order._id?.slice(-6)}`)}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                        title="View Details"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => alert(`Edit order: ${order.orderNumber || order._id?.slice(-6)}`)}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit Order"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => alert(`Complete order: ${order.orderNumber || order._id?.slice(-6)}`)}
                        className="text-gray-400 hover:text-green-600 transition-colors"
                        title="Mark Complete"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"
                            clipRule="evenodd"
                          />
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;