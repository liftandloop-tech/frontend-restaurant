import React from "react";

/**
 * Footer component for Customer Report page
 *
 * Features:
 * - Report status information
 * - Auto-refresh indicator
 * - Save Custom Filter View button
 * - Responsive design
 */
const Footer = () => {
  const handleSaveCustomFilter = () => {
    console.log("Saving custom filter view...");
    // Implement save custom filter functionality
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-gray-200">
      {/* Status Information */}
      <div className="text-sm text-gray-500">
        Report last updated 5 min ago • Auto-refresh every 10 min
      </div>

      {/* Save Filter Button */}
      <button
        onClick={handleSaveCustomFilter}
        className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
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
            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
          />
        </svg>
        Save Custom Filter View
      </button>
    </div>
  );
};

export default Footer;
