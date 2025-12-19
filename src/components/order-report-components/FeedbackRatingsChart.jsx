import React from "react";

/**
 * FeedbackRatingsChart component displays a bar chart showing feedback distribution
 *
 * Features:
 * - Vertical bar chart with feedback categories
 * - Color-coded bars (green, orange, red)
 * - Percentage labels
 * - Responsive design
 */
const FeedbackRatingsChart = () => {
  const feedbackData = [
    {
      category: "Positive",
      percentage: 78,
      color: "bg-green-500",
      textColor: "text-green-600",
    },
    {
      category: "Neutral",
      percentage: 18,
      color: "bg-orange-400",
      textColor: "text-orange-600",
    },
    {
      category: "Negative",
      percentage: 4,
      color: "bg-red-500",
      textColor: "text-red-600",
    },
  ];

  const maxPercentage = Math.max(
    ...feedbackData.map((item) => item.percentage)
  );

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      {/* Chart Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Feedback Ratings Distribution
      </h3>

      {/* Chart Container */}
      <div className="space-y-4">
        {/* Y-axis Labels */}
        <div className="flex justify-end space-x-4 text-xs text-gray-500 mb-2">
          <span>100%</span>
          <span>50%</span>
          <span>0%</span>
        </div>

        {/* Chart Area */}
        <div className="flex items-end justify-between space-x-4 h-32">
          {feedbackData.map((item, index) => {
            const heightPercentage = (item.percentage / maxPercentage) * 100;
            const actualHeight = Math.max(heightPercentage * 0.8, 8); // Minimum height of 8%

            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                {/* Bar */}
                <div className="w-full flex flex-col justify-end h-24">
                  <div
                    className={`w-full ${item.color} rounded-t-lg transition-all duration-1000 ease-out hover:opacity-80 relative group`}
                    style={{ height: `${actualHeight}%` }}
                  >
                    {/* Percentage Label on Hover */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {item.percentage}%
                    </div>
                  </div>
                </div>

                {/* Category Label */}
                <div className="mt-3 text-sm font-medium text-gray-700 text-center">
                  {item.category}
                </div>

                {/* Percentage Value */}
                <div
                  className={`mt-1 text-xs font-semibold ${item.textColor} text-center`}
                >
                  {item.percentage}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart Summary */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Based on{" "}
            <span className="font-semibold text-gray-900">
              164 customer feedback forms
            </span>{" "}
            this week
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackRatingsChart;
