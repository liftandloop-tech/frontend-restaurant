import React from "react";

/**
 * Attendance Overview component with bar chart
 * Shows weekly attendance percentage data
 */
const AttendanceOverview = () => {
  // Sample attendance data for the week
  const attendanceData = [
    { day: "Mon", percentage: 80 },
    { day: "Tue", percentage: 90 },
    { day: "Wed", percentage: 78 },
    { day: "Thu", percentage: 95 },
    { day: "Fri", percentage: 85 },
    { day: "Sat", percentage: 90 },
    { day: "Sun", percentage: 80 },
  ];

  const maxPercentage = Math.max(...attendanceData.map((d) => d.percentage));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Attendance Overview
      </h3>

      {/* Chart Container */}
      <div className="space-y-4">
        {/* Y-axis labels */}
        <div className="flex items-end justify-between h-48">
          {/* Y-axis */}
          <div className="flex flex-col justify-between h-full text-xs text-gray-500">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>

          {/* Chart bars */}
          <div className="flex-1 flex items-end justify-between px-4">
            {attendanceData.map((data, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                {/* Bar */}
                <div
                  className="w-8 bg-blue-600 rounded-t-sm transition-all duration-300 hover:bg-blue-700"
                  style={{
                    height: `${(data.percentage / maxPercentage) * 180}px`,
                    minHeight: "4px",
                  }}
                  title={`${data.percentage}%`}
                />
                {/* Day label */}
                <span className="text-xs text-gray-600 font-medium">
                  {data.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* X-axis label */}
        <div className="text-center">
          <span className="text-xs text-gray-500">Days of the Week</span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceOverview;
