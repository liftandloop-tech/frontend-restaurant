import React from "react";

/**
 * Recent Activity Log Component
 * Displays a table of recent activities with module tags
 */
const RecentActivityLog = ({
  activities = [
    {
      date: "09 Oct 2025",
      activity: "Renewed License",
      module: "License",
      moduleColor: "bg-purple-100 text-purple-800",
    },
    {
      date: "08 Oct 2025",
      activity: "Added Staff Member",
      module: "Staff",
      moduleColor: "bg-green-100 text-green-800",
    },
    {
      date: "07 Oct 2025",
      activity: "Updated Plan",
      module: "Billing",
      moduleColor: "bg-pink-100 text-pink-800",
    },
    {
      date: "06 Oct 2025",
      activity: "Created Offer",
      module: "Promotions",
      moduleColor: "bg-orange-100 text-orange-800",
    },
    {
      date: "05 Oct 2025",
      activity: "Added Vendor",
      module: "Inventory",
      moduleColor: "bg-indigo-100 text-indigo-800",
    },
    {
      date: "04 Oct 2025",
      activity: "Changed Password",
      module: "Security",
      moduleColor: "bg-red-100 text-red-800",
    },
  ],
  onViewAllLogs,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Recent Activity Log
        </h2>
        <button
          onClick={onViewAllLogs}
          className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          View All Logs
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Date
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Activity
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Module
              </th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4 text-sm text-gray-900">
                  {activity.date}
                </td>
                <td className="py-3 px-4 text-sm text-gray-900">
                  {activity.activity}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${activity.moduleColor}`}
                  >
                    {activity.module}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivityLog;
