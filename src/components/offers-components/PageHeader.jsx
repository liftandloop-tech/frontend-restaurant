import React from "react";

/**
 * PageHeader component for the Promotions & Offers page
 * Contains breadcrumbs, page title, subtitle, and action buttons
 *
 * Props:
 * - onCreateOffer: function to handle create offer button click
 */
const PageHeader = ({ onCreateOffer }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      {/* Breadcrumbs */}
      <div className="mb-4">
        <nav className="text-sm text-gray-500">
          <span>Home</span>
          <span className="mx-2">›</span>
          <span className="text-gray-900">Promotions</span>
        </nav>
      </div>

      {/* Title and subtitle */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Promotions & Offers
        </h1>
        <p className="text-gray-600">
          Create and manage promotional campaigns to boost sales
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
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
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
            />
          </svg>
          Export
        </button>
        <button
          onClick={onCreateOffer}
          className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Create Offer
        </button>
      </div>
    </div>
  );
};

export default PageHeader;
