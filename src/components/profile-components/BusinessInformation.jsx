import React from "react";

/**
 * Business Information Component
 * Displays business details and manage branches button
 */
const BusinessInformation = ({
  businessData = {
    businessName: "Rayonner Salon",
    gstRegNo: "23AABCR2321K1Z",
    workingHours: "10:00 AM - 9:00 PM",
    manager: "Neha Sharma",
    businessType: "Salon",
    businessEmail: "contact@rayonner.com",
    weeklyOff: "Monday",
    branchCount: "3 Active Locations",
    businessPhone: "+91 91234 56789",
    dailyOrders: "50+",
  },
  onManageBranches,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Business Information
        </h2>
        <button
          onClick={onManageBranches}
          className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
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
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-7 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          Manage Branches
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Business Name</p>
            <p className="text-sm font-medium text-gray-900">
              {businessData.businessName}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">GST / Reg. No</p>
            <p className="text-sm font-medium text-gray-900">
              {businessData.gstRegNo}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Working Hours</p>
            <p className="text-sm font-medium text-gray-900">
              {businessData.workingHours}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Manager</p>
            <p className="text-sm font-medium text-gray-900">
              {businessData.manager}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Business Type</p>
            <p className="text-sm font-medium text-gray-900">
              {businessData.businessType}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Business Email</p>
            <p className="text-sm font-medium text-gray-900">
              {businessData.businessEmail}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Weekly Off</p>
            <p className="text-sm font-medium text-gray-900">
              {businessData.weeklyOff}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Branch Count</p>
            <p className="text-sm font-medium text-gray-900">
              {businessData.branchCount}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Business Phone</p>
            <p className="text-sm font-medium text-gray-900">
              {businessData.businessPhone}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Daily Orders</p>
            <p className="text-sm font-medium text-gray-900">
              {businessData.dailyOrders}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInformation;
