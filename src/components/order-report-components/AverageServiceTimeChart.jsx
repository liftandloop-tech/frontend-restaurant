import React from "react";

/**
 * AverageServiceTimeChart component displays a line chart showing service time trends
 *
 * Features:
 * - Line chart with service time data by day
 * - Y-axis with time labels
 * - X-axis with day labels
 * - Summary statistics below chart
 * - Responsive design
 */
const AverageServiceTimeChart = () => {
  const serviceTimeData = [
    { day: "Mon", time: 16 },
    { day: "Tue", time: 22 },
    { day: "Wed", time: 18 },
    { day: "Thu", time: 20 },
    { day: "Fri", time: 24 },
    { day: "Sat", time: 19 },
    { day: "Sun", time: 17 },
  ];

  const maxTime = Math.max(...serviceTimeData.map((item) => item.time));
  const minTime = Math.min(...serviceTimeData.map((item) => item.time));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      {/* Chart Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Average Service Time (Minutes)
      </h3>

      {/* Chart Container */}
      <div className="space-y-4">
        {/* Y-axis Labels */}
        <div className="flex justify-end space-x-4 text-xs text-gray-500 mb-2">
          <span>20</span>
          <span>10</span>
          <span>0</span>
        </div>

        {/* Chart Area */}
        <div className="relative h-32">
          {/* Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[0, 1, 2].map((i) => (
              <div key={i} className="border-t border-gray-100"></div>
            ))}
          </div>

          {/* Line Chart */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Line Path */}
            <polyline
              fill="none"
              stroke="#2563eb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={serviceTimeData
                .map((item, index) => {
                  const x = (index / (serviceTimeData.length - 1)) * 100;
                  const y =
                    100 -
                    ((item.time - minTime) / (maxTime - minTime)) * 80 -
                    10;
                  return `${x},${y}`;
                })
                .join(" ")}
              className="transition-all duration-1000 ease-out"
            />

            {/* Data Points */}
            {serviceTimeData.map((item, index) => {
              const x = (index / (serviceTimeData.length - 1)) * 100;
              const y =
                100 - ((item.time - minTime) / (maxTime - minTime)) * 80 - 10;
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="2"
                  fill="#2563eb"
                  className="transition-all duration-1000 ease-out hover:r-3"
                />
              );
            })}
          </svg>
        </div>

        {/* X-axis Labels */}
        <div className="flex justify-between text-xs text-gray-500">
          {serviceTimeData.map((item, index) => (
            <span key={index} className="text-center">
              {item.day}
            </span>
          ))}
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap justify-between text-sm text-gray-600">
          <span>
            Dine-in: <span className="font-semibold text-gray-900">18m</span>
          </span>
          <span>
            Takeaway: <span className="font-semibold text-gray-900">12m</span>
          </span>
          <span>
            Online: <span className="font-semibold text-gray-900">22m</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AverageServiceTimeChart;
