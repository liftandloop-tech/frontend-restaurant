import React, { useState } from "react";
import {
  BasicInformation,
  BenefitConfiguration,
  ValidityPeriod,
  Conditions,
  DistributionOptions,
  OfferPreview,
} from "./components/add-offer-components";

/**
 * AddOffer Component
 *
 * Modal popup for creating new offers with the following features:
 * - Basic information (offer name, code, type, applicable to)
 * - Benefit configuration (discount percentage, maximum discount)
 * - Validity period (start/end dates and times)
 * - Conditions (minimum order value, max redemptions, first-time customers)
 * - Distribution options (Auto SMS, Email, QR Code, Print)
 * - Real-time offer preview
 * - Form validation and submission
 *
 * Props:
 * - isOpen: boolean to control modal visibility
 * - onClose: function to close the modal
 * - onSubmit: function to receive the offer data
 */
const AddOffer = ({ isOpen, onClose, onSubmit }) => {
  // Form state for offer data
  const [formData, setFormData] = useState({
    // Basic Information
    offerName: "",
    offerCode: "WEEKEND20",
    offerType: "Discount %",
    applicableTo: "All Items",

    // Benefit Configuration
    discountPercentage: "20",
    maximumDiscountAmount: "500",

    // Validity Period
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",

    // Conditions
    minimumOrderValue: "300",
    maximumRedemptions: "100",
    firstTimeCustomersOnly: false,

    // Distribution Options
    autoSMS: false,
    email: false,
    qrCode: true,
    print: false,
  });

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

  // Handle offer code refresh
  const handleOfferCodeRefresh = () => {
    const newCode = generateOfferCode();
    setFormData((prev) => ({
      ...prev,
      offerCode: newCode,
    }));
  };

  // Generate random offer code
  const generateOfferCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation - check required fields
    if (
      !formData.offerName ||
      !formData.discountPercentage ||
      !formData.startDate ||
      !formData.endDate
    ) {
      alert(
        "Please fill in all required fields (Offer Name, Discount Percentage, Start Date, and End Date)"
      );
      return;
    }

    // Validate discount percentage
    if (
      parseFloat(formData.discountPercentage) <= 0 ||
      parseFloat(formData.discountPercentage) > 100
    ) {
      alert("Discount percentage must be between 1 and 100");
      return;
    }

    // Validate dates
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      alert("End date must be after start date");
      return;
    }

    // Validate minimum order value
    if (
      formData.minimumOrderValue &&
      parseFloat(formData.minimumOrderValue) < 0
    ) {
      alert("Minimum order value cannot be negative");
      return;
    }

    // Validate maximum redemptions
    if (
      formData.maximumRedemptions &&
      parseInt(formData.maximumRedemptions) < 0
    ) {
      alert("Maximum redemptions cannot be negative");
      return;
    }

    // Pass data to parent component if onSubmit prop exists
    if (onSubmit) {
      onSubmit(formData);
    } else {
      // Fallback if no onSubmit prop
      console.log("Submitting offer:", formData);
      onClose();
    }

    // Reset form data after successful submission
    setFormData({
      offerName: "",
      offerCode: generateOfferCode(),
      offerType: "Discount %",
      applicableTo: "All Items",
      discountPercentage: "20",
      maximumDiscountAmount: "500",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      minimumOrderValue: "300",
      maximumRedemptions: "100",
      firstTimeCustomersOnly: false,
      autoSMS: false,
      email: false,
      qrCode: true,
      print: false,
    });
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-[9999]">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[96vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Create New Offer
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Design and configure your promotional offer
            </p>
          </div>
          <button
            className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-200 p-2 hover:bg-white/50 rounded-full"
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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col h-[calc(96vh-140px)]"
        >
          <div className="flex flex-1 overflow-hidden">
            {/* Left Section - Form Fields */}
            <div className="flex-1 p-8 overflow-y-auto scrollbar-hide bg-gray-50/30">
              <div className="max-w-2xl space-y-8">
                {/* Basic Information */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <BasicInformation
                    formData={formData}
                    onInputChange={handleInputChange}
                    onOfferCodeRefresh={handleOfferCodeRefresh}
                  />
                </div>

                {/* Benefit Configuration */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <BenefitConfiguration
                    formData={formData}
                    onInputChange={handleInputChange}
                  />
                </div>

                {/* Validity Period */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <ValidityPeriod
                    formData={formData}
                    onInputChange={handleInputChange}
                  />
                </div>

                {/* Conditions */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <Conditions
                    formData={formData}
                    onInputChange={handleInputChange}
                    onCheckboxChange={handleCheckboxChange}
                  />
                </div>

                {/* Distribution Options */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <DistributionOptions
                    formData={formData}
                    onCheckboxChange={handleCheckboxChange}
                  />
                </div>
              </div>
            </div>

            {/* Right Section - Preview */}
            <div className="w-96 border-l border-gray-200 bg-gradient-to-b from-gray-50 to-white flex flex-col">
              <OfferPreview formData={formData} />
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-white border-t border-gray-100 flex justify-between items-center">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 border border-transparent rounded-xl shadow-sm hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Save & Activate Offer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOffer;
