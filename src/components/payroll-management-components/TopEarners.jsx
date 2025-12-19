import React from "react";

/**
 * TopEarners component displays the list of top-earning staff members
 * Shows staff avatar, name, and their final pay amount
 */
const TopEarners = () => {
  const topEarners = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      finalPay: 27000,
    },
    {
      id: 2,
      name: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      finalPay: 21000,
    },
    {
      id: 3,
      name: "Emma Wilson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      finalPay: 16800,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Earners</h3>

      {/* Top Earners List */}
      <div className="space-y-4">
        {topEarners.map((earner) => (
          <div key={earner.id} className="flex items-center justify-between">
            <div className="flex items-center">
              {/* Avatar */}
              <div className="flex-shrink-0 h-8 w-8">
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={earner.avatar}
                  alt={earner.name}
                />
              </div>

              {/* Name */}
              <span className="ml-3 text-sm font-medium text-gray-700">
                {earner.name}
              </span>
            </div>

            {/* Final Pay */}
            <span className="text-sm font-semibold text-gray-900">
              ₹{earner.finalPay.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopEarners;
