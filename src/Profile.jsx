import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertBanner,
  BusinessProfileHeader,
  OwnerInformation,
  BusinessInformation,
  LicenseSubscription,
  AccountSecurity,
  RecentActivityLog,
  ActionButtons,
  EditProfileModal,
  ChangePasswordModal,
} from "./components/profile-components";

/**
 * Profile Page Component
 * Main component for displaying and managing business profile information
 */
const Profile = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Load data from localStorage or use defaults
  const loadDataFromStorage = () => {
    const storedOwner = localStorage.getItem("profileOwnerData");
    const storedBusiness = localStorage.getItem("profileBusinessData");
    const storedLicense = localStorage.getItem("profileLicenseData");
    const storedAccount = localStorage.getItem("profileAccountData");
    const storedActivities = localStorage.getItem("profileActivities");

    return {
      owner: storedOwner ? JSON.parse(storedOwner) : getDefaultOwnerData(),
      business: storedBusiness
        ? JSON.parse(storedBusiness)
        : getDefaultBusinessData(),
      license: storedLicense
        ? JSON.parse(storedLicense)
        : getDefaultLicenseData(),
      account: storedAccount
        ? JSON.parse(storedAccount)
        : getDefaultAccountData(),
      activities: storedActivities
        ? JSON.parse(storedActivities)
        : getDefaultActivities(),
    };
  };

  const getDefaultOwnerData = () => ({
    name: "Ishan Bhagat",
    role: "Business Owner",
    joinedOn: "12 Jan 2024",
    status: "Active",
    profilePicture: "https://i.pravatar.cc/150?img=12",
    gender: "Male",
    contact: "+91 98765 43210",
    email: "ishan@example.com",
    address: "201, Royal Enclave, Indore, MP 452001",
    city: "Indore",
    dateOfBirth: "12 May 1996",
    alternate: "+91 98765 67890",
    state: "Madhya Pradesh",
  });

  const getDefaultBusinessData = () => ({
    businessName: "Rayonner Salon",
    gstRegNo: "23AABCR2321K1Z",
    workingHours: "10:00 AM - 9:00 PM",
    manager: "Neha Sharma",
    businessType: "Salon",
    businessEmail: "contact@rayonner.com",
    weeklyOff: "Monday",
    branchCount: "3 Active Locations",
    businessPhone: "+91 91234 56789",
    dailyOrders: "50+",
  });

  const getDefaultLicenseData = () => ({
    licenseKey: "QXP-2025-RST-4ZL2",
    plan: "Premium Annual Plan",
    status: "Expiring Soon",
    renewalType: "Annual",
    autoRenew: "Enabled",
    expiryDate: "31 Dec 2025",
    module: "Salon POS",
    paymentMode: "Card ending 8732",
    lastRenewed: "01 Jan 2025",
  });

  const getDefaultAccountData = () => ({
    userId: "ishan.owner@quickxpos.com",
    passwordLastUpdated: "08 Oct 2025",
  });

  const getDefaultActivities = () => [
    {
      date: "09 Oct 2025",
      activity: "Renewed License",
      module: "License",
      moduleColor: "bg-purple-100 text-purple-800",
    },
    {
      date: "08 Oct 2025",
      activity: "Added Staff Member",
      module: "Staff",
      moduleColor: "bg-green-100 text-green-800",
    },
    {
      date: "07 Oct 2025",
      activity: "Updated Plan",
      module: "Billing",
      moduleColor: "bg-pink-100 text-pink-800",
    },
    {
      date: "06 Oct 2025",
      activity: "Created Offer",
      module: "Promotions",
      moduleColor: "bg-orange-100 text-orange-800",
    },
    {
      date: "05 Oct 2025",
      activity: "Added Vendor",
      module: "Inventory",
      moduleColor: "bg-indigo-100 text-indigo-800",
    },
    {
      date: "04 Oct 2025",
      activity: "Changed Password",
      module: "Security",
      moduleColor: "bg-red-100 text-red-800",
    },
  ];

  const [profileData, setProfileData] = useState(loadDataFromStorage());

  // Load data on mount
  useEffect(() => {
    const data = loadDataFromStorage();
    setProfileData(data);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (profileData) {
      localStorage.setItem(
        "profileOwnerData",
        JSON.stringify(profileData.owner)
      );
      localStorage.setItem(
        "profileBusinessData",
        JSON.stringify(profileData.business)
      );
      localStorage.setItem(
        "profileLicenseData",
        JSON.stringify(profileData.license)
      );
      localStorage.setItem(
        "profileAccountData",
        JSON.stringify(profileData.account)
      );
      localStorage.setItem(
        "profileActivities",
        JSON.stringify(profileData.activities)
      );
    }
  }, [profileData]);

  // Event handlers
  const handleEditInfo = () => {
    setIsEditModalOpen(true);
  };

  const handleChangePassword = () => {
    setIsPasswordModalOpen(true);
  };

  const handleSaveProfile = (formData) => {
    setProfileData((prev) => ({
      ...prev,
      owner: formData.owner,
      business: formData.business,
    }));
    setHasChanges(true);
    addActivity("Updated Profile Information", "Security");
    showNotification("Profile information updated successfully!", "success");
  };

  const handleSavePassword = (passwordData) => {
    // Update password last updated date
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    setProfileData((prev) => ({
      ...prev,
      account: {
        ...prev.account,
        passwordLastUpdated: formattedDate,
      },
    }));
    addActivity("Changed Password", "Security");
    showNotification("Password changed successfully!", "success");
  };

  const handleManageBranches = () => {
    // Navigate to branches management page (if exists) or show alert
    const hasBranchesPage = false; // Set to true if you have a branches page
    if (hasBranchesPage) {
      navigate("/branches");
    } else {
      showNotification("Branches management feature coming soon!", "info");
    }
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(profileData.license.licenseKey);
    showNotification("License key copied to clipboard!", "success");
  };

  const handleRenewLicense = () => {
    // Simulate license renewal
    const confirmRenew = window.confirm(
      "Are you sure you want to renew your license? This will process a payment."
    );
    if (confirmRenew) {
      // Update license expiry date
      const newExpiryDate = new Date();
      newExpiryDate.setFullYear(newExpiryDate.getFullYear() + 1);
      const formattedDate = newExpiryDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      setProfileData((prev) => ({
        ...prev,
        license: {
          ...prev.license,
          expiryDate: formattedDate,
          status: "Active",
          lastRenewed: new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        },
      }));
      addActivity("Renewed License", "License");
      showNotification("License renewed successfully!", "success");
    }
  };

  const handleUpgradePlan = () => {
    showNotification("Plan upgrade feature coming soon!", "info");
  };

  const handleViewAllLogs = () => {
    // Navigate to full activity logs page (if exists) or show alert
    const hasLogsPage = false; // Set to true if you have a logs page
    if (hasLogsPage) {
      navigate("/activity-logs");
    } else {
      showNotification("Full activity logs feature coming soon!", "info");
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      const confirmCancel = window.confirm(
        "You have unsaved changes. Are you sure you want to cancel?"
      );
      if (!confirmCancel) return;
    }
    navigate(-1);
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Save all changes to localStorage (already done in useEffect)
      setHasChanges(false);
      showNotification("All changes saved successfully!", "success");
    } catch (error) {
      console.error("Error saving changes:", error);
      showNotification("Error saving changes. Please try again.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const addActivity = (activity, module) => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const moduleColors = {
      License: "bg-purple-100 text-purple-800",
      Staff: "bg-green-100 text-green-800",
      Billing: "bg-pink-100 text-pink-800",
      Promotions: "bg-orange-100 text-orange-800",
      Inventory: "bg-indigo-100 text-indigo-800",
      Security: "bg-red-100 text-red-800",
    };

    const newActivity = {
      date: formattedDate,
      activity,
      module,
      moduleColor: moduleColors[module] || "bg-gray-100 text-gray-800",
    };

    setProfileData((prev) => ({
      ...prev,
      activities: [newActivity, ...prev.activities.slice(0, 9)], // Keep last 10 activities
    }));
  };

  const showNotification = (message, type = "success") => {
    // Create a simple notification
    const notification = document.createElement("div");
    notification.className = `fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
      type === "success"
        ? "bg-green-500 text-white"
        : type === "error"
        ? "bg-red-500 text-white"
        : "bg-blue-500 text-white"
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transition = "opacity 0.3s";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alert Banner */}
        <AlertBanner daysRemaining={5} />

        {/* Business Profile Header */}
        <BusinessProfileHeader
          onEditInfo={handleEditInfo}
          onChangePassword={handleChangePassword}
        />

        {/* Owner Information */}
        <OwnerInformation ownerData={profileData.owner} />

        {/* Business Information */}
        <BusinessInformation
          businessData={profileData.business}
          onManageBranches={handleManageBranches}
        />

        {/* License & Subscription Information */}
        <LicenseSubscription
          licenseData={profileData.license}
          onCopyKey={handleCopyKey}
          onRenewLicense={handleRenewLicense}
          onUpgradePlan={handleUpgradePlan}
        />

        {/* Account & Security */}
        <AccountSecurity
          accountData={profileData.account}
          onChangePassword={handleChangePassword}
        />

        {/* Recent Activity Log */}
        <RecentActivityLog
          activities={profileData.activities}
          onViewAllLogs={handleViewAllLogs}
        />

        {/* Action Buttons */}
        <ActionButtons
          onCancel={handleCancel}
          onSaveChanges={handleSaveChanges}
          isSaving={isSaving}
        />
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        ownerData={profileData.owner}
        businessData={profileData.business}
        onSave={handleSaveProfile}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSave={handleSavePassword}
      />
    </div>
  );
};

export default Profile;
