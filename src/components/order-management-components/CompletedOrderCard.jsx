import React from "react";
import { FiClock, FiUser, FiMapPin, FiDollarSign, FiEye } from "react-icons/fi";

const CompletedOrderCard = ({ order, onOrderSelect }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-900">
            #{order.orderNumber}
          </span>
          <span className="text-xs text-gray-500">•</span>
          <span className="text-xs text-gray-500">
            {formatDate(order.orderTime || order.createdAt)}
          </span>
        </div>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {order.source || "dine-in"}
        </span>
      </div>

      {/* Customer Info */}
      <div className="flex items-center space-x-3 mb-2">
        <div className="flex items-center space-x-1 text-sm text-gray-600">
          <FiUser className="w-3 h-3" />
          <span>{order.customerName}</span>
        </div>
        <div className="flex items-center space-x-1 text-sm text-gray-600">
          <FiMapPin className="w-3 h-3" />
          <span>{order.tableNumber}</span>
        </div>
      </div>

      {/* Order Items Summary */}
      <div className="mb-2">
        <div className="text-sm text-gray-700">
          {order.items.length} item{order.items.length !== 1 ? "s" : ""} •
          {order.items.slice(0, 2).map((item, index) => (
            <span key={index}>
              {index > 0 && ", "}
              {item.name}
            </span>
          ))}
          {order.items.length > 2 && ` +${order.items.length - 2} more`}
        </div>
      </div>

      {/* Total and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 text-sm text-gray-600">
          <FiDollarSign className="w-3 h-3" />
          <span className="font-medium text-gray-900">
            {formatCurrency(order.totalAmount)}
          </span>
        </div>

        <button
          onClick={() => onOrderSelect(order)}
          className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded"
        >
          <FiEye className="w-3 h-3 mr-1" />
          View
        </button>
      </div>
    </div>
  );
};

export default CompletedOrderCard;
