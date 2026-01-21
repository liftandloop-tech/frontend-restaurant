import React from "react";

/**
 * TopEarners component displays the list of top-earning staff members
 * Shows staff avatar, name, and their final pay amount
 */
const TopEarners = ({ staff = [] }) => {
  // Sort by salary descending and take top 3
  const topEarners = [...staff]
    .sort((a, b) => (b.baseSalary || 0) - (a.baseSalary || 0))
    .slice(0, 3)
    .map(s => ({
      id: s._id || s.id,
      name: s.fullName || s.name,
      avatar: s.profilePicture || null,
      finalPay: s.baseSalary || 0
    }));

  if (topEarners.length === 0) {
    // Show message or skeleton? Or just nothing.
    // If empty, let's just show an empty state or nothing
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Earners</h3>
        <p className="text-gray-500 text-sm">No data available</p>
      </div>
    );
  }

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
                {earner.avatar ? (
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={earner.avatar}
                    alt={earner.name}
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                    {earner.name.charAt(0).toUpperCase()}
                  </div>
                )}
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
