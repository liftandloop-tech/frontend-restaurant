import React from "react";

/**
 * KeyMetricsCards component displays the main performance metrics
 * Shows Total Revenue, Total Orders, Total Customers, and Active Offers
 */
const KeyMetricsCards = ({ data, value = 0, trend = 0 }) => {
  const metricsData = data?.metrics || {};

  const metrics = [
    {
      id: 1,
      title: "Total Revenue",
      value: `₹${(metricsData.totalRevenue || 0).toLocaleString()}`,
      change: `${(metricsData.trends?.totalRevenue || 0) > 0 ? "+" : ""}${metricsData.trends?.totalRevenue || 0}%`,
      changeType: (metricsData.trends?.totalRevenue || 0) >= 0 ? "positive" : "negative",
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
    },
    {
      id: 2,
      title: "Total Orders",
      value: (metricsData.totalOrders || 0).toLocaleString(),
      change: `${(metricsData.trends?.totalOrders || 0) > 0 ? "+" : ""}${metricsData.trends?.totalOrders || 0}%`,
      changeType: (metricsData.trends?.totalOrders || 0) >= 0 ? "positive" : "negative",
      icon: (
        <svg
          className="w-6 h-6 text-blue-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8 15v-4h4v4H8z"
            clipRule="evenodd"
          />
        </svg>
      ),
      bgColor: "bg-blue-50",
    },
    {
      id: 3,
      title: "Total Customers",
      value: (metricsData.totalCustomers || 0).toLocaleString(),
      change: `${(metricsData.trends?.totalCustomers || 0) > 0 ? "+" : ""}${metricsData.trends?.totalCustomers || 0}%`,
      changeType: (metricsData.trends?.totalCustomers || 0) >= 0 ? "positive" : "negative",
      icon: (
        <svg
          className="w-6 h-6 text-blue-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      ),
      bgColor: "bg-blue-50",
    },
    {
      id: 4,
      title: "Completed Orders",
      value: (metricsData.completedOrders || 0).toLocaleString(),
      change: `${(metricsData.trends?.completedOrders || 0) > 0 ? "+" : ""}${metricsData.trends?.completedOrders || 0}%`,
      changeType: (metricsData.trends?.completedOrders || 0) >= 0 ? "positive" : "negative",
      icon: (
        <svg
          className="w-6 h-6 text-orange-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
      ),
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-full ${metric.bgColor}`}>
              {metric.icon}
            </div>
            {metric.change && (
              <div
                className={`flex items-center gap-1 text-sm font-medium ${metric.changeType === "positive"
                  ? "text-green-600"
                  : "text-red-600"
                  }`}
              >
                {metric.changeType === "positive" ? (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {metric.change}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {metric.value}
            </h3>
            <p className="text-gray-600 text-sm">{metric.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KeyMetricsCards;
