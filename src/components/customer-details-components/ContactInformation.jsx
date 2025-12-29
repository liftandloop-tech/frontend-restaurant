import React from "react";

/**
 * ContactInformation Component
 *
 * Displays customer contact details with:
 * - Phone number with external link icon
 * - Email with external link icon
 * - Date of birth
 * - Loyalty tier and points
 * - Action buttons (Edit Profile, Merge, Delete)
 */
const ContactInformation = ({ customer, onEditProfile, onMerge, onDelete }) => {
  // Handle external link clicks
  const handlePhoneClick = () => {
    window.open(`tel:${customer.phone}`, "_self");
  };

  const handleEmailClick = () => {
    window.open(`mailto:${customer.email}`, "_self");
  };

  return (
    <div className="p-6 border-b border-gray-200">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Contact Information
        </h3>
      </div>

      {/* Contact Details */}
      <div className="space-y-4 mb-6">
        {/* Phone Number */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <span className="text-gray-700 font-medium">{customer.phone}</span>
          </div>
          <button
            onClick={handlePhoneClick}
            className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
            aria-label="Call customer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </button>
        </div>

        {/* Email */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="text-gray-700 font-medium">{customer.email}</span>
          </div>
          <button
            onClick={handleEmailClick}
            className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
            aria-label="Email customer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </button>
        </div>

        {/* Date of Birth */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-4 h-4 text-blue-600"
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
          </div>
          <span className="text-gray-700 font-medium">
            {customer.dateOfBirth}
          </span>
        </div>

        {/* Loyalty Tier */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-4 h-4 text-yellow-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <span className="text-gray-700 font-medium">
            {customer.loyaltyTier || 'Standard'} • {customer.loyaltyPoints || 0} Points
          </span>
        </div>

        {/* Revenue Card Details */}
        <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-xl border border-purple-100">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-4 h-4 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Revenue Card</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${customer.revenueCardEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {customer.revenueCardEnabled ? 'ACTIVE' : 'INACTIVE'}
              </span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm font-semibold text-gray-900">
                {customer.revenueCardEnabled ? `**** **** ${customer.revenueCardNumber?.slice(-4)}` : 'Not Linked'}
              </span>
              {customer.revenueCardEnabled && (
                <span className="text-sm font-bold text-blue-600">₹{customer.revenueCardBalance || 0}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onEditProfile}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Edit Profile
        </button>

        <button
          onClick={onMerge}
          className="inline-flex items-center px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
          Merge
        </button>

        <button
          onClick={onDelete}
          className="inline-flex items-center px-4 py-2 bg-white text-red-600 text-sm font-medium rounded-lg border border-gray-300 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactInformation;
