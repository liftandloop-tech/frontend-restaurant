import React from "react";
import PropTypes from "prop-types";
import OrderSummaryItem from "./OrderSummaryItem";
import OrderNotes from "./OrderNotes";
import OrderCalculation from "./OrderCalculation";
import Actions from "./Actions";

const OrderSummary = ({
  orderItems,
  totals,
  onUpdateQuantity,
  onRemoveItem,
  tableNumber,
  onTableNumberChange,
  orderNotes,
  onOrderNotesChange,
  discount,
  onSendToKOT,
  onSaveDraft,
  onCancel,
  onApplyDiscount,
  loading,
  error,
  success,
  selectedCustomerId,
  onCustomerChange,
  customers,
  customerSearchTerm,
  onCustomerSearchChange,
  // Phone order specific props
  deliveryAddress,
  onDeliveryAddressChange,
  deliveryPhone,
  onDeliveryPhoneChange,
  deliveryTime,
  onDeliveryTimeChange,
  isPhoneOrder,
  // Online order specific props
  customerName,
  onCustomerNameChange,
  customerEmail,
  onCustomerEmailChange,
  isOnlineOrder,
}) => {
  return (
    <div className="flex h-fit flex-col overflow-auto scrollbar-hide bg-gray-50">
      {/* Header */}
      <div className="flex-shrink-0 p-6">
        <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
        <div className="mt-2 space-y-3">
          {!isPhoneOrder && (
            <input
              type="number"
              value={tableNumber}
              onChange={(e) => onTableNumberChange && onTableNumberChange(e.target.value)}
              placeholder="Table Number"
              min="1"
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          {(isPhoneOrder || isOnlineOrder) && (
            <>
              {/* Customer Name (for online orders) */}
              {isOnlineOrder && (
                <input
                  type="text"
                  value={customerName || ""}
                  onChange={(e) => onCustomerNameChange && onCustomerNameChange(e.target.value)}
                  placeholder="Customer Name *"
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              )}

              {/* Customer Email (for online orders) */}
              {isOnlineOrder && (
                <input
                  type="email"
                  value={customerEmail || ""}
                  onChange={(e) => onCustomerEmailChange && onCustomerEmailChange(e.target.value)}
                  placeholder="Customer Email (Optional)"
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}

              {/* Delivery Phone */}
              <input
                type="tel"
                value={deliveryPhone || ""}
                onChange={(e) => onDeliveryPhoneChange && onDeliveryPhoneChange(e.target.value)}
                placeholder="Delivery Phone Number *"
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              {/* Delivery Address */}
              <textarea
                value={deliveryAddress || ""}
                onChange={(e) => onDeliveryAddressChange && onDeliveryAddressChange(e.target.value)}
                placeholder="Delivery Address *"
                rows={2}
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                required
              />

              {/* Delivery Time */}
              <input
                type="datetime-local"
                value={deliveryTime || ""}
                onChange={(e) => onDeliveryTimeChange && onDeliveryTimeChange(e.target.value)}
                placeholder="Delivery Time (leave empty for ASAP)"
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          )}

          {/* Customer Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer (Optional)
            </label>
            <input
              type="text"
              value={customerSearchTerm}
              onChange={(e) => onCustomerSearchChange && onCustomerSearchChange(e.target.value)}
              placeholder="Search customers by name or phone..."
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            <select
              value={selectedCustomerId || ""}
              onChange={(e) => onCustomerChange && onCustomerChange(e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Walk-in Customer</option>
              {customers && customers
                .filter(customer =>
                  customer.name.toLowerCase().includes((customerSearchTerm || '').toLowerCase()) ||
                  customer.phone.includes(customerSearchTerm || '')
                )
                .map((customer) => (
                <option key={customer._id || customer.id} value={customer._id || customer.id}>
                  {customer.name} - {customer.phone}
                </option>
              ))}
            </select>
            {selectedCustomerId && (
              <div className="mt-2 p-2 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-700">
                  <span className="font-medium">Selected:</span> {
                    customers.find(c => (c._id || c.id) === selectedCustomerId)?.name
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Item list with vertical scroll */}
      <div className="flex-grow px-6 space-y-4">
        {orderItems.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-center">Your order is empty.</p>
          </div>
        ) : (
          orderItems.map((item) => (
            <OrderSummaryItem
              key={item.name}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveItem={onRemoveItem}
            />
          ))
        )}
      </div>

      {/* Footer with calculations and actions */}
      <div className="flex-shrink-0 p-6 space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-600 whitespace-pre-line">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-600">{success}</p>
          </div>
        )}

        <OrderNotes orderNotes={orderNotes} onOrderNotesChange={onOrderNotesChange} />
        <OrderCalculation totals={totals} discount={discount} />
        <Actions
          onSendToKOT={onSendToKOT}
          onSaveDraft={onSaveDraft}
          onCancel={onCancel}
          onApplyDiscount={onApplyDiscount}
          loading={loading}
          discount={discount}
        />
      </div>
    </div>
  );
};

OrderSummary.propTypes = {
  orderItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  totals: PropTypes.object.isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  tableNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onTableNumberChange: PropTypes.func,
  orderNotes: PropTypes.string,
  onOrderNotesChange: PropTypes.func,
  discount: PropTypes.object,
  onSendToKOT: PropTypes.func,
  onSaveDraft: PropTypes.func,
  onCancel: PropTypes.func,
  onApplyDiscount: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.string,
  success: PropTypes.string,
  selectedCustomerId: PropTypes.string,
  onCustomerChange: PropTypes.func,
  customers: PropTypes.array,
  customerSearchTerm: PropTypes.string,
  onCustomerSearchChange: PropTypes.func,
  // Phone order specific props
  deliveryAddress: PropTypes.string,
  onDeliveryAddressChange: PropTypes.func,
  deliveryPhone: PropTypes.string,
  onDeliveryPhoneChange: PropTypes.func,
  deliveryTime: PropTypes.string,
  onDeliveryTimeChange: PropTypes.func,
  isPhoneOrder: PropTypes.bool,
  // Online order specific props
  customerName: PropTypes.string,
  onCustomerNameChange: PropTypes.func,
  customerEmail: PropTypes.string,
  onCustomerEmailChange: PropTypes.func,
  isOnlineOrder: PropTypes.bool,
};

export default OrderSummary;
