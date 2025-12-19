import React from "react";

/**
 * BatchExpiryInputs Component
 *
 * Component for batch number and expiry date input fields displayed side by side
 * Matches the layout shown in the Add Stock modal image
 */
const BatchExpiryInputs = ({
  batchValue,
  expiryValue,
  onBatchChange,
  onExpiryChange,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Batch Number Field */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Batch Number
        </label>
        <input
          type="text"
          value={batchValue}
          onChange={onBatchChange}
          placeholder="Optional"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Expiry Date Field */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-700">Expiry Date</label>
        <div className="relative">
          <input
            type="date"
            value={expiryValue}
            onChange={onExpiryChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BatchExpiryInputs;
