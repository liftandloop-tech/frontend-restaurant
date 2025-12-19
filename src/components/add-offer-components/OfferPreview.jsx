import React from "react";

/**
 * OfferPreview Component
 *
 * Real-time preview of the offer card showing:
 * - Offer title and code
 * - Discount value
 * - Description
 * - Conditions list
 * - Apply button
 * - QR Code section
 * - Distribution status
 *
 * Props:
 * - formData: object containing form values
 */
const OfferPreview = ({ formData }) => {
  // Generate description based on form data
  const getDescription = () => {
    if (!formData.offerName || !formData.discountPercentage) {
      return "Get discount on your order";
    }
    return `Get ${
      formData.discountPercentage
    }% off on ${formData.applicableTo.toLowerCase()}`;
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "selected date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get conditions list
  const getConditions = () => {
    const conditions = [];

    if (formData.endDate) {
      conditions.push({
        icon: (
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        ),
        text: `Valid until ${formatDate(formData.endDate)}`,
      });
    }

    if (
      formData.minimumOrderValue &&
      parseFloat(formData.minimumOrderValue) > 0
    ) {
      conditions.push({
        icon: (
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
            />
          </svg>
        ),
        text: `Min order: ₹${formData.minimumOrderValue}`,
      });
    }

    if (
      formData.maximumRedemptions &&
      parseInt(formData.maximumRedemptions) > 0
    ) {
      conditions.push({
        icon: (
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
            />
          </svg>
        ),
        text: `${formData.maximumRedemptions} redemptions left`,
      });
    }

    return conditions;
  };

  const conditions = getConditions();

  return (
    <div className="h-full flex flex-col">
      {/* Preview Header - Fixed */}
      <div className="p-6 border-b border-gray-200 bg-white flex-shrink-0">
        <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
        <p className="text-sm text-gray-600 mt-1">
          See how your offer will appear to customers
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="p-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-start space-x-4">
              {/* Discount Icon */}
              <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-full p-3 flex-shrink-0 shadow-lg">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>

              {/* Offer Details */}
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-semibold text-gray-900 mb-1">
                  {formData.offerName || "Weekend Special"}
                </h4>
                <p className="text-sm text-gray-500 mb-2">
                  {formData.offerCode || "WEEKEND20"}
                </p>
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {formData.discountPercentage || "20"}% OFF
                </div>
                <p className="text-sm text-gray-700 mb-4">{getDescription()}</p>

                {/* Conditions */}
                {conditions.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {conditions.map((condition, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-sm text-gray-600"
                      >
                        <div className="text-gray-400">{condition.icon}</div>
                        <span>{condition.text}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Apply Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm">
                  Apply Offer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="p-6 border-t border-gray-200 bg-white">
          <div className="text-center">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-4 border border-gray-200">
              <svg
                className="h-16 w-16 mx-auto text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-700">
              QR Code for easy sharing
            </p>
          </div>
        </div>

        {/* Distribution Status */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            Distribution
          </h4>
          <div className="space-y-3">
            {formData.qrCode && (
              <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <svg
                      className="h-4 w-4 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    QR Code
                  </span>
                </div>
                <div className="bg-green-100 p-1 rounded-full">
                  <svg
                    className="h-4 w-4 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferPreview;
