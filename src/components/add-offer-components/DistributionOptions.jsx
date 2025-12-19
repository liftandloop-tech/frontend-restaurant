import React from "react";

/**
 * DistributionOptions Component
 *
 * Form section for selecting distribution methods including:
 * - Auto SMS
 * - Email
 * - QR Code
 * - Print
 *
 * Props:
 * - formData: object containing form values
 * - onCheckboxChange: function to handle checkbox changes
 */
const DistributionOptions = ({ formData, onCheckboxChange }) => {
  const distributionOptions = [
    {
      name: "autoSMS",
      label: "Auto SMS",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
    },
    {
      name: "email",
      label: "Email",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      name: "qrCode",
      label: "QR Code",
      icon: (
        <svg
          className="h-6 w-6"
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
      ),
    },
    {
      name: "print",
      label: "Print",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-800">
        Distribution Options
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {distributionOptions.map((option) => (
          <div
            key={option.name}
            className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
              formData[option.name]
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
            onClick={() => {
              const event = {
                target: {
                  name: option.name,
                  checked: !formData[option.name],
                },
              };
              onCheckboxChange(event);
            }}
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name={option.name}
                checked={formData[option.name]}
                onChange={onCheckboxChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <div className="flex items-center space-x-2">
                <div
                  className={`${
                    formData[option.name] ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {option.icon}
                </div>
                <span
                  className={`text-sm font-medium ${
                    formData[option.name] ? "text-blue-900" : "text-gray-700"
                  }`}
                >
                  {option.label}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DistributionOptions;
