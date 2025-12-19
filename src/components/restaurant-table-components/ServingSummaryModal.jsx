import React from "react";
import PropTypes from "prop-types";
import { FiX, FiUser, FiUserCheck, FiPhone, FiMapPin, FiClock, FiShoppingCart } from "react-icons/fi";

const ServingSummaryModal = ({ isOpen, onClose, tableNumber, order, location }) => {
  if (!isOpen || !order) return null;

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

  const getLocationDisplayName = (location) => {
    const names = {
      indoor: "Main Dining Area",
      outdoor: "Patio Area",
      vip: "VIP Area",
      bar: "Bar Area",
    };
    return names[location] || location;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                🔔 Serving Summary - Table {tableNumber}
              </h2>
              <p className="text-blue-100 text-sm">
                {getLocationDisplayName(location)} • Click to view order details
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-blue-700 rounded-full transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Waiter Information */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <FiUserCheck className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Serving Staff</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Waiter:</span>
                <span className="font-semibold text-blue-700">
                  {order.waiterId?.fullName || order.waiterId?.name || 'Unknown Waiter'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Order Time:</span>
                <span className="font-medium">
                  {formatDate(order.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <FiUser className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Customer Details</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-semibold text-green-700">
                  {order.customerId?.name || order.customerName || 'Walk-in Customer'}
                </span>
              </div>
              {(order.customerId?.phone || order.customerPhone || order.deliveryPhone) && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center gap-1">
                    <FiPhone className="w-4 h-4" />
                    Phone:
                  </span>
                  <span className="font-medium">
                    {order.customerId?.phone || order.customerPhone || order.deliveryPhone}
                  </span>
                </div>
              )}
              {order.deliveryAddress && (
                <div className="flex items-start justify-between">
                  <span className="text-gray-600 flex items-center gap-1">
                    <FiMapPin className="w-4 h-4" />
                    Address:
                  </span>
                  <span className="font-medium text-right max-w-[60%]">
                    {order.deliveryAddress}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Order Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <FiShoppingCart className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Order Quick View</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Order #:</span>
                <span className="font-medium">
                  {order.orderNumber || order._id?.slice(-6)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Items:</span>
                <span className="font-medium">
                  {order.items?.length || 0} item(s)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-bold text-green-600">
                  ₹{order.total?.toFixed(2) || '0.00'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-medium"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

ServingSummaryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  tableNumber: PropTypes.number,
  order: PropTypes.object,
  location: PropTypes.string,
};

ServingSummaryModal.defaultProps = {
  tableNumber: null,
  order: null,
  location: 'indoor',
};

export default ServingSummaryModal;
