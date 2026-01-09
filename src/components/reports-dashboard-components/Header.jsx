import React from "react";

/**
 * Header component for the Reports Dashboard
 * Contains the main title, subtitle, and action buttons (Export PDF, Schedule Report, dropdowns)
 */
const Header = ({
  onExportPDF,
  onScheduleReport,
  dateRange = 'This Month',
  setDateRange,
  branch = 'All Branches',
  setBranch
}) => {
  // Handle Export PDF
  const handleExportPDF = () => {
    if (onExportPDF) {
      onExportPDF();
    } else {
      // Default behavior: print the page
      window.print();
    }
  };

  // Handle Schedule Report
  const handleScheduleReport = () => {
    if (onScheduleReport) {
      onScheduleReport();
    }
  };

  return (
    <div className="mb-8 flex items-center justify-between">
      {/* Main Title and Subtitle */}
      <div className="mb-6">
        <h1 className="text-[28px] font-bold text-gray-900 mb-2">
          Reports Dashboard
        </h1>
        <p className="text-gray-600 text-sm -mt-1">
          Access detailed analytics across customers, vendors, sales, and staff.
        </p>
      </div>

      {/* Action Buttons and Dropdowns */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        {/* Export PDF Button */}
        <button
          type="button"
          onClick={handleExportPDF}
          title="Export PDF Report"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clipRule="evenodd"
            />
          </svg>
          Export PDF
        </button>

        {/* Schedule Report Button */}
        <button
          type="button"
          onClick={handleScheduleReport}
          title="Schedule Report"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          Schedule Report
        </button>

        {/* This Month Dropdown */}
        <div className="relative">
          <select
            value={dateRange}
            onChange={(e) => setDateRange && setDateRange(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-8 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-gray-50 transition-colors duration-200"
          >
            <option>Today</option>
            <option>Yesterday</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
            <option>Last 6 Months</option>
            <option>This Year</option>
            <option>All Time</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* All Branches Dropdown */}
        <div className="relative">
          <select
            value={branch}
            onChange={(e) => setBranch && setBranch(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-8 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-gray-50 transition-colors duration-200"
          >
            <option>All Branches</option>
            <option>Main Branch</option>
            <option>Downtown Branch</option>
            <option>Mall Branch</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
