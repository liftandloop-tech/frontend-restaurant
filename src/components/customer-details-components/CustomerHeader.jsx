import React from "react";

/**
 * CustomerHeader Component
 *
 * Displays the customer profile header with:
 * - Close button
 * - Customer profile picture with colorful background
 * - Customer name and ID
 * - Status badges (VIP, Regular, Loyalty Member)
 */
const CustomerHeader = ({ customer, onClose }) => {
  // Generate initials from customer name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Get badge styling based on status
  const getBadgeStyle = (badge) => {
    const styles = {
      VIP: "bg-orange-100 text-orange-800 border-orange-200",
      Regular: "bg-green-100 text-green-800 border-green-200",
      "Loyalty Member": "bg-blue-100 text-blue-800 border-blue-200",
    };
    return styles[badge] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="flex items-start justify-between p-6 border-b border-gray-200">
      {/* Customer Profile Section */}
      <div className="flex items-center space-x-4">
        {/* Profile Picture with Colorful Background */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 via-blue-500 to-green-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            {customer.profileImage ? (
              <img
                src={customer.profileImage}
                alt={customer.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              getInitials(customer.name)
            )}
          </div>
        </div>

        {/* Customer Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {customer.name}
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            Customer ID: {customer.id}
          </p>

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2">
            {customer.badges?.map((badge, index) => (
              <span
                key={index}
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeStyle(
                  badge
                )}`}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1 transition-colors duration-200"
        aria-label="Close customer details"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default CustomerHeader;
