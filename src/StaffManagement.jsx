import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Header,
  KeyMetricsCards,
  AttendanceOverview,
  ActiveStaffList,
  TeamPerformance,
} from "./components/staff-management-components";
import AddStaff from "./AddStaff";
import { useRegisterStaffMutation, useUpdateStaffMutation } from "./features/staff/staffApiSlice";
import { fetchCurrentUserProfile } from "./utils/auth";

/**
 * Main Staff Management component
 * Displays comprehensive staff management dashboard with metrics, attendance, and performance data
 */
const StaffManagement = () => {
  // Navigation hook for routing
  const navigate = useNavigate();

  // RTK Query mutations
  const [registerStaff] = useRegisterStaffMutation();
  const [updateStaff] = useUpdateStaffMutation();

  // State for AddStaff modal
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  // State to trigger staff list refresh (kept for compatibility, though RTK Query invalidation should handle updates)
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
  const refreshStaffList = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Check and recover user context on mount
  useEffect(() => {
    const checkContext = async () => {
      const userDataStr = localStorage.getItem('userData');
      if (userDataStr) {
        try {
          const userData = JSON.parse(userDataStr);
          if (!userData.restaurantId) {
            console.log("Restaurant ID missing in storage, fetching profile...");
            await fetchCurrentUserProfile();
          }
        } catch (e) {
          console.error("Error parsing user data:", e);
        }
      } else {
        // No user data? Try to fetch it.
        await fetchCurrentUserProfile();
      }
    };
    checkContext();
  }, []);

  // Handle staff submission from AddStaff modal
  const handleStaffSubmit = async (staffData) => {  //new
    try {
      // Get user data from localStorage to get restaurantId
      const userDataStr = localStorage.getItem('userData');
      let restaurantId = null;
      let createdBy = null;

      if (userDataStr) {
        try {
          const userData = JSON.parse(userDataStr);
          restaurantId = userData.restaurantId;
          createdBy = userData._id;
        } catch (e) {
          console.error("Error parsing user data:", e);
        }
      }

      if (!restaurantId) {
        // Prepare recovery attempt
        console.log("Restaurant ID missing, attempting recovery...");
        try {
          const updatedProfile = await fetchCurrentUserProfile();
          if (updatedProfile && updatedProfile.restaurantId) {
            restaurantId = updatedProfile.restaurantId;
            createdBy = updatedProfile._id || updatedProfile.id;
            console.log("Context recovered successfully");
          }
        } catch (err) {
          console.error("Failed to recover profile context:", err);
        }
      }

      if (!restaurantId) {
        alert("Session Context Error: Could not determine restaurant details. Please log out and log back in to refresh your session.");
        return;
      }

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
        autoAddToAttendance: staffData.autoAddToAttendance || false,
        baseSalary: staffData.baseSalary !== "" && staffData.baseSalary !== null && staffData.baseSalary !== undefined ? parseFloat(staffData.baseSalary) : 0,
        paymentMode: staffData.paymentMode || 'Bank Transfer',
        tipCommissionEligible: staffData.tipCommissionEligible || false,
        bankName: staffData.bankName || null,
        ifscCode: staffData.ifscCode || null,
        accountNumber: staffData.accountNumber || null,
        internalNotes: staffData.internalNotes || null,
        restaurantId: restaurantId,
        createdBy: createdBy
      };

      // Check if we are updating or creating
      if (editingStaff) {
        // Call update mutation
        await updateStaff({ staffId: editingStaff._id, ...apiData }).unwrap();
        alert("Staff member updated successfully!");
      } else {
        // Call register mutation
        await registerStaff(apiData).unwrap();
        alert("Staff member added successfully!");
      }

      // Close the modal
      setIsAddStaffModalOpen(false);
      setEditingStaff(null);

      // Refresh list (optional if cache invalidation works)
      refreshStaffList();

    } catch (error) {
      console.error("Error saving staff member:", error);
      let errorMessage = error.data?.message || error.message || "Unknown error";

      // Append detailed validation errors if available
      if (error.data?.errors && Array.isArray(error.data.errors)) {
        const details = error.data.errors.map(err => `${err.field}: ${err.message}`).join('\n');
        errorMessage += `\n\nDetails:\n${details}`;
      }

      alert(`Failed to save staff member: ${errorMessage}`);
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
