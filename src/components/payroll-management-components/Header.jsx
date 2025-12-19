import React from "react";

/**
 * Header component for Payroll Management page
 * Displays the main title and subtitle for the payroll management section
 */
const Header = () => {
  return (
    <div className="mb-8">
      {/* Main Title */}
      <h1 className="text-[28px] font-bold text-gray-900 mb-2">
        Payroll Management
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-sm -mt-1">
        View and manage staff salaries, bonuses, deductions, and payment status.
      </p>
    </div>
  );
};

export default Header;
