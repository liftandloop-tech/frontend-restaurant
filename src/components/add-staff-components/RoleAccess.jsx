import React, { useState, useEffect } from "react";
import { getAllStaff } from "../../utils/staff";

/**
 * RoleAccess Component
 *
 * Handles role and access management including:
 * - Role selection with helper text
 * - Branch/Location selection
 * - Supervisor assignment
 * - Shift timing (start and end time)
 * - Auto-add to attendance roster checkbox
 */
const RoleAccess = ({ formData, onInputChange, onCheckboxChange }) => {
  const [supervisors, setSupervisors] = useState([]);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        // Fetch managers to populate supervisor list
        const response = await getAllStaff({ role: 'Manager', isActive: 'true' });
        if (response.success && response.data?.staff) {
          const managers = response.data.staff.map(manager => ({
            value: manager._id,
            label: manager.fullName
          }));
          setSupervisors(managers);
        }
      } catch (error) {
        console.error("Error fetching supervisors:", error);
      }
    };
    fetchManagers();
  }, []);

  // Sample data - in real app, this would come from props or API
  const roles = [
    {
      value: "Manager",
      label: "Manager",
      description: "Manages order processing and payments",
    },
    {
      value: "Waiter",
      label: "Waiter",
      description: "Serves customers and takes orders",
    },
    {
      value: "Kitchen",
      label: "Kitchen",
      description: "Prepares food and manages kitchen",
    },
    {
      value: "Cashier",
      label: "Cashier",
      description: "Handles payments and billing",
    },
    {
      value: "Bar",
      label: "Bar",
      description: "Manages drink orders and inventory",
    },
    {
      value: "Admin",
      label: "Admin",
      description: "Administration accesss and system management",
    },
    {
      value: "Owner",
      label: "Owner",
      description: "Full system control and restaurant ownership",
    },
    {
      value: "Delivery",
      label: "Delivery",
      description: "Handles off-site deliveries and transport",
    },
  ];

  const branches = [
    { value: "main", label: "Main Branch" },
    { value: "downtown", label: "Downtown Branch" },
    { value: "mall", label: "Mall Branch" },
  ];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Role & Access
        </h3>
        <p className="text-sm text-gray-600">
          Define the staff member's role and access permissions
        </p>
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Role Selection */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              name="role"
              value={formData.role || ""}
              onChange={onInputChange}
              className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              required
            >
              <option value="">Select role</option>
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {/* Helper Text */}
          {formData.role && (
            <p className="text-xs text-gray-500 mt-1">
              {roles.find((r) => r.value === formData.role)?.description}
            </p>
          )}
        </div>

        {/* Branch/Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Branch / Location
          </label>
          <div className="relative">
            <select
              name="branch"
              value={formData.branch || ""}
              onChange={onInputChange}
              className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            >
              <option value="">Select branch</option>
              {branches.map((branch) => (
                <option key={branch.value} value={branch.value}>
                  {branch.label}
                </option>
              ))}
            </select>
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Assign Supervisor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assign Supervisor
          </label>
          <div className="relative">
            <select
              name="supervisor"
              value={formData.supervisor || ""}
              onChange={onInputChange}
              className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            >
              <option value="">Select supervisor</option>
              {supervisors.map((supervisor) => (
                <option key={supervisor.value} value={supervisor.value}>
                  {supervisor.label}
                </option>
              ))}
            </select>
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Shift Timing */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Shift Timing
          </label>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="time"
                name="shiftStart"
                value={formData.shiftStart || ""}
                onChange={onInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
            </div>
            <span className="text-sm text-gray-500 font-medium">to</span>
            <div className="flex-1 relative">
              <input
                type="time"
                name="shiftEnd"
                value={formData.shiftEnd || ""}
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Auto-add to Attendance Roster */}
        <div className="md:col-span-2">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="autoAddToAttendance"
              checked={formData.autoAddToAttendance || false}
              onChange={onCheckboxChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <span className="text-sm font-medium text-gray-700">
              Auto-add to Attendance Roster
            </span>
          </label>
          <p className="text-xs text-gray-500 mt-1 ml-7">
            Automatically include this staff member in daily attendance tracking
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleAccess;
