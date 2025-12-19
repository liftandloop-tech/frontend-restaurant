import React, { useState } from "react";
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

/**
 * Main PayrollManagement component
 * Displays comprehensive payroll management dashboard with staff payroll table,
 * metrics, expense breakdown, and bulk payment functionality
 */
const PayrollManagement = () => {
  // State for managing selected staff members
  const [selectedStaff, setSelectedStaff] = useState([]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto flex gap-8 flex-col px-4 sm:px-6 lg:px-8 py-8 pt-10">
        {/* Header Section */}
        <Header />

        {/* Filter Bar */}
        <FilterBar />

        {/* Key Metrics Cards */}
        <KeyMetricsCards />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Left Column - Main Content (3/4 width on large screens) */}
          <div className="lg:col-span-3">
            {/* Staff Payroll Table */}
            <StaffPayrollTable
              selectedStaff={selectedStaff}
              onStaffSelection={handleStaffSelection}
              onSelectAll={handleSelectAll}
            />

            {/* Action Bar */}
            <ActionBar
              selectedCount={selectedStaff.length}
              totalAmount={
                selectedStaff.length > 0
                  ? selectedStaff.reduce((sum, id) => {
                      // Calculate total amount based on selected staff
                      // In a real app, this would come from the actual staff data
                      const staffData = [
                        { id: 1, finalPay: 27000 },
                        { id: 2, finalPay: 21000 },
                        { id: 3, finalPay: 16800 },
                        { id: 4, finalPay: 16800 },
                      ];
                      const staff = staffData.find((s) => s.id === id);
                      return sum + (staff ? staff.finalPay : 0);
                    }, 0)
                  : 0
              }
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
