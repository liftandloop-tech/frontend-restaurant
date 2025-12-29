import React, { useState, useEffect } from "react";
import {
  ProfilePictureUpload,
  BasicInformation,
  RoleAccess,
  SalaryPayroll,
  LoginCredentials,
  OptionalNotes,
} from "./components/add-staff-components";

/**
 * AddStaff Component
 *
 * Modal popup for adding new staff members with the following features:
 * - Profile picture upload with drag and drop
 * - Basic information (name, phone, email, date, gender, status)
 * - Role and access management (role, branch, supervisor, shift timing)
 * - Salary and payroll information (salary, payment mode, bank details)
 * - Login credentials setup (username, password, SMS/Email options)
 * - Optional internal notes
 * - Form validation and submission
 *
 * Props:
 * - isOpen: boolean to control modal visibility
 * - onClose: function to close the modal
 * - onSubmit: function to receive the staff data
 */
const AddStaff = ({ isOpen, onClose, onSubmit, initialData }) => {
  // Form state for all staff data
  const [formData, setFormData] = useState({
    // Profile
    profilePicture: "",

    // Basic Information
    fullName: "",
    phoneNumber: "",
    email: "",
    dateOfJoining: "",
    gender: "",
    isActive: true,

    // Role & Access
    role: "",
    branch: "",
    supervisor: "",
    shiftStart: "",
    shiftEnd: "",
    autoAddToAttendance: false,

    // Salary & Payroll
    baseSalary: "",
    paymentMode: "",
    tipCommissionEligible: false,
    bankName: "",
    ifscCode: "",
    accountNumber: "",

    // Login Credentials
    username: "",
    temporaryPassword: "",
    sendCredentials: true,

    // Optional Notes
    internalNotes: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData,
        // Ensure specific fields are correctly mapped if keys differ
        supervisor: (initialData.supervisor && typeof initialData.supervisor === 'object') ? initialData.supervisor._id : initialData.supervisor,
        temporaryPassword: "", // Don't populate password
      }));
    }
  }, [initialData, isOpen]);

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Handle gender selection
  const handleGenderChange = (e) => {
    const value = e.target.value;
    // Only set gender if it's a valid value
    if (['Male', 'Female', 'Other'].includes(value)) {
      setFormData((prev) => ({
        ...prev,
        gender: value,
      }));
    }
  };

  // Handle status toggle
  const handleStatusChange = (isActive) => {
    setFormData((prev) => ({
      ...prev,
      isActive,
    }));
  };

  // Handle profile picture upload
  const handleImageUpload = (file) => {
    setFormData((prev) => ({
      ...prev,
      profilePicture: file,
    }));
  };

  // Handle password refresh
  const handlePasswordRefresh = (newPassword) => {
    setFormData((prev) => ({
      ...prev,
      temporaryPassword: newPassword,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation - check required fields
    if (!formData.fullName || !formData.phoneNumber || !formData.role || !formData.username) {
      alert("please fill in all required fields (Full Name,Phone Number,Role,and Username)");
      return;
    }

    // Validate phone number format (basic validation)
    const phoneRegex = /^[+]?[1-9]\d{0,15}$/;
    if (!phoneRegex.test(formData.phoneNumber.replace(/\D/g, ""))) {
      alert("Please enter a valid phone number");
      return;
    }

    // Validate email format if provided
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert("Please enter a valid email address");
        return;
      }
    }

    // Validate shift timing if provided
    if (formData.shiftStart && formData.shiftEnd) {
      if (formData.shiftStart >= formData.shiftEnd) {
        alert("Shift end time must be after shift start time");
        return;
      }
    }

    // Pass data to parent component if onSubmit prop exists
    if (onSubmit) {
      onSubmit(formData);
    } else {
      // Fallback if no onSubmit prop
      console.log("Submitting staff member:", formData);
      onClose();
    }

    // Reset form data after successful submission
    setFormData({
      profilePicture: "",
      fullName: "",
      phoneNumber: "",
      email: "",
      dateOfJoining: "",
      gender: "",
      isActive: true,
      role: "",
      branch: "",
      supervisor: "",
      shiftStart: "",
      shiftEnd: "",
      autoAddToAttendance: false,
      baseSalary: "",
      paymentMode: "",
      tipCommissionEligible: false,
      bankName: "",
      ifscCode: "",
      accountNumber: "",
      username: "",
      temporaryPassword: "",
      sendCredentials: true,
      internalNotes: "",
    });
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/20 bg-opacity-50 backdrop-blur-lg z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[95vh] scrollbar-hide overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Add New Staff Member
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Fill in details to onboard a new team member.
            </p>
          </div>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-8">
            {/* Profile Picture Section */}
            <div className="flex justify-center">
              <ProfilePictureUpload
                onImageUpload={handleImageUpload}
                currentImage={formData.profilePicture}
              />
            </div>

            {/* Basic Information Section */}
            <div className="border border-gray-200 rounded-lg p-6">
              <BasicInformation
                formData={formData}
                onInputChange={handleInputChange}
                onGenderChange={handleGenderChange}
                onStatusChange={handleStatusChange}
              />
            </div>

            {/* Role & Access Section */}
            <div className="border border-gray-200 rounded-lg p-6">
              <RoleAccess
                formData={formData}
                onInputChange={handleInputChange}
                onCheckboxChange={handleCheckboxChange}
              />
            </div>

            {/* Salary & Payroll Section */}
            <div className="border border-gray-200 rounded-lg p-6">
              <SalaryPayroll
                formData={formData}
                onInputChange={handleInputChange}
                onCheckboxChange={handleCheckboxChange}
              />
            </div>

            {/* Login Credentials Section */}
            <div className="border border-gray-200 rounded-lg p-6">
              <LoginCredentials
                formData={formData}
                onInputChange={handleInputChange}
                onCheckboxChange={handleCheckboxChange}
                onPasswordRefresh={handlePasswordRefresh}
              />
            </div>

            {/* Optional Notes Section */}
            <div className="border border-gray-200 rounded-lg p-6">
              <OptionalNotes
                formData={formData}
                onInputChange={handleInputChange}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3 rounded-b-lg">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Save Staff
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaff;
