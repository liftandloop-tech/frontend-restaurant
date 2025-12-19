import React, { useState } from "react";

/**
 * DiscountModal Component
 * Modal for applying discount to an order
 */
const DiscountModal = ({ isOpen, onClose, onApplyDiscount, currentDiscount = null }) => {
  const [discountType, setDiscountType] = useState(currentDiscount?.type || "percentage");
  const [discountValue, setDiscountValue] = useState(currentDiscount?.value || "");
  const [reason, setReason] = useState(currentDiscount?.reason || "");
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};
    
    if (!discountValue || discountValue <= 0) {
      newErrors.discountValue = "Discount value must be greater than 0";
    }
    
    if (discountType === "percentage" && discountValue > 100) {
      newErrors.discountValue = "Percentage discount cannot exceed 100%";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const discount = {
      type: discountType,
      value: parseFloat(discountValue),
      reason: reason.trim() || undefined
    };

    if (onApplyDiscount) {
      onApplyDiscount(discount);
    }

    // Reset form
    setDiscountType("percentage");
    setDiscountValue("");
    setReason("");
    setErrors({});
    onClose();
  };

  const handleRemoveDiscount = () => {
    if (onApplyDiscount) {
      onApplyDiscount(null); // Remove discount
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {currentDiscount ? "Update Discount" : "Apply Discount"}
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
            onClick={onClose}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            {/* Discount Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Type
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="discountType"
                    value="percentage"
                    checked={discountType === "percentage"}
                    onChange={(e) => setDiscountType(e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Percentage (%)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="discountType"
                    value="flat"
                    checked={discountType === "flat"}
                    onChange={(e) => setDiscountType(e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Flat Amount (₹)</span>
                </label>
              </div>
            </div>

            {/* Discount Value */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Value {discountType === "percentage" ? "(%)" : "(₹)"} <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                placeholder={discountType === "percentage" ? "10" : "50"}
                min="0"
                max={discountType === "percentage" ? "100" : undefined}
                step={discountType === "percentage" ? "0.01" : "1"}
                className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.discountValue ? "border-red-300" : "border-gray-300"
                }`}
                required
              />
              {errors.discountValue && (
                <p className="mt-1 text-sm text-red-600">{errors.discountValue}</p>
              )}
            </div>

            {/* Reason (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason (Optional)
              </label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g., Customer complaint, Special offer"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
            {currentDiscount && (
              <button
                type="button"
                onClick={handleRemoveDiscount}
                className="px-4 py-2 text-red-600 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors duration-200 font-medium"
              >
                Remove Discount
              </button>
            )}
            <div className="flex items-center gap-3 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                {currentDiscount ? "Update" : "Apply"} Discount
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DiscountModal;

