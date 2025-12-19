import React from "react";

/**
 * AnalyticsOverview component displays various charts and analytics
 * Includes Sales vs Expenses, Orders by Channel, Top Categories, and Staff Payroll charts
 */
const AnalyticsOverview = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Analytics Overview
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales vs Expenses Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 min-h-[400px]">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Sales vs Expenses (Last 6 Months)
          </h3>
          <div className="h-80 flex items-end justify-center px-4 pb-4">
            {/* Chart bars representation */}
            <div className="flex items-end gap-4 h-full w-full justify-between">
              {[
                { month: "Jan", sales: 45, expenses: 28 },
                { month: "Feb", sales: 55, expenses: 32 },
                { month: "Mar", sales: 50, expenses: 35 },
                { month: "Apr", sales: 60, expenses: 38 },
                { month: "May", sales: 58, expenses: 40 },
                { month: "Jun", sales: 63, expenses: 42 },
              ].map((data, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 flex-1"
                >
                  <div className="flex flex-col items-center gap-1 h-full justify-end">
                    <div
                      className="w-8 bg-blue-500 rounded-t"
                      style={{ height: `${(data.sales / 80) * 180}px` }}
                    ></div>
                    <div
                      className="w-8 bg-red-500 rounded-t"
                      style={{ height: `${(data.expenses / 80) * 180}px` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 mt-2 text-center">
                    {data.month}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">Sales</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-600">Expenses</span>
            </div>
          </div>
        </div>

        {/* Orders by Channel Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 min-h-[400px]">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Orders by Channel
          </h3>
          <div className="flex items-center justify-center h-80">
            <div className="relative w-48 h-48">
              {/* Donut chart representation */}
              <svg
                className="w-48 h-48 transform -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#1e40af"
                  strokeWidth="8"
                  strokeDasharray={`${45 * 2.51} ${100 * 2.51}`}
                  strokeDashoffset="0"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="8"
                  strokeDasharray={`${35 * 2.51} ${100 * 2.51}`}
                  strokeDashoffset={`-${45 * 2.51}`}
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="8"
                  strokeDasharray={`${20 * 2.51} ${100 * 2.51}`}
                  strokeDashoffset={`-${80 * 2.51}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">1,230</div>
                  <div className="text-sm text-gray-600">Total Orders</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded"></div>
                <span className="text-sm text-gray-600">Dine-in</span>
              </div>
              <span className="text-sm font-medium text-gray-900">45.0%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-cyan-500 rounded"></div>
                <span className="text-sm text-gray-600">Takeaway</span>
              </div>
              <span className="text-sm font-medium text-gray-900">35.0%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-600">Online</span>
              </div>
              <span className="text-sm font-medium text-gray-900">20.0%</span>
            </div>
          </div>
        </div>

        {/* Top 5 Performing Categories */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 min-h-[400px]">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top 5 Performing Categories
          </h3>
          <div className="space-y-4 h-80 overflow-y-auto">
            {[
              { name: "Beverages", value: 45, percentage: 45 },
              { name: "Main Course", value: 38, percentage: 38 },
              { name: "Appetizers", value: 32, percentage: 32 },
              { name: "Desserts", value: 28, percentage: 28 },
              { name: "Salads", value: 22, percentage: 22 },
            ].map((category, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-20 text-sm text-gray-600 text-right">
                  {category.name}
                </div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16 text-sm font-medium text-gray-900 text-right">
                  ₹{category.value}k
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Staff Payroll vs Revenue */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 min-h-[400px]">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Staff Payroll vs Revenue
          </h3>
          <div className="h-80 flex items-end justify-center px-4 pb-4">
            <div className="flex items-end gap-4 h-full w-full justify-between">
              {[
                { month: "Jan", revenue: 48, payroll: 15 },
                { month: "Feb", revenue: 52, payroll: 16 },
                { month: "Mar", revenue: 49, payroll: 16.5 },
                { month: "Apr", revenue: 55, payroll: 17 },
                { month: "May", revenue: 58, payroll: 17.5 },
                { month: "Jun", revenue: 62, payroll: 18 },
              ].map((data, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 flex-1"
                >
                  <div className="flex flex-col items-center gap-1 h-full justify-end">
                    <div
                      className="w-8 bg-blue-500 rounded-t"
                      style={{ height: `${(data.revenue / 75) * 180}px` }}
                    ></div>
                    <div
                      className="w-8 bg-red-500 rounded-t"
                      style={{ height: `${(data.payroll / 20) * 180}px` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 mt-2 text-center">
                    {data.month}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-600">Payroll</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsOverview;
