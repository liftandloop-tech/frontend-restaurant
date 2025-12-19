import React from "react";
import {
  FiClock,
  FiUser,
  FiMapPin,
  FiDollarSign,
  FiEdit,
  FiCheck,
  FiX,
} from "react-icons/fi";
import StatusBadge from "./StatusBadge";

const ActiveOrderCard = ({
  order,
  onOrderAction,
  onOrderSelect,
  isUpdating = false,
}) => {
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

  const getAvailableActions = (status) => {
    switch (status) {
      case "pending":
        return [
          {
            key: "confirm",
            label: "Confirm Order",
            icon: FiCheck,
            color: "green",
            nextStatus: "confirmed",
          },
          {
            key: "cancel",
            label: "Cancel",
            icon: FiX,
            color: "red",
            nextStatus: "cancelled",
          },
        ];
      case "confirmed":
        return [
          {
            key: "prepare",
            label: "Start Preparing",
            icon: FiEdit,
            color: "blue",
            nextStatus: "preparing",
          },
          {
            key: "cancel",
            label: "Cancel",
            icon: FiX,
            color: "red",
            nextStatus: "cancelled",
          },
        ];
      case "preparing":
        return [
          {
            key: "ready",
            label: "Mark Ready",
            icon: FiCheck,
            color: "blue",
            nextStatus: "ready",
          },
        ];
      case "ready":
        return [
          {
            key: "serve",
            label: "Mark Served",
            icon: FiCheck,
            color: "purple",
            nextStatus: "served",
          },
        ];
      default:
        return [];
    }
  };

  const getButtonStyles = (color) => {
    const baseStyles =
      "inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";

    switch (color) {
      case "green":
        return `${baseStyles} text-white bg-green-600 hover:bg-green-700 focus:ring-green-500`;
      case "red":
        return `${baseStyles} text-white bg-red-600 hover:bg-red-700 focus:ring-red-500`;
      case "blue":
        return `${baseStyles} text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500`;
      case "purple":
        return `${baseStyles} text-white bg-purple-600 hover:bg-purple-700 focus:ring-purple-500`;
      default:
        return `${baseStyles} text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-500 border-gray-300`;
    }
  };

  const availableActions = getAvailableActions(order.status);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-900">
            #{order.orderNumber}
          </span>
          <span className="text-xs text-gray-500">•</span>
          <span className="text-xs text-gray-500">
            {formatDate(order.orderTime)}
          </span>
        </div>
        <StatusBadge status={order.status} source={order.source} />
      </div>

      {/* Customer Info */}
      <div className="flex items-center space-x-3 mb-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <FiUser className="w-4 h-4" />
          <span>{order.customerName}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <FiMapPin className="w-4 h-4" />
          <span>{order.tableNumber}</span>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-3">
        <div className="text-sm text-gray-900 font-medium mb-1">
          Order Items:
        </div>
        <div className="space-y-1">
          {order.items.slice(0, 2).map((item, index) => {
            const quantity = item.quantity ?? item.qty ?? 0;
            const price = item.price ?? 0;
            return (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-700">
                  {item.name} x{quantity}
                </span>
                <span className="text-gray-900 font-medium">
                  {formatCurrency(price * quantity)}
                </span>
              </div>
            );
          })}
          {order.items.length > 2 && (
            <div className="text-xs text-gray-500">
              +{order.items.length - 2} more items
            </div>
          )}
        </div>
      </div>

      {/* Total Amount */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <FiDollarSign className="w-4 h-4" />
          <span>Total</span>
        </div>
        <span className="text-lg font-semibold text-gray-900">
          {formatCurrency(order.totalAmount)}
        </span>
      </div>

      {/* Payment Status */}
      <div className="mb-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Payment Status:</span>
          <span
            className={`text-sm font-medium ${
              order.paymentStatus === "paid"
                ? "text-green-600"
                : order.paymentStatus === "pending"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {order.paymentStatus === "paid"
              ? "Paid"
              : order.paymentStatus === "pending"
              ? "Pending"
              : "Failed"}
          </span>
        </div>
      </div>

      {/* Notes */}
      {order.notes && (
        <div className="mb-3">
          <div className="text-sm text-gray-600 mb-1">Notes:</div>
          <div className="text-sm text-gray-900 bg-yellow-50 border border-yellow-200 rounded p-2">
            {order.notes}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center mt-5 justify-between">
        <button
          onClick={() => onOrderSelect(order)}
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FiEdit className="w-3 h-3 mr-1" />
          View Details
        </button>

        <div className="flex space-x-2">
          {availableActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.key}
                onClick={() =>
                  onOrderAction(order.id, action.nextStatus, action.key)
                }
                className={getButtonStyles(action.color)}
                disabled={isUpdating}
              >
                <Icon className="w-3 h-3 mr-1" />
                {action.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActiveOrderCard;
