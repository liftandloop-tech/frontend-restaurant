import React from "react";

/**
 * NewVsReturningChart component displays a line chart comparing new vs returning customers
 *
 * Features:
 * - Line chart with two data series
 * - Legend with color indicators
 * - Responsive design
 * - Clean chart styling
 */
const NewVsReturningChart = () => {
  // Sample data for the chart
  const chartData = [
    { week: "Week 1", newCustomers: 45, returningCustomers: 120 },
    { week: "Week 2", newCustomers: 52, returningCustomers: 135 },
    { week: "Week 3", newCustomers: 48, returningCustomers: 142 },
    { week: "Week 4", newCustomers: 61, returningCustomers: 158 },
  ];

  const maxValue = Math.max(
    ...chartData.flatMap((d) => [d.newCustomers, d.returningCustomers])
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <h3 className="text-lg font-bold text-gray-900 mb-6">
        New vs Returning Customers
      </h3>

      {/* Chart Container */}
      <div className="relative h-64">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-2">
          <span>200</span>
          <span>150</span>
          <span>100</span>
          <span>50</span>
          <span>0</span>
        </div>

        {/* Chart Area */}
        <div className="ml-8 h-full relative">
          {/* Grid lines */}
          <div className="absolute inset-0">
            {[0, 50, 100, 150, 200].map((value, index) => (
              <div
                key={index}
                className="absolute w-full border-t border-gray-100"
                style={{ bottom: `${(value / 200) * 100}%` }}
              />
            ))}
          </div>

          {/* Chart lines */}
          <svg className="absolute inset-0 w-full h-full">
            {/* New Customers line (blue) */}
            <polyline
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2"
              points={chartData
                .map((d, i) => {
                  const x = (i / (chartData.length - 1)) * 100;
                  const y = 100 - (d.newCustomers / 200) * 100;
                  return `${x}%,${y}%`;
                })
                .join(" ")}
            />

            {/* Returning Customers line (green) */}
            <polyline
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
              points={chartData
                .map((d, i) => {
                  const x = (i / (chartData.length - 1)) * 100;
                  const y = 100 - (d.returningCustomers / 200) * 100;
                  return `${x}%,${y}%`;
                })
                .join(" ")}
            />

            {/* Data points for New Customers */}
            {chartData.map((d, i) => {
              const x = (i / (chartData.length - 1)) * 100;
              const y = 100 - (d.newCustomers / 200) * 100;
              return (
                <circle
                  key={`new-${i}`}
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r="4"
                  fill="#3B82F6"
                />
              );
            })}

            {/* Data points for Returning Customers */}
            {chartData.map((d, i) => {
              const x = (i / (chartData.length - 1)) * 100;
              const y = 100 - (d.returningCustomers / 200) * 100;
              return (
                <circle
                  key={`returning-${i}`}
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r="4"
                  fill="#10B981"
                />
              );
            })}
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="mt-4 ml-8 flex justify-between text-xs text-gray-500">
          {chartData.map((d, i) => (
            <span key={i}>{d.week}</span>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-600">New Customers</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Returning Customers</span>
        </div>
      </div>
    </div>
  );
};

export default NewVsReturningChart;
