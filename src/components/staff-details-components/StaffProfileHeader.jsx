import React, { useState } from "react";

/**
 * Staff Profile Header Component
 * Displays staff profile picture, name, role, status, and action buttons
 * Supports editing mode for basic information
 */
const StaffProfileHeader = ({
  staffData = {
    name: "Alex Johnson",
    staffId: "ST1021",
    role: "Cashier",
    status: "Active",
    joinDate: "March 15, 2023",
    shift: "10:00 AM - 6:00 PM",
    profilePicture:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  onSendMessage,
  // onEdit, // Unused prop
  onMoreOptions,
  onDataChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(staffData);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle save changes
  const handleSave = () => {
    if (onDataChange) {
      onDataChange(editData);
    }
    setIsEditing(false);
  };

  // Handle cancel edit
  const handleCancel = () => {
    setEditData(staffData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        {/* Profile Section */}
        <div className="flex flex-col sm:flex-row items-start gap-4">
          {/* Profile Picture */}
          <div className="relative">
            <img
              src={staffData.profilePicture}
              alt={staffData.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
            />
            {/* Active Status Indicator */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <svg
                className="w-3 h-3 text-white"
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

          {/* Staff Information */}
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-blue-500 focus:outline-none focus:border-blue-600"
                />

                <div className="flex flex-wrap gap-2">
                  <select
                    value={editData.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Cashier">Cashier</option>
                    <option value="Waiter">Waiter</option>
                    <option value="Chef">Chef</option>
                    <option value="Manager">Manager</option>
                    <option value="Host">Host</option>
                  </select>

                  <select
                    value={editData.status}
                    onChange={(e) =>
                      handleInputChange("status", e.target.value)
                    }
                    className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-gray-500">Staff ID</label>
                    <input
                      type="text"
                      value={editData.staffId}
                      onChange={(e) =>
                        handleInputChange("staffId", e.target.value)
                      }
                      className="w-full text-sm text-gray-600 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Join Date</label>
                    <input
                      type="date"
                      value={editData.joinDate}
                      onChange={(e) =>
                        handleInputChange("joinDate", e.target.value)
                      }
                      className="w-full text-sm text-gray-600 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Shift</label>
                    <input
                      type="text"
                      value={editData.shift}
                      onChange={(e) =>
                        handleInputChange("shift", e.target.value)
                      }
                      className="w-full text-sm text-gray-600 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {staffData.name}
                </h1>

                {/* Role and Status Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {staffData.role}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    {staffData.status}
                  </span>
                </div>

                {/* Staff Details */}
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Staff ID:</span>{" "}
                    {staffData.staffId}
                  </p>
                  <p>
                    <span className="font-medium">Joined:</span>{" "}
                    {staffData.joinDate}
                  </p>
                  <p>
                    <span className="font-medium">Shift:</span>{" "}
                    {staffData.shift}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Save
              </button>

              <button
                onClick={handleCancel}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onSendMessage}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Send Message
              </button>

              <button
                onClick={() => setIsEditing(true)}
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit
              </button>

              <button
                onClick={onMoreOptions}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffProfileHeader;
