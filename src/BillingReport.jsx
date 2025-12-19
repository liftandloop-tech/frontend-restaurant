import React from "react";
import {
  Header,
  KeyMetricsCards,
  RevenueCharts,
  RecentBills,
  RevenueInsights,
  ExpenseProfit,
  Reminders,
  Footer,
} from "./components/billing-report-components";

/**
 * BillingReport - Main component for the Billing Report page
 *
 * This component renders a comprehensive billing analytics dashboard with:
 * - Header with title, filters, and export buttons
 * - Key metrics cards showing billing statistics
 * - Revenue charts with payment modes and bill types
 * - Recent bills table with customer and payment details
 * - Revenue insights with time charts and daily metrics
 * - Expense vs profit snapshot with visual breakdown
 * - Reminders section with alerts and action buttons
 * - Footer with export options and status
 *
 * The dashboard is fully responsive and uses Tailwind CSS for styling.
 * All components are modular and reusable with proper prop handling.
 */
const BillingReport = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <Header />

        {/* Key Metrics Cards */}
        <KeyMetricsCards />

        {/* Revenue Charts Section */}
        <RevenueCharts />

        {/* Recent Bills Section */}
        <RecentBills />

        {/* Revenue Insights Section */}
        <RevenueInsights />

        {/* Expense vs Profit Section */}
        <ExpenseProfit />

        {/* Reminders Section */}
        <Reminders />

        {/* Footer Section */}
        <div className="mt-8">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default BillingReport;
