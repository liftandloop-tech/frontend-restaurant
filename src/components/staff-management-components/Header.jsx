import React from "react";

/**
 * Header component for Staff Management page
 * Contains the main title, subtitle, and action buttons
 */
const Header = ({ onProcessBulkPayment, onAddNewStaff }) => {
  return (
    <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
      {/* Main Title and Subtitle */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Staff Management
        </h1>
        <p className="text-gray-500 mt-1.5 font-medium">
          Control your workforce, monitor attendance, and streamline payroll calculations.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={onProcessBulkPayment}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-semibold text-sm shadow-sm"
        >
          <svg
            className="w-4 h-4 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          Payroll Management
        </button>

        <button
          onClick={onAddNewStaff}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all duration-200 font-semibold text-sm"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Staff Member
        </button>
      </div>
    </div>
  );
};

export default Header;
