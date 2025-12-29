import React from "react";

/**
 * ActionBar component provides action buttons for payroll management
 * Includes Cancel and Process Bulk Payment buttons
 */
const ActionBar = ({
  selectedCount,
  onCancel,
  onProcessBulkPayment,
}) => {
  return (
    <div className="flex items-center justify-end space-x-4 pt-6">
      {/* Cancel Button */}
      <button
        onClick={onCancel}
        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 focus:outline-none transition-colors duration-200"
      >
        Cancel
      </button>

      {/* Process Bulk Payment Button */}
      <button
        onClick={onProcessBulkPayment}
        disabled={selectedCount === 0}
        className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${selectedCount > 0
            ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
        Process Bulk Payment
      </button>
    </div>
  );
};

export default ActionBar;
