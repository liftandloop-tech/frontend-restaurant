import React from "react";

/**
 * KeyMetricsCards component displays four key billing metrics
 *
 * Features:
 * - Total Bills Generated with trend indicator
 * - Total Revenue with trend indicator
 * - Average Bill Value with trend indicator
 * - Pending Payments with trend indicator
 * - Auto-refresh notification
 * - Responsive grid layout
 */
const KeyMetricsCards = () => {
  const metrics = [
    {
      id: 1,
      title: "Total Bills Generated",
      value: "1,284",
      subtitle: "Average 42 bills/day",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      bgColor: "bg-blue-500",
      trend: {
        value: "8%",
        direction: "up",
        color: "text-green-600",
      },
    },
    {
      id: 2,
      title: "Total Revenue",
      value: "₹ 12,85,000",
      subtitle: "Net sales after tax adjustments",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
          />
        </svg>
      ),
      bgColor: "bg-green-500",
      trend: {
        value: "5%",
        direction: "up",
        color: "text-green-600",
      },
    },
    {
      id: 3,
      title: "Average Bill Value",
      value: "₹ 1,000",
      subtitle: "Includes dine-in, takeaway, and online",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
      bgColor: "bg-blue-500",
      trend: {
        value: "--",
        direction: "neutral",
        color: "text-gray-400",
      },
    },
    {
      id: 4,
      title: "Pending Payments",
      value: "₹ 35,600",
      subtitle: "To be settled across 12 open bills.",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      bgColor: "bg-orange-500",
      trend: {
        value: "2%",
        direction: "down",
        color: "text-red-600",
      },
    },
  ];

  return (
    <div className="mb-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Icon */}
                <div
                  className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center mb-4`}
                >
                  {metric.icon}
                </div>

                {/* Value */}
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {metric.value}
                </div>

                {/* Title */}
                <div className="text-sm font-medium text-gray-900 mb-1">
                  {metric.title}
                </div>

                {/* Subtitle */}
                <div className="text-xs text-gray-500 mb-3">
                  {metric.subtitle}
                </div>

                {/* Trend */}
                <div className="flex items-center">
                  {metric.trend.direction === "up" && (
                    <svg
                      className="w-4 h-4 text-green-600 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 17l9.2-9.2M17 17V7H7"
                      />
                    </svg>
                  )}
                  {metric.trend.direction === "down" && (
                    <svg
                      className="w-4 h-4 text-red-600 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 7l-9.2 9.2M7 7v10h10"
                      />
                    </svg>
                  )}
                  {metric.trend.direction === "neutral" && (
                    <div className="w-4 h-0.5 bg-gray-400 mr-1"></div>
                  )}
                  <span className={`text-sm font-medium ${metric.trend.color}`}>
                    {metric.trend.value}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Auto-refresh notification */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
          Figures auto-refreshed every 10 minutes.
        </p>
      </div>
    </div>
  );
};

export default KeyMetricsCards;
