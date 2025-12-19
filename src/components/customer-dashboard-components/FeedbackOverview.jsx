import React, { useState } from "react";

/**
 * FeedbackOverview component displays customer feedback statistics and recent feedback entries
 * Shows rating distribution and allows filtering of negative feedback
 */
const FeedbackOverview = ({ feedbackData }) => {
  const [showOnlyNegative, setShowOnlyNegative] = useState(false);

  // Filter feedback based on negative filter
  const filteredFeedback = showOnlyNegative
    ? feedbackData.recentFeedback.filter((feedback) => feedback.rating < 3)
    : feedbackData.recentFeedback;

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 text-yellow-400 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 h-fit sticky top-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Feedback Overview
        </h3>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
          View All
        </button>
      </div>

      {/* Rating Distribution */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Rating Distribution
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                Positive (4-5 stars)
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {feedbackData.distribution.positive}%
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Neutral (3 stars)</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {feedbackData.distribution.neutral}%
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                Negative (1-2 stars)
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {feedbackData.distribution.negative}%
            </span>
          </div>
        </div>
      </div>

      {/* Recent Feedback */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-gray-700">Recent Feedback</h4>
          <label className="flex items-center gap-2 text-xs md:text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlyNegative}
              onChange={(e) => setShowOnlyNegative(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="hidden sm:inline">Show only negative</span>
            <span className="sm:hidden">Negative only</span>
          </label>
        </div>

        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {filteredFeedback.map((feedback, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-3 md:p-4 hover:shadow-sm transition-shadow duration-150"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-xs shrink-0">
                    {feedback.customerName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">
                      {feedback.customerName}
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(feedback.rating)}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                  {feedback.date}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-3 italic">
                "{feedback.comment}"
              </p>

              {feedback.rating < 3 && (
                <button className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors">
                  Assign Follow-up
                </button>
              )}
            </div>
          ))}
        </div>

        {filteredFeedback.length === 0 && showOnlyNegative && (
          <div className="text-center py-8 text-gray-500">
            <svg
              className="w-12 h-12 mx-auto mb-2 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-sm">No negative feedback found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackOverview;
