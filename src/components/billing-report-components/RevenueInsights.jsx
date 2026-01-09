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
const RevenueInsights = ({ data }) => {
  const chartData = data?.charts?.revenueTrend || [];

  const revenueData = chartData.map(item => ({
    date: item.date,
    revenue: item.amount
  }));

  if (revenueData.length === 0) {
    return null; // Or message
  }

  // Calculate chart dimensions and scaling
  const maxRevenue = Math.max(...revenueData.map((item) => item.revenue)) || 1;
  const minRevenue = Math.min(...revenueData.map((item) => item.revenue)) || 0;
  const chartHeight = 200;
  const chartWidth = 300;

  // Generate SVG path for the line chart
  const generatePath = () => {
    if (revenueData.length < 2) return "";
    const points = revenueData.map((item, index) => {
      const x = (index / (revenueData.length - 1)) * chartWidth;
      const y =
        chartHeight -
        ((item.revenue - minRevenue) / (maxRevenue - minRevenue)) * chartHeight;
      return `${x},${y}`;
    });
    return `M ${points.join(" L ")}`;
  };

  const highestRevenue = Math.max(...revenueData.map(d => d.revenue));
  const highestDay = revenueData.find(d => d.revenue === highestRevenue);

  const lowestRevenue = Math.min(...revenueData.map(d => d.revenue));
  const lowestDay = revenueData.find(d => d.revenue === lowestRevenue);

  const totalRev = revenueData.reduce((acc, curr) => acc + curr.revenue, 0);
  const avgRev = Math.round(totalRev / revenueData.length);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Revenue Over Time Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Revenue Trend
        </h3>

        {/* Chart Container */}
        <div className="relative">
          {/* Chart SVG */}
          <div className="ml-2">
            <svg
              width="100%"
              height={chartHeight}
              className="w-full h-48"
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              preserveAspectRatio="none"
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
            </svg>

            {/* X-axis labels (Sampled) */}
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              {revenueData.length > 5 ? (
                <>
                  <span>{revenueData[0].date}</span>
                  <span>{revenueData[Math.floor(revenueData.length / 2)].date}</span>
                  <span>{revenueData[revenueData.length - 1].date}</span>
                </>
              ) : revenueData.map((item, index) => (
                <span key={index}>{item.date}</span>
              ))}
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
            <div className="text-xl font-bold text-gray-900">₹ {highestRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-500">{highestDay?.date}</div>
          </div>

          {/* Lowest Revenue Day */}
          <div className="border-b border-gray-100 pb-4">
            <div className="text-sm text-gray-600 mb-1">Lowest Revenue Day</div>
            <div className="text-xl font-bold text-gray-900">₹ {lowestRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-500">{lowestDay?.date}</div>
          </div>

          {/* Average Daily Revenue */}
          <div className="border-b border-gray-100 pb-4">
            <div className="text-sm text-gray-600 mb-1">
              Average Daily Revenue
            </div>
            <div className="text-xl font-bold text-gray-900">₹ {avgRev.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueInsights;
