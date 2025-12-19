import React from "react";

/**
 * BasicInformation Component
 *
 * Handles basic staff information including:
 * - Full Name (required)
 * - Phone Number (required)
 * - Email ID (optional)
 * - Date of Joining (optional)
 * - Gender selection (radio buttons)
 * - Status toggle (Active/Inactive)
 */
const BasicInformation = ({
  formData,
  onInputChange,
  onGenderChange,
  onStatusChange,
}) => {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Basic Information
        </h3>
        <p className="text-sm text-gray-600">
          Fill in the essential details for the staff member
        </p>
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName || ""}
            onChange={onInputChange}
            placeholder="Enter full name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber || ""}
            onChange={onInputChange}
            placeholder="+91 98765 43210"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            required
          />
        </div>

        {/* Email ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email ID
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={onInputChange}
            placeholder="staff@restaurant.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          />
        </div>

        {/* Date of Joining */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Joining
          </label>
          <div className="relative">
            <input
              type="date"
              name="dateOfJoining"
              value={formData.dateOfJoining || ""}
              onChange={onInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
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
            </div>
          </div>
        </div>

        {/* Gender Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Gender
          </label>
          <div className="space-y-2">
            {["Male", "Female", "Other"].map((gender) => (
              <label
                key={gender}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={formData.gender === gender}
                  onChange={onGenderChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm text-gray-700">{gender}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Status Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Status
          </label>
          <div className="flex items-center space-x-4">
            <span
              className={`text-sm font-medium transition-colors duration-200 ${
                !formData.isActive ? "text-gray-700" : "text-gray-400"
              }`}
            >
              Inactive
            </span>
            <button
              type="button"
              onClick={() => onStatusChange(!formData.isActive)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${formData.isActive ? "bg-blue-600" : "bg-gray-200"}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
                  ${formData.isActive ? "translate-x-6" : "translate-x-1"}
                `}
              />
            </button>
            <span
              className={`text-sm font-medium transition-colors duration-200 ${
                formData.isActive ? "text-gray-700" : "text-gray-400"
              }`}
            >
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
