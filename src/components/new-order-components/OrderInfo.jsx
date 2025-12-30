import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getActiveWaiters } from "../../utils/staff";
import { getCustomers } from "../../utils/customers";
import { getTables } from "../../utils/tables";

const OrderInfo = ({ orderInfo, setOrderInfo, orderType = "takeaway" }) => {
  const [waiters, setWaiters] = useState([]);
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [customerSearchLoading, setCustomerSearchLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [waitersRes, tablesRes] = await Promise.all([
          getActiveWaiters(),
          getTables()
        ]);

        if (waitersRes?.success && waitersRes?.data) {
          setWaiters(Array.isArray(waitersRes.data) ? waitersRes.data : []);
        }

        if (tablesRes?.success && tablesRes?.data) {
          setTables(Array.isArray(tablesRes.data) ? tablesRes.data : []);
        }
      } catch (err) {
        console.error("Error loading initial data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const searchCustomers = async (searchValue) => {
    if (!searchValue || searchValue.length < 2) {
      setCustomers([]);
      setShowCustomerDropdown(false);
      return;
    }

    try {
      setCustomerSearchLoading(true);
      const response = await getCustomers({ search: searchValue });
      if (response?.success && response?.data) {
        setCustomers(response.data);
        setShowCustomerDropdown(response.data.length > 0);
      }
    } catch (err) {
      console.error("Error searching customers:", err);
    } finally {
      setCustomerSearchLoading(false);
    }
  };

  const handleSelectCustomer = (customer) => {
    setOrderInfo((prev) => ({
      ...prev,
      customerId: customer._id || customer.id,
      customerName: customer.name || customer.fullName || "",
      customerPhone: customer.phone || "",
      customerEmail: customer.email || "",
      deliveryPhone: customer.phone || "",
      deliveryAddress: customer.address || "",
    }));
    setShowCustomerDropdown(false);
  };

  const handleChange = (field, value) => {
    setOrderInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Order Information
      </h3>

      {/* Customer Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Customer Name - Required for online, phone and takeaway orders */}
        {(orderType === "online" || orderType === "phone" || orderType === "takeaway") && (
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Customer name"
              value={orderInfo.customerName || ""}
              onChange={(e) => {
                handleChange("customerName", e.target.value);
                searchCustomers(e.target.value);
              }}
              onFocus={() => {
                if (orderInfo.customerName && orderInfo.customerName.length >= 2) {
                  setShowCustomerDropdown(true);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {showCustomerDropdown && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {customerSearchLoading ? (
                  <div className="p-3 text-center text-gray-500 text-sm">Searching...</div>
                ) : (
                  customers.map((c) => (
                    <button
                      key={c._id || c.id}
                      type="button"
                      onClick={() => handleSelectCustomer(c)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors"
                    >
                      <div className="font-medium text-gray-900">{c.name || c.fullName}</div>
                      <div className="text-xs text-gray-500">{c.phone || "No phone"}</div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* Customer Phone - Required for all orders except maybe future types */}
        {(orderType === "takeaway" || orderType === "phone") && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={orderInfo.customerPhone || ""}
              onChange={(e) => handleChange("customerPhone", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        )}

        {/* Delivery Phone - Required for phone and online orders */}
        {(orderType === "phone") && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={orderInfo.deliveryPhone || ""}
              onChange={(e) => handleChange("deliveryPhone", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        )}

        {/* Delivery Address - Required for phone and online orders */}
        {(orderType === "phone") && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Address <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Enter complete delivery address"
              value={orderInfo.deliveryAddress || ""}
              onChange={(e) => handleChange("deliveryAddress", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              required
            />
          </div>
        )}

        {/* Delivery Time - Optional for phone and online orders */}
        {(orderType === "phone") && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Time (Optional)
            </label>
            <input
              type="datetime-local"
              value={orderInfo.deliveryTime || ""}
              onChange={(e) => handleChange("deliveryTime", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}

        {/* Table Number - Only for takeaway orders */}
        {orderType === "takeaway" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Table Number <span className="text-red-500">*</span>
            </label>
            <select
              value={orderInfo.tableNumber || ""}
              onChange={(e) => handleChange("tableNumber", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              disabled={loading}
            >
              <option value="">Select Table</option>
              {tables.map((table) => (
                <option key={table._id || table.id} value={table.tableNumber}>
                  Table {table.tableNumber} ({table.capacity} seats)
                </option>
              ))}
            </select>
            {tables.length === 0 && !loading && (
              <p className="mt-1 text-xs text-red-500">
                No tables found. Please add tables first.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Order Type
          </label>
          <div className="relative">
            <input
              type="text"
              value={orderType === "phone" ? "Phone Order" : orderType.charAt(0).toUpperCase() + orderType.slice(1)}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 capitalize"
            />
            <span className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-xs px-2 py-1 rounded ${orderType === "takeaway" ? "bg-blue-100 text-blue-800" :
              orderType === "phone" ? "bg-green-100 text-green-800" :
                "bg-purple-100 text-purple-800"
              }`}>
              {orderType === "phone" ? "Phone Order" : orderType.charAt(0).toUpperCase() + orderType.slice(1)}
            </span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assigned Staff
          </label>
          <select
            value={orderInfo.waiterId || ""}
            onChange={(e) => handleChange("waiterId", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
          >
            <option value="">Select staff member</option>
            {waiters.map((waiter) => (
              <option key={waiter._id || waiter.id} value={waiter._id || waiter.id}>
                {waiter.fullName || waiter.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Time
          </label>
          <div className="relative">
            <input
              type="time"
              defaultValue="14:30"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Payment & Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Method
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option>Cash on Pickup</option>
            <option>UPI</option>
            <option>Card</option>
          </select>
        </div>
        <div className="flex flex-col items-center">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Status
          </label>
          <div className="flex items-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
              Pending
            </span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Order Notes
          </label>
          <textarea
            placeholder="Special instructions..."
            rows={3}
            value={orderInfo.notes || ""}
            onChange={(e) => handleChange("notes", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

// PropTypes validation
OrderInfo.propTypes = {
  orderInfo: PropTypes.object.isRequired,
  setOrderInfo: PropTypes.func.isRequired,
  orderType: PropTypes.oneOf(["takeaway", "phone", "online"]),
};

export default OrderInfo;
