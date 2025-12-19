import React, { useState } from "react";
import Header from "./Header";
import AddOffer from "./AddOffer";
import {
  PageHeader,
  FiltersSection,
  ActiveOffers,
  SummaryCards,
  PerformanceOverview,
  TopPerformingOffers,
} from "./components/offers-components";

/**
 * Main Offers component that renders the complete Promotions & Offers dashboard
 * This component orchestrates all the sub-components to create the full UI
 */
const Offers = () => {
  // State for AddOffer modal
  const [isAddOfferOpen, setIsAddOfferOpen] = useState(false);

  // Handle opening AddOffer modal
  const handleCreateOffer = () => {
    setIsAddOfferOpen(true);
  };

  // Handle closing AddOffer modal
  const handleCloseAddOffer = () => {
    setIsAddOfferOpen(false);
  };

  // Handle offer submission
  const handleOfferSubmit = (offerData) => {
    console.log("New offer created:", offerData);
    // Here you would typically send the data to your backend
    // For now, we'll just close the modal
    setIsAddOfferOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* AddOffer Modal */}
      <AddOffer
        isOpen={isAddOfferOpen}
        onClose={handleCloseAddOffer}
        onSubmit={handleOfferSubmit}
      />

      {/* Main content area with proper container */}
      <div className="max-w-7xl mx-auto flex flex-col gap-8 px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header with breadcrumbs, title, and action buttons */}
        <PageHeader onCreateOffer={handleCreateOffer} />

        {/* Filters and search section */}
        <FiltersSection />

        {/* Active offers grid */}
        <ActiveOffers />

        {/* Summary metrics cards */}
        <SummaryCards />

        {/* Bottom section with performance overview and top performing offers */}
        <div className="grid grid-cols-1 mt-10 lg:grid-cols-2 gap-6">
          <PerformanceOverview />
          <TopPerformingOffers />
        </div>
      </div>
    </div>
  );
};

export default Offers;
