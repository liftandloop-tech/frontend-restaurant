import React from "react";

/**
 * VisitsPerSegment component displays a horizontal bar chart of customer visit segments
 *
 * Features:
 * - Horizontal bar chart with visit segments
 * - Y-axis with segment labels
 * - X-axis with customer count
 * - Legend and responsive design
 */
const VisitsPerSegment = () => {
  // Sample data for the chart
  const chartData = [
    { segment: "1-2 Visits", customers: 280 },
    { segment: "3-5 Visits", customers: 320 },
    { segment: "6+ Visits", customers: 142 },
  ];

  const maxCustomers = Math.max(...chartData.map((d) => d.customers));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <h3 className="text-lg font-bold text-gray-900 mb-6">
        Visits per Customer Segment
      </h3>

      {/* Chart Container */}
      <div className="relative">
        {/* Chart Area */}
        <div className="space-y-4">
          {chartData.map((item, index) => {
            const width = (item.customers / maxCustomers) * 100;
            return (
              <div key={index} className="flex items-center gap-4">
                {/* Y-axis label */}
                <div className="w-20 text-sm font-medium text-gray-700 text-right">
                  {item.segment}
                </div>

                {/* Bar container */}
                <div className="flex-1 relative">
                  {/* Bar */}
                  <div
                    className="h-8 bg-blue-500 rounded-sm hover:bg-blue-600 transition-colors duration-200"
                    style={{ width: `${width}%` }}
                    title={`${item.segment}: ${item.customers} customers`}
                  />

                  {/* Value label */}
                  <div className="absolute inset-0 flex items-center justify-end pr-2">
                    <span className="text-xs font-medium text-white">
                      {item.customers}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* X-axis label */}
        <div className="mt-4 text-center">
          <span className="text-xs text-gray-500">Customers</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
          <span className="text-sm text-gray-600">Customers</span>
        </div>
      </div>
    </div>
  );
};

export default VisitsPerSegment;
