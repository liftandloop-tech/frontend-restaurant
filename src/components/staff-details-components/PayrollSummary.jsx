import React from 'react';

/**
 * Payroll Summary Component
 * Displays salary breakdown, earnings, and payment actions
 */
const PayrollSummary = ({ 
  payrollData = {
    baseSalary: 3200,
    bonuses: 150,
    tips: 89,
    deductions: 45,
    currentMonthEarnings: 3394,
    paymentStatus: "Paid"
  },
  onViewPayrollHistory,
  onProcessPayment
}) => {
  const totalEarnings = payrollData.baseSalary + payrollData.bonuses + payrollData.tips - payrollData.deductions;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Payroll Summary</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payroll Items */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Payroll Items</h3>
          
          <div className="space-y-3">
            {/* Base Salary */}
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Base Salary</span>
              <span className="text-sm font-medium text-gray-900">${payrollData.baseSalary.toLocaleString()}</span>
            </div>

            {/* Bonuses */}
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Bonuses</span>
              <span className="text-sm font-medium text-green-600">+${payrollData.bonuses}</span>
            </div>

            {/* Tips */}
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Tips</span>
              <span className="text-sm font-medium text-green-600">+${payrollData.tips}</span>
            </div>

            {/* Deductions */}
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Deductions</span>
              <span className="text-sm font-medium text-red-600">-${payrollData.deductions}</span>
            </div>
          </div>
        </div>

        {/* Current Month Earnings */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Current Month Earnings</h3>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              ${payrollData.currentMonthEarnings.toLocaleString()}
            </div>
            
            <div className="flex items-center justify-center mb-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium text-green-600">{payrollData.paymentStatus}</span>
            </div>
            
            <div className="flex items-center justify-center text-xs text-gray-500">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Auto-calculated from attendance logs
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-200">
        <button
          onClick={onViewPayrollHistory}
          className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          View Payroll History
        </button>
        
        <button
          onClick={onProcessPayment}
          className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-green-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          Process Payment
        </button>
      </div>
    </div>
  );
};

export default PayrollSummary;
