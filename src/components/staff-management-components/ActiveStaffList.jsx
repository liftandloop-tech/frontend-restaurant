import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllStaff, formatStaffList, getStatusDisplayInfo } from "../../utils/staff";
import { LuUser } from "react-icons/lu";

/**
 * Active Staff List component with search, filter, and table
 * Shows staff members with their roles, shifts, status, and actions
 */
// const ActiveStaffList = ({ refreshTrigger = 0 }) => {
const ActiveStaffList = ({ refreshTrigger = 0, onEdit, onManagePermissions }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [currentPage, setCurrentPage] = useState(1);
  const [staffData, setStaffData] = useState([]);  //new
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch staff data from API
  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = {
          page: currentPage,
          limit: 10,
          search: searchTerm,
          role: selectedRole === "All Roles" ? undefined : selectedRole,
          isActive: 'true', // Only show active staff by default (as string)
          sortBy: 'createdAt',
          sortOrder: 'desc'
        };

        console.log('ActiveStaffList - API call params:', params);
        const response = await getAllStaff(params);
        console.log('ActiveStaffList - API response:', {
          success: response.success,
          data: response.data,
          staffCount: response.data?.staff?.length || 0,
          totalItems: response.data?.pagination?.totalItems || 0
        });

        const formattedStaff = formatStaffList(response.data.staff || []);
        console.log('ActiveStaffList - Formatted staff:', formattedStaff.length);

        setStaffData(formattedStaff);
        setTotalPages(response.data.pagination?.totalPages || 1);
        setTotalItems(response.data.pagination?.totalItems || 0);
      } catch (err) {
        console.error('Error fetching staff data:', err);
        setError('Failed to load staff data. Please try again.');
        setStaffData([]);
      } finally {
        setLoading(false);
      }
    };

    //   fetchStaffData();
    // }, [currentPage, searchTerm, selectedRole, refreshTrigger]);
    fetchStaffData();
  }, [currentPage, searchTerm, selectedRole, refreshTrigger])

  const getRoleColor = (role) => {
    const colors = {
      'Admin': 'bg-red-100 text-red-700',
      'Manager': 'bg-purple-100 text-purple-700',
      'Waiter': 'bg-blue-100 text-blue-700',
      'Cashier': 'bg-green-100 text-green-700',
      'Kitchen': 'bg-orange-100 text-orange-700',
      'Bar': 'bg-indigo-100 text-indigo-700',
      'Owner': 'bg-yellow-100 text-yellow-700',
      'Delivery': 'bg-pink-100 text-pink-700'
    };
    return colors[role] || 'bg-gray-100 text-gray-700';
  };

  const handleViewStaff = (staffId) => {
    console.log("View staff:", staffId);
    navigate(`/staff-details/${staffId}`);
  };

  const handleEditStaff = (staffId) => {
    console.log("Edit staff:", staffId);
    if (onEdit) {
      const staff = staffData.find(s => s._id === staffId);
      if (staff) onEdit(staff);
    }
  };

  const handleManagePermissions = (staffId) => {
    console.log("Manage permissions:", staffId);
    if (onManagePermissions) {
      const staff = staffData.find(s => s._id === staffId);
      if (staff) onManagePermissions(staff);
    }
  };

  const formatShift = (shiftStart, shiftEnd) => {
    if (!shiftStart || !shiftEnd) return "Not set";
    return `${shiftStart} - ${shiftEnd}`;
  };

  const roles = [
    "All Roles",
    "Owner",
    "Admin",
    "Manager",
    "Cashier",
    "Waiter",
    "Kitchen",
    "Bar",
    "Delivery"
  ];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            Active Staff List
          </h3>
          <p className="text-sm text-gray-500 mt-1">Manage and monitor your current on-duty team.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Role Filter */}
          <div className="relative w-full sm:w-48">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer transition-all"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search by name, ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Staff
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Role
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Shift
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Last Login
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="py-8 px-4 text-center">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-3 text-gray-500">Loading staff data...</span>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="6" className="py-8 px-4 text-center">
                  <div className="text-red-500">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>{error}</p>
                  </div>
                </td>
              </tr>
            ) : staffData.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-8 px-4 text-center">
                  <div className="text-gray-500">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p>No staff members found</p>
                  </div>
                </td>
              </tr>
            ) : (
              staffData.map((staff) => {
                const statusInfo = getStatusDisplayInfo(staff.isActive);
                return (
                  <tr
                    key={staff._id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 overflow-hidden shadow-inner">
                          {staff.profilePicture ? (
                            <img src={staff.profilePicture} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <LuUser className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">
                            {staff.displayName}
                          </div>
                          <div className="text-xs text-gray-500 font-medium">{staff.email || staff.phoneNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-lg ${getRoleColor(staff.role)}`}
                      >
                        {staff.role}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm font-semibold text-gray-700">
                      {formatShift(staff.shiftStart, staff.shiftEnd)}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg ${statusInfo.bgColor} ${statusInfo.textColor}`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${staff.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                        {statusInfo.text}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm font-medium text-gray-500">
                      {staff.formattedLastLogin || 'Never'}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleViewStaff(staff._id)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-150"
                          title="View"
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
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleEditStaff(staff._id)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-150"
                          title="Edit"
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleManagePermissions(staff._id)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-150"
                          title="Permissions"
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
                              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 space-y-4 sm:space-y-0">
        <div className="text-sm text-gray-700">
          Showing {staffData.length > 0 ? ((currentPage - 1) * 10) + 1 : 0}-{Math.min(currentPage * 10, totalItems)} of {totalItems} staff
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1 || loading}
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
          >
            Previous
          </button>

          {/* Dynamic page buttons */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
            if (pageNum > totalPages) return null;

            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                disabled={loading}
                className={`px-3 py-1 text-sm rounded transition-colors duration-150 ${currentPage === pageNum
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 hover:bg-gray-50"
                  }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages || loading}
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
          >
            Next
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Last updated 5 min ago • Data auto-refresh every 10 min
        </p>
      </div>
    </div>
  );
};

export default ActiveStaffList;
