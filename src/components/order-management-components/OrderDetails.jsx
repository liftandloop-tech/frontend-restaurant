import React from "react";
import {
  FiX,
  FiClock,
  FiUser,
  FiMapPin,
  FiDollarSign,
  FiEdit,
  FiCheck,
  FiX as FiCancel,
} from "react-icons/fi";
import StatusBadge from "./StatusBadge";

const OrderDetails = ({ order, onClose, onOrderAction }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
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
            label: "Cancel Order",
            icon: FiCancel,
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
            label: "Cancel Order",
            icon: FiCancel,
            color: "red",
            nextStatus: "cancelled",
          },
        ];
      case "preparing":
        return [
          {
            key: "ready",
            label: "Mark as Ready",
            icon: FiCheck,
            color: "blue",
            nextStatus: "ready",
          },
        ];
      case "ready":
        return [
          {
            key: "serve",
            label: "Mark as Served",
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
      "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";

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
    <div className="fixed inset-0 bg-white/20 backdrop-blur-lg bg-opacity-25 flex items-center justify-center z-50">
      <div className="relative top-20 mx-auto p-5 w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Order Details - {order.orderNumber}
            </h3>
            <p className="text-sm text-gray-500">
              {formatDate(order.orderTime)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Information */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-900 mb-3">
              Order Information
            </h4>

            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex items-center space-x-3">
                <FiUser className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Customer</p>
                  <p className="text-sm text-gray-600">{order.customerName}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FiMapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Table</p>
                  <p className="text-sm text-gray-600">{order.tableNumber}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FiClock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Order Time
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatDate(order.orderTime)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FiDollarSign className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Total Amount
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatCurrency(order.totalAmount)}
                  </p>
                </div>
              </div>
            </div>

            {/* Status */}
            <div>
              <h5 className="text-sm font-medium text-gray-900 mb-2">Status</h5>
              <StatusBadge
                status={order.status}
                source={order.source}
                paymentStatus={order.paymentStatus}
              />
            </div>

            {/* Notes */}
            {order.notes && (
              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-2">
                  Notes
                </h5>
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                  <p className="text-sm text-yellow-800">{order.notes}</p>
                </div>
              </div>
            )}
          </div>

          {/* Order Items */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-3">
              Order Items
            </h4>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity ?? item.qty ?? 0}
                    </p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {formatCurrency(
                      (item.price ?? 0) * (item.quantity ?? item.qty ?? 0)
                    )}
                  </div>
                </div>
              ))}

              <div className="border-t border-gray-200 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-900">
                    Total
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {formatCurrency(order.totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex space-x-3">
            {availableActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.key}
                  onClick={() =>
                    onOrderAction(order.id, action.nextStatus, action.key)
                  }
                  className={getButtonStyles(action.color)}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {action.label}
                </button>
              );
            })}
          </div>

          <button
            onClick={onClose}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiEdit className="w-4 h-4 mr-2" />
            Edit Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
