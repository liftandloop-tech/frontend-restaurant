import React from "react";

/**
 * SalaryPayroll Component
 *
 * Handles salary and payroll information including:
 * - Base salary with currency formatting
 * - Payment mode selection
 * - Tip/Commission eligibility checkbox
 * - Bank details (Bank Name, IFSC Code, Account Number)
 */
const SalaryPayroll = ({ formData, onInputChange, onCheckboxChange }) => {
  // Sample payment modes - in real app, this would come from props or API
  const paymentModes = [
    { value: "Bank Transfer", label: "Bank Transfer" },
    { value: "Cash", label: "Cash" },
    { value: "Cheque", label: "Cheque" },
    { value: "UPI", label: "UPI" },
  ];

  // Format currency input
  const formatCurrency = (value) => {
    if (value === null || value === undefined) return "";
    const numericValue = String(value).replace(/[^\d]/g, "");
    if (!numericValue) return "";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numericValue);
  };

  // Handle salary input change
  const handleSalaryChange = (e) => {
    const { value } = e.target;
    const numericValue = String(value).replace(/[^\d]/g, "");
    onInputChange({
      target: {
        name: "baseSalary",
        value: numericValue,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Salary & Payroll Info
        </h3>
        <p className="text-sm text-gray-600">
          Configure salary and payment details
        </p>
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Base Salary */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Base Salary
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
              ₹
            </div>
            <input
              type="text"
              name="baseSalary"
              value={
                formData.baseSalary ? formatCurrency(formData.baseSalary) : ""
              }
              onChange={handleSalaryChange}
              placeholder="25,000"
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>
        </div>

        {/* Payment Mode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Mode
          </label>
          <div className="relative">
            <select
              name="paymentMode"
              value={formData.paymentMode || ""}
              onChange={onInputChange}
              className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            >
              <option value="">Select payment mode</option>
              {paymentModes.map((mode) => (
                <option key={mode.value} value={mode.value}>
                  {mode.label}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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

        {/* Tip/Commission Eligibility */}
        <div className="md:col-span-2">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="tipCommissionEligible"
              checked={formData.tipCommissionEligible || false}
              onChange={onCheckboxChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <span className="text-sm font-medium text-gray-700">
              Tip / Commission Eligibility
            </span>
          </label>
          <p className="text-xs text-gray-500 mt-1 ml-7">
            This staff member is eligible to receive tips and commissions
          </p>
        </div>
      </div>

      {/* Bank Details Sub-section */}
      <div className="border-t border-gray-200 pt-6">
        <div className="mb-4">
          <h4 className="text-md font-semibold text-gray-800 mb-1">
            Bank Details
          </h4>
          <p className="text-sm text-gray-600">
            Required for bank transfer payments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bank Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bank Name
            </label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName || ""}
              onChange={onInputChange}
              placeholder="State Bank of India"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          {/* IFSC Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              IFSC Code
            </label>
            <input
              type="text"
              name="ifscCode"
              value={formData.ifscCode || ""}
              onChange={onInputChange}
              placeholder="SBIN0001234"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          {/* Account Number */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Number
            </label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber || ""}
              onChange={onInputChange}
              placeholder="1234567890123456"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryPayroll;
