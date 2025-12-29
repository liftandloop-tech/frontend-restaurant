import React from "react";
import {
  CustomerHeader,
  ContactInformation,
  VisitHistory,
  SpendSummary,
  RecentFeedback,
  CustomerFooter,
} from "./components/customer-details-components";

/**
 * CustomerDetails Component
 *
 * Modal popup for displaying comprehensive customer information with the following features:
 * - Customer profile header with photo, name, ID, and badges
 * - Contact information with phone, email, DOB, and loyalty details
 * - Visit history with recent transactions
 * - Spending summary with analytics and trend chart
 * - Recent feedback with ratings and follow-up options
 * - Action buttons for offers, export, and profile management
 *
 * Props:
 * - isOpen: boolean to control modal visibility
 * - onClose: function to close the modal
 * - customer: customer data object
 * - onEditProfile: function to handle profile editing
 * - onMerge: function to handle customer merging
 * - onDelete: function to handle customer deletion
 * - onSendOffer: function to handle sending offers
 * - onExportProfile: function to handle profile export
 * - onSeeAllVisits: function to handle viewing all visits
 * - onAssignFollowUp: function to handle follow-up task assignment
 */
const CustomerDetails = ({
  isOpen,
  onClose,
  customer,
  onEditProfile,
  onMerge,
  onDelete,
  onSendOffer,
  onExportProfile,
  onSeeAllVisits,
  onAssignFollowUp,
}) => {
  // Default customer data if none provided
  const defaultCustomer = {
    id: customer?.id || "#CU001",
    name: customer?.name || "Rajesh Kumar",
    profileImage: null,
    badges: [
      customer?.isVIP ? "VIP" : "Regular",
      customer?.revenueCardEnabled ? "Revenue Card" : null,
      "Loyalty Member"
    ].filter(Boolean),
    phone: customer?.phone || "+91 98765 43210",
    email: customer?.email || "rajesh@email.com",
    dateOfBirth: "March 15, 1985",
    loyaltyTier: "Gold Tier",
    loyaltyPoints: "2,450",
    visits: [
      {
        type: "Dine-in",
        details: "Table 12 • Order #04521",
        date: "Dec 15, 2024",
        time: "7:30 PM",
        amount: "₹1,250",
      },
      {
        type: "Reservation",
        details: "Table 8 • Reservation #R3421",
        date: "Dec 10, 2024",
        time: "8:00 PM",
        amount: "₹2,100",
      },
      {
        type: "Delivery",
        details: "Delivery • Order #04398",
        date: "Dec 5, 2024",
        time: "6:45 PM",
        amount: "₹850",
      },
    ],
    summaryData: {
      totalVisits: customer?.visits?.toString() || "24",
      avgSpend: customer?.avgSpend || "₹769",
      lifetimeValue: customer?.lifetimeValue || "₹18,450",
    },
    spendTrend: [
      { month: "Jul", value: 1200 },
      { month: "Aug", value: 1500 },
      { month: "Sep", value: 1100 },
      { month: "Oct", value: 1800 },
      { month: "Nov", value: 1600 },
      { month: "Dec", value: 2000 },
    ],
    feedback: [
      {
        rating: customer?.rating || 5.0,
        text: "Excellent food and service as always! The new pasta dish was amazing.",
        date: customer?.lastVisit || "Dec 15, 2024",
      },
      {
        rating: Math.max((customer?.rating || 5.0) - 0.5, 1.0),
        text: "Good food but service was a bit slow tonight.",
        date: "Dec 10, 2024",
      },
    ],
  };

  // Use provided customer data or default
  const customerData = customer || defaultCustomer;

  // Default handlers if none provided
  const handleEditProfile = () => {
    if (onEditProfile) {
      onEditProfile(customerData);
    } else {
      console.log("Edit profile for:", customerData.name);
    }
  };

  const handleMerge = () => {
    if (onMerge) {
      onMerge(customerData);
    } else {
      console.log("Merge customer:", customerData.name);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(customerData);
    } else {
      console.log("Delete customer:", customerData.name);
    }
  };

  const handleSendOffer = () => {
    if (onSendOffer) {
      onSendOffer(customerData);
    } else {
      console.log("Send offer to:", customerData.name);
    }
  };

  const handleExportProfile = () => {
    if (onExportProfile) {
      onExportProfile(customerData);
    } else {
      console.log("Export profile for:", customerData.name);
    }
  };

  const handleSeeAllVisits = () => {
    if (onSeeAllVisits) {
      onSeeAllVisits(customerData);
    } else {
      console.log("See all visits for:", customerData.name);
    }
  };

  const handleAssignFollowUp = (feedbackItem) => {
    if (onAssignFollowUp) {
      onAssignFollowUp(customerData, feedbackItem);
    } else {
      console.log("Assign follow-up for feedback:", feedbackItem);
    }
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto">
        {/* Customer Header */}
        <CustomerHeader customer={customerData} onClose={onClose} />

        {/* Contact Information */}
        <ContactInformation
          customer={customerData}
          onEditProfile={handleEditProfile}
          onMerge={handleMerge}
          onDelete={handleDelete}
        />

        {/* Visit History */}
        <VisitHistory
          visits={customerData.visits}
          onSeeAllVisits={handleSeeAllVisits}
        />

        {/* Spend Summary */}
        <SpendSummary
          summaryData={customerData.summaryData}
          spendTrend={customerData.spendTrend}
        />

        {/* Recent Feedback */}
        <RecentFeedback
          feedback={customerData.feedback}
          onAssignFollowUp={handleAssignFollowUp}
        />

        {/* Footer */}
        <CustomerFooter
          onSendOffer={handleSendOffer}
          onExportProfile={handleExportProfile}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default CustomerDetails;
