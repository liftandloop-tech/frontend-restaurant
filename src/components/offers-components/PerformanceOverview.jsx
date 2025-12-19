import React from "react";

/**
 * PerformanceOverview component shows performance metrics and progress bars
 * Displays revenue impact, redemptions, and offer performance with progress indicators
 */
const PerformanceOverview = () => {
  const performanceData = [
    { name: "Weekend Special", progress: 75, color: "bg-green-500" },
    { name: "Happy Hour", progress: 60, color: "bg-orange-500" },
    { name: "Festival Special", progress: 45, color: "bg-blue-500" },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">
          Performance Overview
        </h3>
        <select className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Last 30 days</option>
          <option>Last 7 days</option>
          <option>Last 90 days</option>
        </select>
      </div>

      {/* Summary metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-green-600 mb-1">Total Revenue Impact</p>
          <p className="text-2xl font-bold text-green-700">₹45,230</p>
          <p className="text-sm text-green-600">+12.5% vs last period</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Total Redemptions</p>
          <p className="text-2xl font-bold text-gray-900">1,247</p>
          <p className="text-sm text-green-600">+8.3% vs last period</p>
        </div>
      </div>

      {/* Progress bars */}
      <div className="space-y-4">
        {performanceData.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-900">
                {item.name}
              </span>
              <span className="text-sm text-gray-600">{item.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${item.color} transition-all duration-300`}
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceOverview;
