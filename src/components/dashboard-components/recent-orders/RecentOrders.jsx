import React, { useState } from "react";

const statusBadge = (label, color) => (
  <span className={`text-[12px] px-2 py-[2px] rounded-full ${color}`}>
    {label}
  </span>
);

const RecentOrders = ({ orders = [], loading = false }) => {
  const [statusFilter, setStatusFilter] = useState("all");

  const formatTime = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'preparing': return 'bg-orange-100 text-orange-700';
      case 'ready': return 'bg-green-100 text-green-700';
      case 'served': return 'bg-purple-100 text-purple-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredOrders = statusFilter === "all"
    ? orders
    : orders.filter(o => o.status === statusFilter);

  return (
    <div className="bg-white rounded-xl flex flex-col h-full border-1 px-5 py-7 border-gray-300 w-[152%] overflow-hidden">
      <div className="w-[100%] flex flex-row justify-between items-center mb-5">
        <div className="flex items-center gap-4">
          <h2 className="text-[18px] font-semibold">Recent Orders</h2>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-[13px] border-none bg-gray-50 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button className="text-[14px] text-[#2563EB]">See All</button>
      </div>
      <div className="w-full rounded-lg border border-gray-200 flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 text-[13px] text-gray-600 px-4 py-3 sticky top-0 z-10">
          <div className="col-span-2">Order #</div>
          <div className="col-span-2">Table/Type</div>
          <div className="col-span-4">Items</div>
          <div className="col-span-1">Amount</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-1">Time</div>
        </div>
        <div className="overflow-auto flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-32 text-gray-500">Loading...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="flex justify-center items-center h-32 text-gray-500">No orders found for this status</div>
          ) : (
            filteredOrders.map((order, idx) => (
              <div
                key={order.id}
                className={`grid grid-cols-12 items-center px-4 py-4 text-[14px] ${idx !== filteredOrders.length - 1 ? "border-b border-gray-200" : ""
                  }`}
              >
                <div className="col-span-2 font-medium text-gray-800">
                  {order.orderNumber || `#${order.id.toString().slice(-6)}`}
                </div>
                <div className="col-span-2 text-gray-700">
                  {order.tableNumber ? `Table ${order.tableNumber}` : 'Takeaway'}
                </div>
                <div className="col-span-4 text-gray-700 truncate pr-4">
                  {order.items?.length > 0
                    ? order.items.map(item => `${item.name} x${item.qty}`).join(', ')
                    : 'No items'}
                </div>
                <div className="col-span-1 text-gray-800 font-semibold">
                  ₹{order.total?.toFixed(0)}
                </div>
                <div className="col-span-2 text-center">
                  {statusBadge(order.status?.charAt(0).toUpperCase() + order.status?.slice(1), getStatusColor(order.status))}
                </div>
                <div className="col-span-1 text-gray-700">
                  {formatTime(order.createdAt)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
