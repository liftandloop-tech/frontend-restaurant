import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

/**
 * StaffPayrollTable component displays the main payroll table with staff information
 * Includes checkboxes for selection, staff details, days worked, salary breakdown, and status
 */
const StaffPayrollTable = ({
  staffData = [],
  selectedStaff,
  onStaffSelection,
  onSelectAll,
  isLoading
}) => {
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    // Reset select all when staff data changes or selection changes
    if (staffData.length > 0 && selectedStaff.length === staffData.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedStaff, staffData]);

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    if (checked) {
      onSelectAll(staffData.map((staff) => staff._id || staff.id));
    } else {
      onSelectAll([]);
    }
  };

  const handleStaffSelect = (staffId) => {
    const newSelected = selectedStaff.includes(staffId)
      ? selectedStaff.filter((id) => id !== staffId)
      : [...selectedStaff, staffId];

    onStaffSelection(newSelected);
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
    .filter((staff) => selectedStaff.includes(staff._id || staff.id))
    .reduce((sum, staff) => sum + (staff.finalPay || staff.baseSalary || 0), 0);

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading payroll data...</div>;
  }

  if (staffData.length === 0) {
    return <div className="p-8 text-center text-gray-500">No staff members found matching your filters.</div>;
  }

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
            {staffData.map((staff) => {
              const staffId = staff._id || staff.id;
              const basicSalary = staff.baseSalary || 0;
              const bonus = 0; // Placeholder until backend supports bonus
              const deductions = 0; // Placeholder until backend supports deductions
              const finalPay = basicSalary + bonus - deductions;
              const currentStatus = "Pending"; // Placeholder

              return (
                <tr
                  key={staffId}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  {/* Checkbox */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedStaff.includes(staffId)}
                      onChange={() => handleStaffSelect(staffId)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>

                  {/* Staff Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {staff.profilePicture || staff.avatar ? (
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={staff.profilePicture || staff.avatar}
                            alt={staff.fullName || staff.name}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                            {(staff.fullName || staff.name || "?").charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {staff.fullName || staff.name}
                        </div>
                        <div className="text-sm text-gray-500">{staff.role}</div>
                      </div>
                    </div>
                  </td>

                  {/* Days */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {staff.days || 26}
                  </td>

                  {/* Basic */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{basicSalary.toLocaleString()}
                  </td>

                  {/* Bonus */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{bonus.toLocaleString()}
                  </td>

                  {/* Deductions */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{deductions.toLocaleString()}
                  </td>

                  {/* Final Pay */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ₹{finalPay.toLocaleString()}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(staff.status || currentStatus)}
                  </td>
                </tr>
              );
            })}
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

StaffPayrollTable.propTypes = {
  staffData: PropTypes.array,
  selectedStaff: PropTypes.array,
  onStaffSelection: PropTypes.func,
  onSelectAll: PropTypes.func,
  isLoading: PropTypes.bool
};

export default StaffPayrollTable;
