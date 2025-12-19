import React from "react";

/**
 * RevenueInsights component displays revenue over time and daily insights
 *
 * Features:
 * - Revenue Over Time line chart (last 30 days)
 * - Daily Revenue Insights with key metrics
 * - Responsive grid layout
 * - Clean chart styling with proper data visualization
 */
const RevenueInsights = () => {
  // Sample revenue data for the last 7 days
  const revenueData = [
    { date: "Oct 1", revenue: 65000 },
    { date: "Oct 2", revenue: 72000 },
    { date: "Oct 3", revenue: 78900 },
    { date: "Oct 4", revenue: 68000 },
    { date: "Oct 5", revenue: 71000 },
    { date: "Oct 6", revenue: 75000 },
    { date: "Oct 7", revenue: 69000 },
  ];

  // Calculate chart dimensions and scaling
  const maxRevenue = Math.max(...revenueData.map((item) => item.revenue));
  const minRevenue = Math.min(...revenueData.map((item) => item.revenue));
  const chartHeight = 200;
  const chartWidth = 300;

  // Generate SVG path for the line chart
  const generatePath = () => {
    const points = revenueData.map((item, index) => {
      const x = (index / (revenueData.length - 1)) * chartWidth;
      const y =
        chartHeight -
        ((item.revenue - minRevenue) / (maxRevenue - minRevenue)) * chartHeight;
      return `${x},${y}`;
    });
    return `M ${points.join(" L ")}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Revenue Over Time Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Revenue Over Time (Last 30 Days)
        </h3>

        {/* Chart Container */}
        <div className="relative">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-2">
            <span>80k</span>
            <span>70k</span>
            <span>60k</span>
            <span>50k</span>
          </div>

          {/* Chart SVG */}
          <div className="ml-8">
            <svg
              width={chartWidth}
              height={chartHeight}
              className="w-full h-48"
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            >
              {/* Grid lines */}
              {[0, 1, 2, 3].map((i) => (
                <line
                  key={i}
                  x1="0"
                  y1={(i / 3) * chartHeight}
                  x2={chartWidth}
                  y2={(i / 3) * chartHeight}
                  stroke="#f3f4f6"
                  strokeWidth="1"
                />
              ))}

              {/* Revenue line */}
              <path
                d={generatePath()}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {revenueData.map((item, index) => {
                const x = (index / (revenueData.length - 1)) * chartWidth;
                const y =
                  chartHeight -
                  ((item.revenue - minRevenue) / (maxRevenue - minRevenue)) *
                    chartHeight;
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#3b82f6"
                    className="hover:r-6 transition-all duration-200"
                  />
                );
              })}
            </svg>

            {/* X-axis labels */}
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              {revenueData.map((item, index) => (
                <span key={index}>{item.date}</span>
              ))}
            </div>

            {/* Chart label */}
            <div className="text-center mt-2">
              <span className="text-sm text-blue-600 font-medium">
                →→ Daily Revenue
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Revenue Insights */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Daily Revenue Insights
        </h3>

        <div className="space-y-6">
          {/* Highest Revenue Day */}
          <div className="border-b border-gray-100 pb-4">
            <div className="text-sm text-gray-600 mb-1">
              Highest Revenue Day
            </div>
            <div className="text-xl font-bold text-gray-900">₹ 78,900</div>
            <div className="text-sm text-gray-500">03 Oct 2025</div>
          </div>

          {/* Lowest Revenue Day */}
          <div className="border-b border-gray-100 pb-4">
            <div className="text-sm text-gray-600 mb-1">Lowest Revenue Day</div>
            <div className="text-xl font-bold text-gray-900">₹ 42,500</div>
            <div className="text-sm text-gray-500">26 Sep 2025</div>
          </div>

          {/* Average Daily Revenue */}
          <div className="border-b border-gray-100 pb-4">
            <div className="text-sm text-gray-600 mb-1">
              Average Daily Revenue
            </div>
            <div className="text-xl font-bold text-gray-900">₹ 63,900</div>
          </div>

          {/* Insight Note */}
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg
                className="w-3 h-3 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Sales remained stable this month with a slight upward trend during
              weekends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueInsights;
