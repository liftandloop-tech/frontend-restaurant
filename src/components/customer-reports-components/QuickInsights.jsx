import React from "react";

/**
 * QuickInsights component displays key customer insights
 *
 * Features:
 * - Highest spender information
 * - Most frequent customer information
 * - Clean card layout with proper spacing
 * - Responsive design
 */
const QuickInsights = () => {
  const insights = [
    {
      id: 1,
      label: "Highest Spender",
      name: "Aditi Verma",
      value: "₹ 8,560",
    },
    {
      id: 2,
      label: "Most Frequent",
      name: "Rajesh Kumar",
      value: "12 visits",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Insights</h3>

      {/* Insights List */}
      <div className="space-y-6">
        {insights.map((insight) => (
          <div key={insight.id} className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-600 mb-1">
                {insight.label}
              </div>
              <div className="text-sm text-gray-500">{insight.name}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-gray-900">
                {insight.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickInsights;
