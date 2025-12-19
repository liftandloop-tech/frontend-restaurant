import React from "react";

/**
 * BasicInformation Component
 *
 * Form section for basic offer information including:
 * - Offer Name (required)
 * - Offer Code (auto-generated with refresh option)
 * - Offer Type (dropdown: Discount %, Fixed Amount, etc.)
 * - Applicable To (dropdown: All Items, Specific Categories, etc.)
 *
 * Props:
 * - formData: object containing form values
 * - onInputChange: function to handle input changes
 * - onOfferCodeRefresh: function to refresh offer code
 */
const BasicInformation = ({ formData, onInputChange, onOfferCodeRefresh }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Basic Information
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Set up the basic details for your offer
        </p>
      </div>

      <div className="space-y-5">
        {/* Offer Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Offer Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="offerName"
            value={formData.offerName}
            onChange={onInputChange}
            placeholder="e.g., Weekend Special"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            required
          />
        </div>

        {/* Offer Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Offer Code
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              name="offerCode"
              value={formData.offerCode}
              onChange={onInputChange}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
            <button
              type="button"
              onClick={onOfferCodeRefresh}
              className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full hover:bg-gray-100 transition-colors duration-200"
              title="Refresh offer code"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Auto-generated, but you can edit it
          </p>
        </div>

        {/* Offer Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Offer Type <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              name="offerType"
              value={formData.offerType}
              onChange={onInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              required
            >
              <option value="Discount %">Discount %</option>
              <option value="Fixed Amount">Fixed Amount</option>
              <option value="Buy X Get Y">Buy X Get Y</option>
              <option value="Free Delivery">Free Delivery</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Applicable To */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Applicable To <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              name="applicableTo"
              value={formData.applicableTo}
              onChange={onInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              required
            >
              <option value="All Items">All Items</option>
              <option value="Specific Categories">Specific Categories</option>
              <option value="Specific Items">Specific Items</option>
              <option value="Beverages Only">Beverages Only</option>
              <option value="Food Items Only">Food Items Only</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
