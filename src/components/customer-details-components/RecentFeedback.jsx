import React, { useState } from "react";

/**
 * RecentFeedback Component
 *
 * Displays customer feedback with:
 * - Star ratings
 * - Feedback text
 * - Date
 * - Filter options (All, Negative)
 * - Follow-up task assignment for negative feedback
 */
const RecentFeedback = ({ feedback, onAssignFollowUp }) => {
  const [activeFilter, setActiveFilter] = useState("All");

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 text-yellow-400 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 text-yellow-400 fill-current"
            viewBox="0 0 24 24"
          >
            <defs>
              <linearGradient id="half-star">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#E5E7EB" />
              </linearGradient>
            </defs>
            <path
              fill="url(#half-star)"
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 text-gray-300 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      }
    }
    return stars;
  };

  // Get feedback background color based on rating
  const getFeedbackBgColor = (rating) => {
    if (rating >= 4.5) return "bg-green-50";
    if (rating >= 3.5) return "bg-yellow-50";
    return "bg-red-50";
  };

  // Filter feedback based on active filter
  const filteredFeedback =
    activeFilter === "All"
      ? feedback
      : feedback.filter((item) => item.rating < 4);

  return (
    <div className="p-6 border-b border-gray-200">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Feedback</h3>

        {/* Filter Options */}
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveFilter("All")}
            className={`text-sm font-medium transition-colors duration-200 ${
              activeFilter === "All"
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter("Negative")}
            className={`text-sm font-medium transition-colors duration-200 ${
              activeFilter === "Negative"
                ? "text-red-600"
                : "text-gray-500 hover:text-red-600"
            }`}
          >
            Negative
          </button>
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedback.map((item, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${getFeedbackBgColor(item.rating)}`}
          >
            {/* Rating and Date */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {renderStars(item.rating)}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {item.rating}
                </span>
              </div>
              <span className="text-sm text-gray-500">{item.date}</span>
            </div>

            {/* Feedback Text */}
            <p className="text-gray-700 mb-3">"{item.text}"</p>

            {/* Follow-up Task Button for Low Ratings */}
            {item.rating < 4 && (
              <button
                onClick={() => onAssignFollowUp(item)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
              >
                + Assign Follow-up Task
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentFeedback;
