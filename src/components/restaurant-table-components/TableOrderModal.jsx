import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FiX, FiUser, FiMapPin, FiClock, FiPhone, FiMail, FiShoppingCart, FiDollarSign } from "react-icons/fi";

const TableOrderModal = ({ isOpen, onClose, tableNumber, order }) => {
  const [loading, setLoading] = useState(false);

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'preparing':
        return 'bg-orange-100 text-orange-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'served':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Table {tableNumber} - Order Details
            </h2>
            <p className="text-gray-600 mt-1">
              Order #{order.orderNumber || order._id?.slice(-6)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Order Status & Timing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <FiClock className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Order Status</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'Unknown'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Ordered:</span>
                  <span className="font-medium">{formatDate(order.createdAt)}</span>
                </div>
                {order.updatedAt && order.updatedAt !== order.createdAt && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="font-medium">{formatDate(order.updatedAt)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <FiUser className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Staff Information</h3>
              </div>
              <div className="space-y-2">
                {order.waiterId && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Waiter:</span>
                    <span className="font-medium">
                      {order.waiterId.fullName || order.waiterId.name || 'Unknown'}
                    </span>
                  </div>
                )}
                {order.cashierId && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Cashier:</span>
                    <span className="font-medium">
                      {order.cashierId.fullName || order.cashierId.name || 'Unknown'}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Source:</span>
                  <span className="font-medium capitalize">
                    {order.source || 'dine-in'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          {(order.customerId || order.customerName) && (
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <FiUser className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Customer Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 min-w-[80px]">Name:</span>
                    <span className="font-medium">
                      {order.customerId?.name || order.customerName || 'Walk-in Customer'}
                    </span>
                  </div>
                  {order.customerId?.phone && (
                    <div className="flex items-center gap-2">
                      <FiPhone className="w-4 h-4 text-gray-600" />
                      <span className="font-medium">{order.customerId.phone}</span>
                    </div>
                  )}
                  {order.customerId?.email && (
                    <div className="flex items-center gap-2">
                      <FiMail className="w-4 h-4 text-gray-600" />
                      <span className="font-medium">{order.customerId.email}</span>
                    </div>
                  )}
                </div>
                {order.deliveryAddress && (
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <FiMapPin className="w-4 h-4 text-gray-600 mt-0.5" />
                      <div>
                        <div className="text-gray-600">Delivery Address:</div>
                        <div className="font-medium">{order.deliveryAddress}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Order Items */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <FiShoppingCart className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>
            </div>
            <div className="space-y-3">
              {order.items && order.items.length > 0 ? (
                order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-3 rounded border">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {item.name} x {item.quantity}
                      </div>
                      {item.specialInstructions && (
                        <div className="text-sm text-gray-600 mt-1">
                          Note: {item.specialInstructions}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">
                        {formatCurrency((item.price || 0) * (item.quantity || 0))}
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatCurrency(item.price || 0)} each
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">No items in this order</div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <FiDollarSign className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">{formatCurrency(order.subtotal)}</span>
              </div>
              {order.tax && order.tax > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-medium">{formatCurrency(order.tax)}</span>
                </div>
              )}
              {order.discount && order.discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount:</span>
                  <span className="font-medium text-green-600">-{formatCurrency(order.discount)}</span>
                </div>
              )}
              {order.serviceCharge && order.serviceCharge > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Charge:</span>
                  <span className="font-medium">{formatCurrency(order.serviceCharge)}</span>
                </div>
              )}
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-900">Total:</span>
                <span className="text-green-600">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          {order.notes && (
            <div className="mt-6 bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Order Notes:</h4>
              <p className="text-gray-700">{order.notes}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

TableOrderModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  tableNumber: PropTypes.number,
  order: PropTypes.object,
};

TableOrderModal.defaultProps = {
  tableNumber: null,
  order: null,
};

export default TableOrderModal;
