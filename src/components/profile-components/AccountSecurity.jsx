import React from "react";

/**
 * Account & Security Component
 * Displays account information and security settings
 */
const AccountSecurity = ({
  accountData = {
    userId: "ishan.owner@quickxpos.com",
    passwordLastUpdated: "08 Oct 2025",
  },
  onChangePassword,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1 space-y-4">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-gray-600 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <div>
              <p className="text-sm text-gray-500 mb-1">User ID</p>
              <p className="text-sm font-medium text-gray-900">
                {accountData.userId}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-gray-600 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <div>
              <p className="text-sm text-gray-500 mb-1">Password</p>
              <p className="text-sm font-medium text-gray-900">••••••••••</p>
            </div>
          </div>

          <p className="text-sm text-gray-500 ml-8">
            Last Updated: {accountData.passwordLastUpdated}
          </p>

          <p className="text-xs text-gray-400 ml-8">
            For your safety, passwords are encrypted and cannot be displayed.
          </p>
        </div>

        <button
          onClick={onChangePassword}
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
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          Change Password
        </button>
      </div>
    </div>
  );
};

export default AccountSecurity;
