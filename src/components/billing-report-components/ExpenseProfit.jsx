import React from "react";

/**
 * ExpenseProfit component displays expense vs profit snapshot
 *
 * Features:
 * - Total expenses breakdown
 * - Net profit calculation
 * - Profit margin with trend indicator
 * - Visual bar representation of expenses vs profit
 * - Responsive design with proper spacing
 */
const ExpenseProfit = () => {
  const totalExpenses = 840000;
  const netProfit = 445000;
  const totalRevenue = totalExpenses + netProfit;
  const profitMargin = ((netProfit / totalRevenue) * 100).toFixed(1);

  // Calculate bar percentages
  const expensePercentage = (totalExpenses / totalRevenue) * 100;
  const profitPercentage = (netProfit / totalRevenue) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Expense vs Profit Snapshot
      </h3>

      <div className="space-y-6">
        {/* Total Expenses */}
        <div className="space-y-2">
          <div className="text-2xl font-bold text-gray-900">
            ₹ {totalExpenses.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Expenses</div>
          <div className="text-xs text-gray-500">
            Includes vendor payments, staff payroll, and operational overhead.
          </div>
        </div>

        {/* Net Profit */}
        <div className="space-y-2">
          <div className="text-2xl font-bold text-gray-900">
            ₹ {netProfit.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Net Profit (est.)</div>
        </div>

        {/* Profit Margin */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-gray-900">
              {profitMargin}%
            </div>
            <div className="flex items-center gap-1">
              <svg
                className="w-4 h-4 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 17l9.2-9.2M17 17V7H7"
                />
              </svg>
              <span className="text-sm font-medium text-green-600">
                2.1% MoM
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-600">Profit Margin</div>
        </div>

        {/* Visual Bar Representation */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-gray-700">
            Expense vs Profit Breakdown
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
            <div className="h-full flex">
              {/* Expenses portion */}
              <div
                className="bg-green-700 flex items-center justify-end pr-2"
                style={{ width: `${expensePercentage}%` }}
              >
                <span className="text-xs font-medium text-white">Expenses</span>
              </div>
              {/* Profit portion */}
              <div
                className="bg-green-400 flex items-center justify-start pl-2"
                style={{ width: `${profitPercentage}%` }}
              >
                <span className="text-xs font-medium text-white">Profit</span>
              </div>
            </div>
          </div>

          {/* Bar labels */}
          <div className="flex justify-between text-xs text-gray-500">
            <span>₹ {totalExpenses.toLocaleString()}</span>
            <span>₹ {netProfit.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseProfit;
