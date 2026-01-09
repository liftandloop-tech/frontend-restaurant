import React, { useState } from "react";

/**
 * License & Subscription Information Component
 * Displays license key, plan, status, and subscription details
 */
const LicenseSubscription = ({
  licenseData = {
    licenseKey: "QXP-2025-RST-4ZL2",
    plan: "Premium Annual Plan",
    status: "Expiring Soon",
    renewalType: "Annual",
    autoRenew: "Enabled",
    expiryDate: "31 Dec 2025",
    module: "Salon POS",
    paymentMode: "Card ending 8732",
    lastRenewed: "01 Jan 2025",
  },
  onCopyKey,
  onRenewLicense,
  onUpgradePlan,
  onVerifyLicense,
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditingKey, setIsEditingKey] = useState(false);
  const [keyInput, setKeyInput] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleCopyKey = () => {
    navigator.clipboard.writeText(licenseData.licenseKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if (onCopyKey) onCopyKey();
  };

  const handleVerify = async () => {
    if (!keyInput.trim()) return;
    setIsVerifying(true);
    const success = await onVerifyLicense(keyInput);
    setIsVerifying(false);
    if (success) {
      setIsEditingKey(false);
      setKeyInput("");
    }
  };

  const getStatusColor = (status) => {
    if (status === "Expiring Soon") {
      return "text-yellow-600 bg-yellow-50";
    }
    return "text-green-600 bg-green-50";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - License Details */}
        <div className="lg:col-span-2 space-y-4">
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
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">License Key</p>
              {isEditingKey ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={keyInput}
                    onChange={(e) => setKeyInput(e.target.value)}
                    className="text-sm border rounded px-2 py-1 w-full max-w-[200px]"
                    placeholder="Enter License Key"
                  />
                  <button
                    onClick={handleVerify}
                    disabled={isVerifying}
                    className="bg-blue-600 text-white text-xs px-2 py-1 rounded disabled:opacity-50"
                  >
                    {isVerifying ? "Verifying..." : "Verify"}
                  </button>
                  <button
                    onClick={() => setIsEditingKey(false)}
                    className="text-gray-500 text-xs px-2 py-1"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-blue-600">
                    {licenseData.licenseKey}
                  </p>
                  <button
                    onClick={handleCopyKey}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    title="Copy license key"
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
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                  {copied && (
                    <span className="text-xs text-green-600">Copied!</span>
                  )}
                </div>
              )}
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
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <div>
              <p className="text-sm text-gray-500 mb-1">Plan</p>
              <p className="text-sm font-medium text-gray-900">
                {licenseData.plan}
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <div>
              <p className="text-sm text-gray-500 mb-1">Status</p>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    licenseData.status
                  )}`}
                >
                  {licenseData.status === "Expiring Soon" && (
                    <svg
                      className="w-3 h-3 mr-1 text-yellow-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {licenseData.status}
                </span>
              </div>
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <div>
              <p className="text-sm text-gray-500 mb-1">Renewal Type</p>
              <p className="text-sm font-medium text-gray-900">
                {licenseData.renewalType} | Auto-Renew: {licenseData.autoRenew}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Subscription Details */}
        <div className="space-y-4">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div>
              <p className="text-sm text-gray-500 mb-1">Expiry Date</p>
              <p className="text-sm font-medium text-gray-900">
                {licenseData.expiryDate}
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <div>
              <p className="text-sm text-gray-500 mb-1">Module</p>
              <p className="text-sm font-medium text-gray-900">
                {licenseData.module}
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
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            <div>
              <p className="text-sm text-gray-500 mb-1">Payment Mode</p>
              <p className="text-sm font-medium text-gray-900">
                {licenseData.paymentMode}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-200">
        <button
          onClick={() => {
            setIsEditingKey(true);
            setKeyInput("");
          }}
          className="inline-flex items-center justify-center px-4 py-2 border border-blue-300 rounded-lg text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
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
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
            />
          </svg>
          Activate License
        </button>
        <button
          onClick={handleCopyKey}
          className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
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
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Copy Key
        </button>
        <button
          onClick={onRenewLicense}
          className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Renew License
        </button>
        <button
          onClick={onUpgradePlan}
          className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
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
              d="M7 11l5-5m0 0l5 5m-5-5v12"
            />
          </svg>
          Upgrade Plan
        </button>
      </div>

      {/* Bottom Info */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center text-sm text-gray-600 mb-2">
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Last Renewed: {licenseData.lastRenewed}
        </div>
        <p className="text-xs text-gray-500">
          You'll receive a renewal reminder 15 days before expiry.
        </p>
      </div>
    </div>
  );
};

export default LicenseSubscription;
