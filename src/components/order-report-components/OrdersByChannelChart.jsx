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
const OrdersByChannelChart = ({ data }) => {
  const chartData = data?.charts?.ordersByChannel || [];
  const totalOrders = data?.metrics?.totalOrders || 0;

  // Calculate percentages and assign colors
  const colors = ["bg-blue-600", "bg-blue-400", "bg-teal-500", "bg-purple-500"];
  const textColors = ["text-blue-600", "text-blue-400", "text-teal-500", "text-purple-500"];
  const strokeColors = ["#2563eb", "#60a5fa", "#14b8a6", "#a855f7"];

  const channelData = chartData.map((item, index) => ({
    name: item.name === 'Online' ? 'Phone' : item.name,
    percentage: totalOrders > 0 ? Math.round((item.value / totalOrders) * 100) : 0,
    color: colors[index % colors.length],
    textColor: textColors[index % textColors.length],
    stroke: strokeColors[index % strokeColors.length],
    value: item.value
  })).sort((a, b) => b.value - a.value);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 w-145 ">
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

            {/* Dynamic Segments */}
            {channelData.map((item, index) => {
              const circumference = 2 * Math.PI * 40; // ~251.327
              const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;

              // Calculate previous percentages sum for offset
              const previousPercentage = channelData
                .slice(0, index)
                .reduce((sum, d) => sum + d.percentage, 0);
              const strokeDashoffset = -((previousPercentage / 100) * circumference);

              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={item.stroke}
                  strokeWidth="8"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000 ease-out"
                />
              );
            })}
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {totalOrders.toLocaleString()}
              </div>
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
            Phone orders growing fastest this quarter (+12%).
          </span>
        </p>
      </div>
    </div>
  );
};

export default OrdersByChannelChart;
