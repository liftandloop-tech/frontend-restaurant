import React from "react";

/**
 * OrdersByChannelChart component displays a donut chart showing order distribution
 *
 * Features:
 * - Donut chart visualization with percentages
 * - Color-coded segments for different channels
 * - Growth indicator for online orders
 * - Responsive design
 */
const OrdersByChannelChart = () => {
  const channelData = [
    {
      name: "Dine-in",
      percentage: 54.0,
      color: "bg-blue-600",
      textColor: "text-blue-600",
    },
    {
      name: "Takeaway",
      percentage: 27.0,
      color: "bg-blue-400",
      textColor: "text-blue-400",
    },
    {
      name: "Online",
      percentage: 19.0,
      color: "bg-teal-500",
      textColor: "text-teal-500",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      {/* Chart Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Orders by Channel
      </h3>

      {/* Chart Container */}
      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Donut Chart */}
        <div className="relative w-48 h-48 flex-shrink-0">
          {/* SVG Donut Chart */}
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="8"
            />

            {/* Dine-in Segment (54%) */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#2563eb"
              strokeWidth="8"
              strokeDasharray={`${54 * 2.51} 251`}
              strokeDashoffset="0"
              className="transition-all duration-1000 ease-out"
            />

            {/* Takeaway Segment (27%) */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="8"
              strokeDasharray={`${27 * 2.51} 251`}
              strokeDashoffset={`-${54 * 2.51}`}
              className="transition-all duration-1000 ease-out"
            />

            {/* Online Segment (19%) */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#14b8a6"
              strokeWidth="8"
              strokeDasharray={`${19 * 2.51} 251`}
              strokeDashoffset={`-${(54 + 27) * 2.51}`}
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">1,240</div>
              <div className="text-sm text-gray-500">Total Orders</div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-4">
          {channelData.map((channel, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${channel.color}`}></div>
                <span className="text-sm font-medium text-gray-700">
                  {channel.name}
                </span>
              </div>
              <span className={`text-sm font-semibold ${channel.textColor}`}>
                {channel.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Growth Indicator */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-600">
          <span className="font-medium text-teal-600">
            Online growing fastest this quarter (+12%).
          </span>
        </p>
      </div>
    </div>
  );
};

export default OrdersByChannelChart;
