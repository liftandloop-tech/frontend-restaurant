import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Header,
  KeyMetricsCards,
  AttendanceOverview,
  ActiveStaffList,
  TeamPerformance,
} from "./components/staff-management-components";
import AddStaff from "./AddStaff";
import { registerStaff, updateStaff } from "./utils/staff";

/**
 * Main Staff Management component
 * Displays comprehensive staff management dashboard with metrics, attendance, and performance data
 */
const StaffManagement = () => {
  // Navigation hook for routing
  const navigate = useNavigate();

  // State for AddStaff modal
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  // State to trigger staff list refresh
  // const [refreshTrigger, setRefreshTrigger] = useState(0);
  //state to trigger staff list refresh
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Handler functions for action buttons
  const handleProcessBulkPayment = () => {
    console.log("Redirecting to payroll management...");
    // Navigate to payroll management page
    navigate("/payroll-management");
  };

  const handleAddNewStaff = () => {
    setEditingStaff(null);
    setIsAddStaffModalOpen(true);
  };

  const handleEditStaffAction = (staff) => {
    setEditingStaff(staff);
    setIsAddStaffModalOpen(true);
  };

  // Function to refresh staff list
  // const refreshStaffList = () => {
  //   setRefreshTrigger(prev => prev + 1);
  // };
  //function to refresh staff list
  const refreshStaffList = () => {
    console.log('StaffManagement - Refreshing staff list, trigger:', refreshTrigger + 1);
    setRefreshTrigger(prev => prev + 1);
  };
  // Handle staff submission from AddStaff modal
  const handleStaffSubmit = async (staffData) => {  //new
    try {

      //Debug: log the incoming staffData
      console.log('staff data recieved:', staffData);
      console.log('gender value:', staffData.gender)
      // Prepare the staff data for API submission
      const apiData = {
        fullName: staffData.fullName,
        phoneNumber: staffData.phoneNumber,
        email: staffData.email || null,
        username: staffData.username || null,
        password: staffData.temporaryPassword || staffData.password,
        role: staffData.role,
        profilePicture: staffData.profilePicture || null,
        dateOfJoining: staffData.dateOfJoining ? new Date(staffData.dateOfJoining).toISOString() : new Date().toISOString(),
        gender: (staffData.gender && staffData.gender !== 'gender') ? staffData.gender : null,
        branch: staffData.branch || null,
        supervisor: staffData.supervisor && staffData.supervisor !== '' ? staffData.supervisor : null,
        shiftStart: staffData.shiftStart || null,
        shiftEnd: staffData.shiftEnd || null,
        autoAddToAttendance: staffData.autoAddToAttendance,
        baseSalary: staffData.baseSalary ? parseFloat(staffData.baseSalary) : 0,
        paymentMode: staffData.paymentMode || 'Bank Transfer',
        tipCommissionEligible: staffData.tipCommissionEligible,
        bankName: staffData.bankName || null,
        ifscCode: staffData.ifscCode || null,
        accountNumber: staffData.accountNumber || null,
        internalNotes: staffData.internalNotes || null,
      };

      // Debug: Check authentication status
      console.log('Auth token exists:', !!localStorage.getItem('authToken'));
      console.log('User data:', localStorage.getItem('userData'));


      // Check if we are updating or creating
      let response;
      if (editingStaff) {
        console.log('StaffManagement - Updating staff member:', editingStaff._id);
        // Call update API
        // Note: password might be empty if not changed, API should handle it
        response = await updateStaff(editingStaff._id, apiData);
        console.log("StaffManagement - Staff member updated successfully:", response);
        alert("Staff member updated successfully!");
      } else {
        // Call the API to register the staff member
        console.log('StaffManagement - Sending API request to register staff...');
        console.log('StaffManagement - Request data:', apiData);
        response = await registerStaff(apiData);
        console.log("StaffManagement - Staff member registered successfully:", response);
        alert("Staff member added successfully!");
      }

      // Close the modal
      setIsAddStaffModalOpen(false);
      setEditingStaff(null);

      //refresh the staff list to show the new staff member
      refreshStaffList();

    } catch (error) {
      console.error("Error saving staff member:", error);
      alert(`Failed to save staff member: ${error.response?.data?.message || error.message}`);
    }
  };//new end

  // Handle closing the AddStaff modal
  const handleCloseAddStaffModal = () => {
    setIsAddStaffModalOpen(false);
  };

  return (
    <div className="p-8">
      {/* Main Container */}
      <div className="max-w-[1600px] mx-auto">
        {/* Header Section */}
        <Header
          onProcessBulkPayment={handleProcessBulkPayment}
          onAddNewStaff={handleAddNewStaff}
        />

        <div className="grid grid-cols-1 gap-8">
          {/* Key Metrics Cards */}
          <KeyMetricsCards />

          {/* Attendance Overview and Team Performance in a grid if needed, or stack */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <AttendanceOverview />
            <TeamPerformance />
          </div>

          {/* Active Staff List - Full Width */}
          <ActiveStaffList
            refreshTrigger={refreshTrigger}
            onEdit={handleEditStaffAction}
          />
        </div>
      </div>

      {/* AddStaff Modal */}
      <AddStaff
        isOpen={isAddStaffModalOpen}
        onClose={handleCloseAddStaffModal}
        onSubmit={handleStaffSubmit}
        initialData={editingStaff}
      />
    </div>
  );
};

export default StaffManagement;
