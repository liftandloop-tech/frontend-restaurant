import React from "react";
import {
  Header,
  KeyMetricsCards,
  OrdersByChannelChart,
  RevenueByChannelChart,
  TopPerformingItems,
  AverageServiceTimeChart,
  FastestServerCard,
  FeedbackRatingsChart,
  CustomerInsightsCard,
  OperationalNotes,
  Footer,
} from "./components/order-report-components";

/**
 * OrderReport - Main component for the Order Report page
 *
 * This component renders a comprehensive order analytics dashboard with:
 * - Header with title, filters, and export buttons
 * - Key metrics cards showing order statistics
 * - Charts for orders and revenue by channel
 * - Top performing items table
 * - Service time analysis and server performance
 * - Customer feedback insights and operational notes
 * - Footer with report actions
 *
 * The dashboard is fully responsive and uses Tailwind CSS for styling.
 * All components are modular and reusable with proper prop handling.
 */
const OrderReport = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <Header />

        {/* Key Metrics Cards */}
        <KeyMetricsCards />

        {/* Main Content Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts and Tables */}
          <div className="lg:col-span-2 space-y-6">
            {/* Orders and Revenue by Channel Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <OrdersByChannelChart />
              <RevenueByChannelChart />
            </div>

            {/* Top Performing Items */}
            <TopPerformingItems />

            {/* Service Time and Server Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AverageServiceTimeChart />
              <FastestServerCard />
            </div>

            {/* Customer Feedback Table */}
            <FeedbackRatingsChart />
          </div>

          {/* Right Column - Insights and Actions */}
          <div className="space-y-6">
            {/* Customer Insights */}
            <CustomerInsightsCard />

            {/* Operational Notes */}
            <OperationalNotes />
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-8">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default OrderReport;
