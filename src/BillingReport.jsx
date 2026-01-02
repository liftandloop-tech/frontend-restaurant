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
import { useGetDashboardStatsQuery } from "./features/reports/reportsApiSlice";
import { useGetBillsQuery } from "./features/bills/billsApiSlice";

const BillingReport = () => {
  // Fetch stats (reusing dashboard stats for summary)
  const { data: statsResponse, isLoading: statsLoading } = useGetDashboardStatsQuery({
    reportType: 'billing',
    dateRange: 'This Month'
  });

  // Fetch recent bills
  const { data: billsResponse, isLoading: billsLoading } = useGetBillsQuery({ limit: 10 });

  const statsData = statsResponse?.success ? statsResponse.data : null;
  const billsData = billsResponse?.success ? billsResponse.data : [];

  if (statsLoading || billsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <Header />

        {/* Key Metrics Cards */}
        <KeyMetricsCards data={statsData} />

        {/* Revenue Charts Section */}
        <RevenueCharts data={statsData} />

        {/* Recent Bills Section */}
        <RecentBills bills={billsData} />

        {/* Revenue Insights Section */}
        <RevenueInsights data={statsData} />

        {/* Expense vs Profit Section */}
        <ExpenseProfit data={statsData} />

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
