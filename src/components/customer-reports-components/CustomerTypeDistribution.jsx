import React from "react";

/**
 * CustomerTypeDistribution component displays a pie chart of customer types
 *
 * Features:
 * - Pie chart with different customer segments
 * - Color-coded segments with labels
 * - Responsive design
 * - Clean chart styling
 */
const CustomerTypeDistribution = () => {
  // Sample data for the pie chart
  const data = [
    { label: "Returning", value: 574, color: "#10B981", percentage: 77.4 },
    { label: "New", value: 168, color: "#3B82F6", percentage: 22.6 },
    { label: "Inactive", value: 0, color: "#EF4444", percentage: 0 },
  ];

  // Calculate angles for pie chart
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  const segments = data.map((item) => {
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle += angle;

    return {
      ...item,
      startAngle,
      endAngle,
      angle,
    };
  });

  // Function to create SVG path for pie slice
  const createPieSlice = (startAngle, endAngle, radius = 60) => {
    const start = polarToCartesian(0, 0, radius, endAngle);
    const end = polarToCartesian(0, 0, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M",
      0,
      0,
      "L",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      "Z",
    ].join(" ");
  };

  // Helper function to convert polar to cartesian coordinates
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <h3 className="text-lg font-bold text-gray-900 mb-6">
        Customer Type Distribution
      </h3>

      {/* Chart Container */}
      <div className="flex flex-col items-center">
        {/* Pie Chart */}
        <div className="relative mb-6">
          <svg width="140" height="140" className="transform -rotate-90">
            {segments.map((segment, index) => (
              <path
                key={index}
                d={createPieSlice(segment.startAngle, segment.endAngle)}
                fill={segment.color}
                stroke="white"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>

        {/* Legend */}
        <div className="space-y-3 w-full">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm font-medium text-gray-700">
                  {item.label}
                </span>
              </div>
              <span className="text-sm font-bold text-gray-900">
                {item.percentage.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerTypeDistribution;
