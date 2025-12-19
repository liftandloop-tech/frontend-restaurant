import { useState } from "react";

/**
 * LoginCredentials Component
 *
 * Handles login credentials setup including:
 * - Username (manually entered, must be unique)
 * - Temporary password with refresh functionality
 * - Send credentials via SMS/Email checkbox
 * - Helper text for password reset instructions
 */
const LoginCredentials = ({
  formData,
  onInputChange,
  onCheckboxChange,
  onPasswordRefresh,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Generate a random password
  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  // Handle password refresh
  const handlePasswordRefresh = () => {
    const newPassword = generatePassword();
    onInputChange({
      target: {
        name: "temporaryPassword",
        value: newPassword,
      },
    });
    if (onPasswordRefresh) {
      onPasswordRefresh(newPassword);
    }
  };

  // Handle username change
  const handleUsernameChange = (e) => {
    onInputChange(e);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Login Credentials
        </h3>
        <p className="text-sm text-gray-600">
          Set up login access for the staff member
        </p>
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username || ""}
            onChange={handleUsernameChange}
            placeholder="Enter unique username"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          />
          <p className="text-xs text-gray-500 mt-1">
            Must be unique. Used for login along with password.
          </p>
        </div>

        {/* Temporary Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Temporary Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="temporaryPassword"
              value={formData.temporaryPassword || ""}
              onChange={onInputChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 pr-20 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
              {/* Show/Hide Password Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>

              {/* Refresh Password Button */}
              <button
                type="button"
                onClick={handlePasswordRefresh}
                className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                title="Generate new password"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Send Credentials Checkbox */}
        <div className="md:col-span-2">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="sendCredentials"
              checked={formData.sendCredentials || false}
              onChange={onCheckboxChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">
                Send credentials via SMS/Email
              </span>
              <p className="text-xs text-gray-500 mt-1">
                Staff will be prompted to set a new password on first login.
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default LoginCredentials;
