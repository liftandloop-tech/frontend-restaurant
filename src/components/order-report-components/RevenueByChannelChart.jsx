import React from "react";

/**
 * RevenueByChannelChart component displays a bar chart showing revenue by channel
 *
 * Features:
 * - Vertical bar chart with revenue values
 * - Color-coded bars for different channels
 * - Y-axis with revenue labels
 * - Responsive design
 */
const RevenueByChannelChart = () => {
  const revenueData = [
    {
      channel: "Dine-in",
      revenue: 750000,
      color: "bg-blue-600",
      height: "h-32",
    },
    {
      channel: "Takeaway",
      revenue: 320000,
      color: "bg-blue-400",
      height: "h-20",
    },
    {
      channel: "Online",
      revenue: 140000,
      color: "bg-teal-500",
      height: "h-12",
    },
  ];

  const maxRevenue = Math.max(...revenueData.map((item) => item.revenue));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      {/* Chart Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Revenue by Channel (₹)
      </h3>

      {/* Chart Container */}
      <div className="space-y-4">
        {/* Y-axis Labels */}
        <div className="flex justify-end space-x-4 text-xs text-gray-500 mb-2">
          <span>₹7.5L</span>
          <span>₹5L</span>
          <span>₹2.5L</span>
          <span>₹0L</span>
        </div>

        {/* Chart Area */}
        <div className="flex items-end justify-between space-x-4 h-40">
          {revenueData.map((item, index) => {
            const heightPercentage = (item.revenue / maxRevenue) * 100;
            const actualHeight = Math.max(heightPercentage * 1.2, 20); // Minimum height of 20%

            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                {/* Bar */}
                <div className="w-full flex flex-col justify-end h-32">
                  <div
                    className={`w-full ${item.color} rounded-t-lg transition-all duration-1000 ease-out hover:opacity-80`}
                    style={{ height: `${actualHeight}%` }}
                  ></div>
                </div>

                {/* Channel Label */}
                <div className="mt-3 text-sm font-medium text-gray-700 text-center">
                  {item.channel}
                </div>

                {/* Revenue Value */}
                <div className="mt-1 text-xs text-gray-500 text-center">
                  ₹{(item.revenue / 100000).toFixed(1)}L
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart Summary */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex justify-between text-sm text-gray-600">
          <span>
            Total Revenue:{" "}
            <span className="font-semibold text-gray-900">₹12.1L</span>
          </span>
          <span>
            Dine-in leads with{" "}
            <span className="font-semibold text-blue-600">62%</span> share
          </span>
        </div>
      </div>
    </div>
  );
};

export default RevenueByChannelChart;
