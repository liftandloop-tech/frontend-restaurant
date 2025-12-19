import React from "react";

/**
 * WeeklyRevenueChart component displays a bar chart of weekly revenue
 *
 * Features:
 * - Bar chart with weekly revenue data
 * - Y-axis with revenue scale
 * - X-axis with week labels
 * - Legend and responsive design
 */
const WeeklyRevenueChart = () => {
  // Sample data for the chart
  const chartData = [
    { week: "Week 1", revenue: 450000 },
    { week: "Week 2", revenue: 520000 },
    { week: "Week 3", revenue: 480000 },
    { week: "Week 4", revenue: 610000 },
  ];

  const maxRevenue = Math.max(...chartData.map((d) => d.revenue));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <h3 className="text-lg font-bold text-gray-900 mb-6">Weekly Revenue</h3>

      {/* Chart Container */}
      <div className="relative h-64">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-2">
          <span>750k</span>
          <span>500k</span>
          <span>250k</span>
          <span>0</span>
        </div>

        {/* Chart Area */}
        <div className="ml-8 h-full relative">
          {/* Grid lines */}
          <div className="absolute inset-0">
            {[0, 250000, 500000, 750000].map((value, index) => (
              <div
                key={index}
                className="absolute w-full border-t border-gray-100"
                style={{ bottom: `${(value / 750000) * 100}%` }}
              />
            ))}
          </div>

          {/* Bars */}
          <div className="absolute inset-0 flex items-end justify-between px-2">
            {chartData.map((d, i) => {
              const height = (d.revenue / maxRevenue) * 100;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center"
                  style={{ width: `${100 / chartData.length}%` }}
                >
                  {/* Bar */}
                  <div
                    className="w-8 bg-blue-500 rounded-t-sm hover:bg-blue-600 transition-colors duration-200"
                    style={{ height: `${height}%` }}
                    title={`${d.week}: ₹${(d.revenue / 1000).toFixed(0)}k`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* X-axis labels */}
        <div className="mt-4 ml-8 flex justify-between text-xs text-gray-500">
          {chartData.map((d, i) => (
            <span
              key={i}
              className="text-center"
              style={{ width: `${100 / chartData.length}%` }}
            >
              {d.week}
            </span>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
          <span className="text-sm text-gray-600">Revenue</span>
        </div>
      </div>
    </div>
  );
};

export default WeeklyRevenueChart;
