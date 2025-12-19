import React from "react";

/**
 * Header component for the Inventory Management page
 * Displays the page title, subtitle, and action buttons
 */
const Header = ({ onAddStockClick }) => {
  return (
    <div className="px-8 py-8">
      <div className="flex justify-between items-start mb-6">
        {/* Left side - Title and subtitle */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Inventory Management
          </h1>
          <p className="text-sm text-gray-600">
            Manage stock, items, vendors, and purchase orders
          </p>
        </div>

        {/* Right side - Action button */}
        <div className="flex items-end">
          <button
            onClick={onAddStockClick}
            className="flex items-center gap-2 px-10 py-2 border border-blue-600 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 hover:border-blue-700 transition-all"
          >
            <span className="text-white text-sm">+</span>
            Add Stock
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
