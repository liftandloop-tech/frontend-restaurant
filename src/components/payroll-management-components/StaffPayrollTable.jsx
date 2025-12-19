import React, { useState } from "react";

/**
 * StaffPayrollTable component displays the main payroll table with staff information
 * Includes checkboxes for selection, staff details, days worked, salary breakdown, and status
 */
const StaffPayrollTable = ({
  selectedStaff,
  onStaffSelection,
  onSelectAll,
}) => {
  // Sample staff data - in a real app, this would come from props or API
  const staffData = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Head Chef",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      days: 22,
      basic: 25000,
      bonus: 2500,
      deductions: 500,
      finalPay: 27000,
      status: "Paid",
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Senior Waiter",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      days: 20,
      basic: 18000,
      bonus: 3200,
      deductions: 200,
      finalPay: 21000,
      status: "Pending",
    },
    {
      id: 3,
      name: "Mike Rodriguez",
      role: "Cashier",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      days: 24,
      basic: 16000,
      bonus: 800,
      deductions: 0,
      finalPay: 16800,
      status: "Processing",
    },
    {
      id: 4,
      name: "Emma Wilson",
      role: "Waiter",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      days: 18,
      basic: 15000,
      bonus: 2100,
      deductions: 300,
      finalPay: 16800,
      status: "Pending",
    },
  ];

  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    onSelectAll(newSelectAll ? staffData.map((staff) => staff.id) : []);
  };

  const handleStaffSelect = (staffId) => {
    const newSelected = selectedStaff.includes(staffId)
      ? selectedStaff.filter((id) => id !== staffId)
      : [...selectedStaff, staffId];

    onStaffSelection(newSelected);
    setSelectAll(newSelected.length === staffData.length);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      Paid: {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      Pending: {
        bg: "bg-orange-100",
        text: "text-orange-800",
        icon: (
          <svg
            className="w-3 h-3"
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
        ),
      },
      Processing: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        icon: (
          <svg
            className="w-3 h-3"
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
        ),
      },
    };

    const config = statusConfig[status] || statusConfig["Pending"];

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {config.icon}
        <span className="ml-1">{status}</span>
      </span>
    );
  };

  const totalSelectedPay = staffData
    .filter((staff) => selectedStaff.includes(staff.id))
    .reduce((sum, staff) => sum + staff.finalPay, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Staff Payroll</h3>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-600">
              {staffData.length} staff
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {/* Empty header for checkbox column */}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Staff
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Days
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Basic
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bonus
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deductions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Final Pay
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {staffData.map((staff) => (
              <tr
                key={staff.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                {/* Checkbox */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedStaff.includes(staff.id)}
                    onChange={() => handleStaffSelect(staff.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </td>

                {/* Staff Info */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={staff.avatar}
                        alt={staff.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {staff.name}
                      </div>
                      <div className="text-sm text-gray-500">{staff.role}</div>
                    </div>
                  </div>
                </td>

                {/* Days */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {staff.days}
                </td>

                {/* Basic */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₹{staff.basic.toLocaleString()}
                </td>

                {/* Bonus */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₹{staff.bonus.toLocaleString()}
                </td>

                {/* Deductions */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₹{staff.deductions.toLocaleString()}
                </td>

                {/* Final Pay */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  ₹{staff.finalPay.toLocaleString()}
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(staff.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      {selectedStaff.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <p className="text-sm font-medium text-gray-900">
            {selectedStaff.length} staff selected Total: ₹
            {totalSelectedPay.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default StaffPayrollTable;
