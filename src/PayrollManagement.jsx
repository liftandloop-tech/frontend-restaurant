import React, { useState, useMemo } from "react";
import {
  Header,
  FilterBar,
  KeyMetricsCards,
  StaffPayrollTable,
  ExpenseBreakdown,
  TopEarners,
  DownloadReportButton,
  ActionBar,
} from "./components/payroll-management-components";
import { useGetAllStaffQuery } from "./features/staff/staffApiSlice";

/**
 * Main PayrollManagement component
 * Displays comprehensive payroll management dashboard with staff payroll table,
 * metrics, expense breakdown, and bulk payment functionality
 */
const PayrollManagement = () => {
  // State for managing selected staff members
  const [selectedStaff, setSelectedStaff] = useState([]);

  // State for filters
  const [selectedMonth, setSelectedMonth] = useState("December 2024");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch staff data
  const { data: staffResponse, isLoading } = useGetAllStaffQuery({ isActive: true });
  // The API returns { data: { data: [...], pagination: {...} } }
  const allStaff = staffResponse?.data?.data || [];

  // Filter staff based on interactions
  const filteredStaff = useMemo(() => {
    return allStaff.filter(staff => {
      // Role filter
      if (selectedRole !== "All Roles" && staff.role !== selectedRole) {
        return false;
      }

      // Search filter (name or phone)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const nameMatch = staff.fullName?.toLowerCase().includes(query);
        const phoneMatch = staff.phoneNumber?.includes(query);
        const usernameMatch = staff.username?.toLowerCase().includes(query);
        if (!nameMatch && !phoneMatch && !usernameMatch) {
          return false;
        }
      }

      // Status filter - currently we mocking status, but we can implement logic later
      // For now, if "All Status" is selected, show all.
      // Since status isn't in backend yet, we can't effectively filter by it without mocking it on the fly.
      return true;
    });
  }, [allStaff, selectedRole, searchQuery, selectedStatus]);

  // Handler for staff selection
  const handleStaffSelection = (staffIds) => {
    setSelectedStaff(staffIds);
  };

  // Handler for select all functionality
  const handleSelectAll = (staffIds) => {
    setSelectedStaff(staffIds);
  };

  // Handler for cancel action
  const handleCancel = () => {
    setSelectedStaff([]);
    console.log("Cancelled bulk payment operation");
  };

  // Handler for bulk payment processing
  const handleProcessBulkPayment = () => {
    if (selectedStaff.length === 0) {
      alert("Please select at least one staff member to process payment.");
      return;
    }

    console.log("Processing bulk payment for staff:", selectedStaff);
    // Add bulk payment logic here
    alert(`Processing payment for ${selectedStaff.length} staff members...`);

    // Clear selection after processing
    setSelectedStaff([]);
  };

  // Calculate total amount for selected staff
  const calculateTotalPreview = () => {
    return filteredStaff
      .filter(s => selectedStaff.includes(s._id))
      .reduce((sum, s) => sum + (s.baseSalary || 0), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto flex gap-8 flex-col px-4 sm:px-6 lg:px-8 py-8 pt-10">
        {/* Header Section */}
        <Header />

        {/* Filter Bar */}
        <FilterBar
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Key Metrics Cards */}
        <KeyMetricsCards />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Left Column - Main Content (3/4 width on large screens) */}
          <div className="lg:col-span-3">
            {/* Staff Payroll Table */}
            <StaffPayrollTable
              staffData={filteredStaff}
              selectedStaff={selectedStaff}
              onStaffSelection={handleStaffSelection}
              onSelectAll={handleSelectAll}
              isLoading={isLoading}
            />

            {/* Action Bar */}
            <ActionBar
              selectedCount={selectedStaff.length}
              totalAmount={calculateTotalPreview()}
              onCancel={handleCancel}
              onProcessBulkPayment={handleProcessBulkPayment}
            />
          </div>

          {/* Right Column - Sidebar (1/4 width on large screens) */}
          <div className="space-y-6">
            {/* Expense Breakdown */}
            <ExpenseBreakdown />

            {/* Top Earners */}
            <TopEarners />

            {/* Download Report Button */}
            <DownloadReportButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollManagement;
