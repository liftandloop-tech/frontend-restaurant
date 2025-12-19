import React from "react";

/**
 * Individual offer card component
 * Displays offer details with icon, title, description, and metrics
 */
const OfferCard = ({ offer }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-orange-100 text-orange-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${offer.iconBg}`}
        >
          <span className="text-white text-xl">{offer.icon}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              offer.status
            )}`}
          >
            {offer.status}
          </span>
          <button className="text-gray-400 hover:text-gray-600">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 mb-1">{offer.title}</h3>
        <p className="text-sm text-gray-500 mb-2">{offer.category}</p>
        <p className="text-lg font-bold text-gray-900 mb-1">
          {offer.description}
        </p>
        <p className="text-sm text-gray-600">{offer.conditions}</p>
      </div>

      <div className="space-y-2 text-sm">
        <p className="text-gray-500">{offer.validity}</p>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">{offer.redemptions}</span>
          <span className="text-green-600 font-medium">{offer.impact}</span>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
