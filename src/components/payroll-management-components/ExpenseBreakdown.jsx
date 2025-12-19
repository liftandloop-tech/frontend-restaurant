import React from "react";

/**
 * ExpenseBreakdown component displays the breakdown of expenses by role
 * Shows percentage contribution of each role to total payroll expenses
 */
const ExpenseBreakdown = () => {
  const expenseData = [
    {
      role: "Chef",
      percentage: 45,
      color: "bg-blue-500",
    },
    {
      role: "Waiter",
      percentage: 35,
      color: "bg-green-500",
    },
    {
      role: "Cashier",
      percentage: 20,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Expense Breakdown
      </h3>

      {/* Expense List */}
      <div className="space-y-4">
        {expenseData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              {/* Colored Dot */}
              <div className={`w-3 h-3 rounded-full ${item.color} mr-3`}></div>

              {/* Role Name */}
              <span className="text-sm font-medium text-gray-700">
                {item.role}
              </span>
            </div>

            {/* Percentage */}
            <span className="text-sm font-semibold text-gray-900">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseBreakdown;
