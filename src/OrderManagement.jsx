import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // for navigation
import { FiSearch, FiPlus } from "react-icons/fi";
import ActiveOrderCard from "./components/order-management-components/ActiveOrderCard";
import CompletedOrdersSummary from "./components/order-management-components/CompletedOrdersSummary";
import CompletedOrderCard from "./components/order-management-components/CompletedOrderCard";
import OrderDetails from "./components/order-management-components/OrderDetails";
import OrdersTable from "./components/order-management-components/OrdersTable";
import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useCancelOrderMutation,
} from "./features/orders/ordersApiSlice";

const OrderManagement = ({ onOpenPhoneOrder }) => {
  const navigate = useNavigate(); // React Router navigation
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm] = useState(""); // setSearchTerm was unused
  const [statusFilter, setStatusFilter] = useState("active");
  const [customerFilter, setCustomerFilter] = useState("");
  const [viewMode, setViewMode] = useState("cards"); // "cards" or "table"
  const [sortBy, setSortBy] = useState("orderTime");
  const [sortOrder, setSortOrder] = useState("desc");
  const [error, setError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // RTK Query hooks
  const { data: ordersResponse, isLoading: loading, refetch: loadOrders } = useGetOrdersQuery();
  const [updateOrderStatusApi] = useUpdateOrderStatusMutation();
  const [cancelOrderApi] = useCancelOrderMutation();

  const [activeOrders, setActiveOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [draftOrders, setDraftOrders] = useState([]);

  const mapOrderFromApi = useCallback((order) => {
    const totalAmount =
      order.total ??
      order.totalAmount ??
      order.subtotal ??
      0;

    return {
      id: order._id,
      orderNumber: order.orderNumber || order._id?.slice(-6) || "Order",
      customerName:
        order.customerName ||
        order.customerId?.name ||
        "Guest",
      tableNumber: order.tableNumber
        ? `Table ${order.tableNumber}`
        : "N/A",
      orderTime: order.createdAt || order.updatedAt || new Date().toISOString(),
      status: order.status || "pending",
      source: order.source
        ? order.source.toLowerCase()
        : order.tableNumber
          ? "dine-in"
          : "takeaway",
      totalAmount,
      items: Array.isArray(order.items)
        ? order.items.map((item) => ({
          name: item.name,
          quantity: item.quantity ?? item.qty ?? 0,
          price: item.price ?? 0,
          specialInstructions: item.specialInstructions || "",
        }))
        : [],
      paymentStatus:
        order.paymentStatus ||
        (order.status === "served" ? "paid" : "pending"),
      notes: order.notes || "",
      raw: order,
    };
  }, []);

  useEffect(() => {
    if (ordersResponse?.success && Array.isArray(ordersResponse.data)) {
      const mappedOrders = ordersResponse.data.map(mapOrderFromApi);

      const activeStatuses = ["pending", "confirmed", "preparing", "ready"];
      const completedStatuses = ["served", "completed"];
      const cancelledStatuses = ["cancelled"];
      const draftStatuses = ["draft"];

      setActiveOrders(mappedOrders.filter((order) => activeStatuses.includes(order.status)));
      setCompletedOrders(mappedOrders.filter((order) => completedStatuses.includes(order.status)));
      setCancelledOrders(mappedOrders.filter((order) => cancelledStatuses.includes(order.status)));
      setDraftOrders(mappedOrders.filter((order) => draftStatuses.includes(order.status)));

      if (selectedOrder) {
        const updated = mappedOrders.find((order) => order.id === selectedOrder.id);
        if (updated) setSelectedOrder(updated);
      }
    }
  }, [ordersResponse, selectedOrder, mapOrderFromApi]);

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
  };

  const handleSortChange = (column, order) => {
    setSortBy(column);
    setSortOrder(order);
  };

  const handleOrderAction = async (orderId, nextStatus) => {
    if (!orderId || !nextStatus) return;

    setIsUpdating(true);
    setError("");

    try {
      if (nextStatus === "cancelled") {
        await cancelOrderApi({ orderId, reason: "Cancelled via Order Management" }).unwrap();
      } else {
        await updateOrderStatusApi({ orderId, status: nextStatus }).unwrap();
      }
    } catch (err) {
      console.error("Failed to update order:", err);
      setError(err.data?.message || err.message || "Failed to update order status");
    } finally {
      setIsUpdating(false);
    }
  };

  const getOrdersByStatusFilter = () => {
    switch (statusFilter) {
      case "completed":
        return completedOrders;
      case "cancelled":
        return cancelledOrders;
      case "draft":
        return draftOrders;
      case "phone":
        // Filter all orders by phone source
        return [...activeOrders, ...completedOrders, ...cancelledOrders, ...draftOrders]
          .filter(order => order.source === 'phone');
      default:
        return activeOrders;
    }
  };

  const filteredOrders = getOrdersByStatusFilter()
    .filter((order) => {
      if (activeTab !== "all" && order.source !== activeTab) return false;
      if (
        searchTerm &&
        !order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
      )
        return false;
      if (
        customerFilter &&
        !order.customerName.toLowerCase().includes(customerFilter.toLowerCase())
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'orderNumber':
          aValue = a.orderNumber || '';
          bValue = b.orderNumber || '';
          break;
        case 'customerName':
          aValue = a.customerName || '';
          bValue = b.customerName || '';
          break;
        case 'orderTime':
          aValue = new Date(a.orderTime);
          bValue = new Date(b.orderTime);
          break;
        case 'totalAmount':
          aValue = a.totalAmount || 0;
          bValue = b.totalAmount || 0;
          break;
        default:
          aValue = a.orderTime;
          bValue = b.orderTime;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <div className="p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          {/* Title and Description */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Order Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage all active orders and track completed orders.
            </p>
          </div>

          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Source Filter */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Source:
                </label>
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700 min-w-[120px]"
                >
                  <option value="all">All</option>
                  <option value="phone">Phone</option>
                  <option value="dine-in">Dine-in</option>
                  <option value="takeaway">Takeaway</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Status:
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700 min-w-[120px]"
                >
                  <option value="active">Active Orders</option>
                  <option value="draft">Draft Orders</option>
                  <option value="completed">Completed Orders</option>
                  <option value="cancelled">Cancelled Orders</option>
                  <option value="phone">Phone Orders</option>
                </select>
              </div>
            </div>

            {/* View Mode Toggle and Order Buttons */}
            <div className="flex items-center gap-15">
              {/* View Mode Toggle */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  View:
                </label>
                <div className="flex bg-gray-50 rounded-lg">
                  <button
                    onClick={() => setViewMode("cards")}
                    className={`px-3 py-1 text-sm rounded-md transition-colors${viewMode === "cards"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                      }`}
                  >
                    Cards
                  </button>
                </div>
              </div>

              {/* Order Buttons */}
              <div className="flex items-center gap-10">
                {/* take Order Button */}
                <button
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm h-[45px] w-[120px]"
                  onClick={() => navigate("/new-order")}
                >
                  <FiPlus className="w-4 h-4" />
                  <span>Take Order</span>
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="relative">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {[
                { key: "all", label: "All" },
                { key: "takeaway", label: "Takeaway" },
                { key: "phone", label: "Phone" },
                { key: "dine-in", label: "Dine-in" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tab.key
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div>
          {/* Orders Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {statusFilter === "completed"
                ? "Completed Orders"
                : statusFilter === "cancelled"
                  ? "Cancelled Orders"
                  : statusFilter === "draft"
                    ? "Draft Orders"
                    : statusFilter === "phone"
                      ? "Phone Orders"
                      : "Active Orders"
              }
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({filteredOrders.length} orders)
              </span>
            </h2>
            <div className="flex items-center gap-3">
              {loading && (
                <span className="text-sm text-gray-500">Refreshing...</span>
              )}
              <button
                onClick={() => loadOrders()}
                className="text-sm text-blue-600 hover:text-blue-700"
                disabled={loading}
              >
                Refresh
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-3">
              {error}
            </div>
          )}

          {/* Orders Content */}
          {loading && filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Loading orders...
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No orders found matching your criteria
            </div>
          ) : viewMode === "table" ? (
            <OrdersTable
              orders={filteredOrders}
              onOrderSelect={handleOrderSelect}
              onOrderAction={handleOrderAction}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Orders */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <ActiveOrderCard
                      key={order.id}
                      order={order}
                      onOrderSelect={handleOrderSelect}
                      onOrderAction={handleOrderAction}
                      isUpdating={isUpdating}
                    />
                  ))}
                </div>
              </div>

              {/* Right Column - Completed Orders Summary */}
              <div className="lg:col-span-1">
                {statusFilter === "completed" ? (
                  <CompletedOrdersSummary completedOrders={completedOrders} />
                ) : (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Order Summary
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Orders:</span>
                        <span className="font-medium">{filteredOrders.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Amount:</span>
                        <span className="font-medium">
                          ${filteredOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onOrderAction={handleOrderAction}
        />
      )}
    </div>
  );
};

// PropTypes validation
OrderManagement.propTypes = {
  onOpenPhoneOrder: PropTypes.func,
};

export default OrderManagement;
