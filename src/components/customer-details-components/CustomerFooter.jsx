import React from "react";

/**
 * CustomerFooter Component
 *
 * Displays footer actions with:
 * - Send Offer button
 * - Export Profile button
 * - Close link
 */
const CustomerFooter = ({ onSendOffer, onExportProfile, onClose }) => {
  return (
    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-b-lg">
      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={onSendOffer}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
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
              d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
            />
          </svg>
          Send Offer
        </button>

        <button
          onClick={onExportProfile}
          className="inline-flex items-center px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
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
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Export Profile
        </button>
      </div>

      {/* Close Link */}
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors duration-200"
      >
        Close
      </button>
    </div>
  );
};

export default CustomerFooter;
