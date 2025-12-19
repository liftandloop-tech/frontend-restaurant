import React from "react";

/**
 * Attendance Alerts component
 * Shows alerts for staff attendance issues
 */
const AttendanceAlerts = () => {
  const alerts = [
    {
      id: 1,
      message: "Tom Baker - 3 days absent",
      type: "warning",
    },
    {
      id: 2,
      message: "Lisa Chen - Late 4 times",
      type: "warning",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Attendance Alerts
      </h3>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors duration-150"
          >
            <span className="text-sm text-gray-700 font-medium">
              {alert.message}
            </span>
            <svg
              className="w-5 h-5 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceAlerts;
