import React from "react";

/**
 * Conditions Component
 *
 * Form section for setting offer conditions including:
 * - Minimum Order Value (optional)
 * - Maximum Redemptions (optional)
 * - First-time customers only checkbox
 *
 * Props:
 * - formData: object containing form values
 * - onInputChange: function to handle input changes
 * - onCheckboxChange: function to handle checkbox changes
 */
const Conditions = ({ formData, onInputChange, onCheckboxChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-800">
        Conditions <span className="text-gray-500">(Optional)</span>
      </h3>

      <div className="space-y-4">
        {/* Minimum Order Value */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Order Value
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500 text-sm">₹</span>
            </div>
            <input
              type="number"
              name="minimumOrderValue"
              value={formData.minimumOrderValue}
              onChange={onInputChange}
              min="0"
              step="1"
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Minimum order amount required to use this offer
          </p>
        </div>

        {/* Maximum Redemptions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Maximum Redemptions
          </label>
          <input
            type="number"
            name="maximumRedemptions"
            value={formData.maximumRedemptions}
            onChange={onInputChange}
            min="0"
            step="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Maximum number of times this offer can be used
          </p>
        </div>

        {/* First-time customers only checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="firstTimeCustomersOnly"
            checked={formData.firstTimeCustomersOnly}
            onChange={onCheckboxChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            First-time customers only
          </label>
        </div>
      </div>
    </div>
  );
};

export default Conditions;

