import React from "react";

/**
 * PriceInput Component
 *
 * Input field for purchase price per unit with dollar sign prefix
 * Matches the styling shown in the Add Stock modal image
 */
const PriceInput = ({ value, onChange, required = false }) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-700">
        Purchase Price per Unit
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 text-sm">$</span>
        </div>
        <input
          type="number"
          value={value}
          onChange={onChange}
          placeholder="0.00"
          min="0"
          step="0.01"
          className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required={required}
        />
      </div>
    </div>
  );
};

export default PriceInput;
