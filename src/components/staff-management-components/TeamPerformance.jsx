import React from "react";

/**
 * Team Performance component
 * Shows top performers with their metrics
 */
const TeamPerformance = () => {
  const topPerformers = [
    {
      id: 1,
      name: "Mike Johnson",
      role: "Senior Waiter",
      avatar: "https://i.pravatar.cc/40?img=1",
      metric: "245 Orders",
      metricLabel: "This month",
      metricColor: "text-green-600",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      role: "Head Chef",
      avatar: "https://i.pravatar.cc/40?img=2",
      metric: "4.9 Rating",
      metricLabel: "Customer score",
      metricColor: "text-green-600",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Team Performance
        </h3>
        <p className="text-sm text-gray-500">Top Performers</p>
      </div>

      <div className="space-y-4">
        {topPerformers.map((performer) => (
          <div
            key={performer.id}
            className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150"
          >
            <img
              src={performer.avatar}
              alt={performer.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">
                {performer.name}
              </div>
              <div className="text-sm text-gray-500">{performer.role}</div>
            </div>
            <div className="text-right">
              <div className={`text-sm font-semibold ${performer.metricColor}`}>
                {performer.metric}
              </div>
              <div className="text-xs text-gray-500">
                {performer.metricLabel}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPerformance;
