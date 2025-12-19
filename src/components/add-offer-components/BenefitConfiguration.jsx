import React from "react";

/**
 * BenefitConfiguration Component
 *
 * Form section for configuring offer benefits including:
 * - Discount Percentage (required)
 * - Maximum Discount Amount (optional)
 *
 * Props:
 * - formData: object containing form values
 * - onInputChange: function to handle input changes
 */
const BenefitConfiguration = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-800">
        Benefit Configuration
      </h3>

      <div className="space-y-4">
        {/* Discount Percentage */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Discount Percentage <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              name="discountPercentage"
              value={formData.discountPercentage}
              onChange={onInputChange}
              min="1"
              max="100"
              step="1"
              className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500 text-sm">%</span>
            </div>
          </div>
        </div>

        {/* Maximum Discount Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Maximum Discount Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500 text-sm">₹</span>
            </div>
            <input
              type="number"
              name="maximumDiscountAmount"
              value={formData.maximumDiscountAmount}
              onChange={onInputChange}
              min="0"
              step="1"
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Leave empty for no maximum limit
          </p>
        </div>
      </div>
    </div>
  );
};

export default BenefitConfiguration;

