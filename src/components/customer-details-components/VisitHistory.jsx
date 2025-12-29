import React from "react";

/**
 * VisitHistory Component
 *
 * Displays customer visit history with:
 * - Recent visits with icons and details
 * - Visit type (Dine-in, Reservation, Delivery)
 * - Date, time, and amount
 * - "See All Visits" link
 */
const VisitHistory = ({ visits = [], onSeeAllVisits }) => {
  // Get icon and styling for visit type
  const getVisitTypeInfo = (type) => {
    const types = {
      "Dine-in": {
        icon: (
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
            />
          </svg>
        ),
        bgColor: "bg-green-500",
        textColor: "text-green-700",
      },
      Reservation: {
        icon: (
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        ),
        bgColor: "bg-blue-500",
        textColor: "text-blue-700",
      },
      Delivery: {
        icon: (
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
        bgColor: "bg-purple-500",
        textColor: "text-purple-700",
      },
    };
    return types[type] || types["Dine-in"];
  };

  return (
    <div className="p-6 border-b border-gray-200">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Visit History</h3>
        <button
          onClick={onSeeAllVisits}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
        >
          See All Visits
        </button>
      </div>

      {/* Visit List */}
      <div className="space-y-3">
        {Array.isArray(visits) && visits.map((visit, index) => {
          const typeInfo = getVisitTypeInfo(visit.type);

          return (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {/* Left Side - Icon and Details */}
              <div className="flex items-center space-x-4">
                {/* Visit Type Icon */}
                <div
                  className={`w-10 h-10 ${typeInfo.bgColor} rounded-lg flex items-center justify-center`}
                >
                  {typeInfo.icon}
                </div>

                {/* Visit Details */}
                <div>
                  <div className="font-medium text-gray-900">
                    {visit.details}
                  </div>
                  <div className="text-sm text-gray-500">
                    {visit.date} • {visit.time}
                  </div>
                </div>
              </div>

              {/* Right Side - Amount and Type */}
              <div className="text-right">
                <div className="font-semibold text-gray-900">
                  {visit.amount}
                </div>
                <div className={`text-sm font-medium ${typeInfo.textColor}`}>
                  {visit.type}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VisitHistory;
