import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "./utils/api";
import { fetchCurrentUserProfile } from "./utils/auth";
import { useUpdateProfileMutation, useChangePasswordMutation } from "./features/users/usersApiSlice";
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
  const [isLoading, setIsLoading] = useState(true);

  // Default Data Generators
  const getDefaultOwnerData = () => ({
    name: "Loading...",
    role: "Loading...",
    joinedOn: "...",
    status: "Active",
    profilePicture: "https://i.pravatar.cc/150?img=12",
    gender: "Male",
    contact: "...",
    email: "...",
    address: "...",
    city: "...",
    dateOfBirth: "...",
    alternate: "...",
    state: "...",
  });

  const getDefaultBusinessData = () => ({
    businessName: "Loading...",
    gstRegNo: "...",
    workingHours: "...",
    manager: "...",
    businessType: "Restaurant",
    businessEmail: "...",
    weeklyOff: "...",
    branchCount: "...",
    businessPhone: "...",
    dailyOrders: "...",
  });

  const getDefaultLicenseData = () => ({
    licenseKey: "...",
    plan: "Standard Plan",
    status: "Active",
    renewalType: "Annual",
    autoRenew: "Enabled",
    expiryDate: "...",
    module: "POS",
    paymentMode: "...",
    lastRenewed: "...",
  });

  const getDefaultAccountData = () => ({
    userId: "...",
    passwordLastUpdated: "...",
  });

  const getDefaultActivities = () => [];

  const [profileData, setProfileData] = useState({
    owner: getDefaultOwnerData(),
    business: getDefaultBusinessData(),
    license: getDefaultLicenseData(),
    account: getDefaultAccountData(),
    activities: getDefaultActivities(),
  });

  // Fetch real data on mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        // 1. Fetch User Profile
        const userProfile = await fetchCurrentUserProfile();

        // 2. Fetch Restaurant Details
        let restaurantData = null;
        try {
          const restaurantRes = await api.get('restaurants/my-restaurant');
          if (restaurantRes.success) {
            restaurantData = restaurantRes.data;
          }
        } catch (err) {
          console.warn("Could not fetch restaurant data", err);
        }

        // Map to state
        if (userProfile) {
          setProfileData(prev => ({
            ...prev,
            owner: {
              ...prev.owner,
              name: userProfile.username || userProfile.name || userProfile.email || "N/A", // Prioritize login name (username/name)
              email: userProfile.email || "N/A",
              role: "Admin", // Display as Admin as requested
              contact: userProfile.mobile || "N/A",
              joinedOn: userProfile.createdAt ? new Date(userProfile.createdAt).toLocaleDateString() : "N/A",
            },
            account: {
              ...(prev.account || {}),
              userId: userProfile.email,
              passwordLastUpdated: "N/A"
            }
          }));
        }

        if (restaurantData) {
          setProfileData(prev => ({
            ...prev,
            business: {
              businessName: restaurantData.name || "N/A",
              gstRegNo: restaurantData.licenseKey || "N/A",
              workingHours: "10:00 AM - 10:00 PM",
              businessEmail: restaurantData.email || "N/A",
              businessPhone: restaurantData.phone || "N/A",
              city: restaurantData.address?.city || "N/A",
              businessType: "Restaurant",
              branchCount: "1",
              manager: "N/A"
            },
            license: {
              ...(prev.license || {}),
              licenseKey: restaurantData.licenseKey || "N/A",
              expiryDate: restaurantData.licenseExpiryDate || "...",
              status: restaurantData.isActive ? "Active" : "Inactive"
            }
          }));
        }

      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const [updateProfileApi] = useUpdateProfileMutation();
  const [changePasswordApi] = useChangePasswordMutation();

  // Event handlers
  const handleEditInfo = () => {
    setIsEditModalOpen(true);
  };

  const handleChangePassword = () => {
    setIsPasswordModalOpen(true);
  };

  const handleSaveProfile = async (formData) => {
    try {
      // Prepare user update data
      const userUpdateData = {
        name: formData.owner.name,
        email: formData.owner.email,
        mobile: formData.owner.contact
      };

      // Call API to update user profile
      await updateProfileApi(userUpdateData).unwrap();

      // Update local state
      setProfileData((prev) => ({
        ...prev,
        owner: formData.owner,
        business: formData.business,
      }));
      setHasChanges(false);
      addActivity("Updated Profile Information", "Security");
      showNotification("Profile information updated successfully!", "success");
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      showNotification(error?.data?.message || "Failed to update profile", "error");
    }
  };

  const handleSavePassword = async (passwordData) => {
    try {
      await changePasswordApi(passwordData).unwrap();

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
      setIsPasswordModalOpen(false);
    } catch (error) {
      console.error("Failed to change password:", error);
      showNotification(error?.data?.message || "Failed to change password", "error");
    }
  };

  const handleManageBranches = () => {
    showNotification("Branches management feature coming soon!", "info");
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(profileData.license.licenseKey);
    showNotification("License key copied to clipboard!", "success");
  };

  const handleRenewLicense = () => {
    const confirmRenew = window.confirm(
      "Are you sure you want to renew your license? This will process a payment."
    );
    if (confirmRenew) {
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
    showNotification("Full activity logs feature coming soon!", "info");
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (!window.confirm("You have unsaved changes. Are you sure you want to cancel?")) return;
    }
    navigate(-1);
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
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
      activities: [newActivity, ...prev.activities.slice(0, 9)],
    }));
  };

  const showNotification = (message, type = "success") => {
    const notification = document.createElement("div");
    notification.className = `fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${type === "success"
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

  const calculateDaysRemaining = (expiryDate) => {
    if (!expiryDate || expiryDate === "...") return 0;
    const today = new Date();
    // Assuming date format "DD Mon YYYY" or ISO
    const expiry = new Date(expiryDate);
    if (isNaN(expiry.getTime())) return 0; // Invalid date

    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = calculateDaysRemaining(profileData.license.expiryDate);

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {daysRemaining <= 5 && daysRemaining >= 0 && (
          <AlertBanner daysRemaining={daysRemaining} />
        )}

        <BusinessProfileHeader
          onEditInfo={handleEditInfo}
          onChangePassword={handleChangePassword}
        />

        <OwnerInformation ownerData={profileData.owner} />

        <BusinessInformation
          businessData={profileData.business}
          onManageBranches={handleManageBranches}
        />

        <LicenseSubscription
          licenseData={profileData.license}
          onCopyKey={handleCopyKey}
          onRenewLicense={handleRenewLicense}
          onUpgradePlan={handleUpgradePlan}
          onVerifyLicense={async (key) => {
            try {
              const res = await api.post('/license/verify', { licenseKey: key });
              if (res.success) {
                showNotification("License verified and activated successfully!", "success");
                setProfileData(prev => ({
                  ...prev,
                  license: {
                    ...prev.license,
                    status: "Active",
                    licenseKey: key,
                    plan: res.data?.plan || prev.license.plan,
                    expiryDate: res.data?.expiryDate ? new Date(res.data.expiryDate).toLocaleDateString() : prev.license.expiryDate
                  }
                }));
                addActivity("Activated License", "License");
                return true;
              }
              return false;
            } catch (error) {
              console.error(error);
              showNotification(error.response?.data?.message || "License verification failed", "error");
              return false;
            }
          }}
        />

        <AccountSecurity
          accountData={profileData.account}
          onChangePassword={handleChangePassword}
        />

        <RecentActivityLog
          activities={profileData.activities}
          onViewAllLogs={handleViewAllLogs}
        />

        <ActionButtons
          onCancel={handleCancel}
          onSaveChanges={handleSaveChanges}
          isSaving={isSaving}
        />
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        ownerData={profileData.owner}
        businessData={profileData.business}
        onSave={handleSaveProfile}
      />

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSave={handleSavePassword}
      />
    </div>
  );
};

export default Profile;
