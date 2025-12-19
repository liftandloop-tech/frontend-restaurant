import React from "react";

/**
 * SpendSummary Component
 *
 * Displays customer spending analytics with:
 * - Summary cards (Total Visits, Avg Spend, Lifetime Value)
 * - Spend trend chart (bar chart representation)
 */
const SpendSummary = ({ summaryData, spendTrend }) => {
  // Generate bar chart data for spend trend
  const maxValue = Math.max(...spendTrend.map((item) => item.value));

  return (
    <div className="p-6 border-b border-gray-200">
      {/* Section Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Spend Summary</h3>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Total Visits Card */}
        <div className="bg-blue-500 rounded-lg p-4 text-white">
          <div className="text-2xl font-bold mb-1">
            {summaryData.totalVisits}
          </div>
          <div className="text-sm opacity-90">Total Visits</div>
        </div>

        {/* Average Spend Card */}
        <div className="bg-green-100 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-800 mb-1">
            {summaryData.avgSpend}
          </div>
          <div className="text-sm text-green-600">Avg Spend</div>
        </div>

        {/* Lifetime Value Card */}
        <div className="bg-orange-100 rounded-lg p-4">
          <div className="text-2xl font-bold text-orange-800 mb-1">
            {summaryData.lifetimeValue}
          </div>
          <div className="text-sm text-orange-600">Lifetime Value</div>
        </div>
      </div>

      {/* Spend Trend Chart */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-4">
          Spend Trend (Last 6 months)
        </h4>

        {/* Chart Container */}
        <div className="flex items-end justify-between h-32 px-2">
          {spendTrend.map((item, index) => {
            const height = (item.value / maxValue) * 100;

            return (
              <div key={index} className="flex flex-col items-center space-y-2">
                {/* Bar */}
                <div className="relative">
                  <div
                    className="w-8 bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                    style={{ height: `${height}%` }}
                    title={`${item.month}: ${item.value}`}
                  />
                </div>

                {/* Month Label */}
                <div className="text-xs text-gray-500 text-center">
                  {item.month}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SpendSummary;
