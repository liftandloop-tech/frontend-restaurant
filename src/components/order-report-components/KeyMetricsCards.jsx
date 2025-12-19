import React from "react";

/**
 * KeyMetricsCards component displays four key performance metrics
 *
 * Features:
 * - Total Orders with growth indicator
 * - Total Revenue with growth indicator
 * - Average Order Value with breakdown
 * - Fulfillment Rate with improvement indicator
 * - Responsive grid layout
 * - Hover effects and smooth transitions
 */
const KeyMetricsCards = () => {
  const metrics = [
    {
      id: 1,
      title: "Total Orders",
      value: "1,240",
      subtitle: "Average 41 orders/day",
      change: "+6%",
      changeType: "positive",
      icon: (
        <svg
          className="w-6 h-6 text-blue-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8 15V9h4v6H8z"
            clipRule="evenodd"
          />
        </svg>
      ),
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
    },
    {
      id: 2,
      title: "Total Revenue",
      value: "₹12,10,000",
      subtitle: "Excludes taxes & discounts",
      change: "+4%",
      changeType: "positive",
      icon: (
        <svg
          className="w-6 h-6 text-green-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
            clipRule="evenodd"
          />
        </svg>
      ),
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
    },
    {
      id: 3,
      title: "Average Order Value",
      value: "₹975",
      subtitle: "Dine-in ₹1,120 • Online ₹860",
      change: "—",
      changeType: "neutral",
      icon: (
        <svg
          className="w-6 h-6 text-purple-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
    },
    {
      id: 4,
      title: "Fulfillment Rate",
      value: "96.8%",
      subtitle: "Failures reduced by 3%",
      change: "+3%",
      changeType: "positive",
      icon: (
        <svg
          className="w-6 h-6 text-yellow-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      bgColor: "bg-yellow-50",
      iconBg: "bg-yellow-100",
    },
  ];

  return (
    <div className="mb-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
          >
            {/* Icon */}
            <div className={`inline-flex p-3 rounded-lg ${metric.iconBg} mb-4`}>
              {metric.icon}
            </div>

            {/* Value */}
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {metric.value}
            </div>

            {/* Title */}
            <div className="text-sm font-medium text-gray-900 mb-2">
              {metric.title}
            </div>

            {/* Subtitle */}
            <div className="text-xs text-gray-500 mb-3">{metric.subtitle}</div>

            {/* Change Indicator */}
            <div className="flex items-center">
              {metric.changeType === "positive" && (
                <>
                  <svg
                    className="w-4 h-4 text-green-500 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-green-600">
                    {metric.change}
                  </span>
                </>
              )}
              {metric.changeType === "negative" && (
                <>
                  <svg
                    className="w-4 h-4 text-red-500 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-red-600">
                    {metric.change}
                  </span>
                </>
              )}
              {metric.changeType === "neutral" && (
                <>
                  <svg
                    className="w-4 h-4 text-gray-400 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-500">
                    {metric.change}
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Auto-sync Notice */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Data auto-synced with billing & POS terminals.
        </p>
      </div>
    </div>
  );
};

export default KeyMetricsCards;
