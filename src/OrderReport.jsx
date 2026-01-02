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
import { useGetDashboardStatsQuery } from "./features/reports/reportsApiSlice";
import { useGetOrdersQuery } from "./features/orders/ordersApiSlice";

const OrderReport = () => {
  // Fetch stats (specific for order report)
  const { data: statsResponse, isLoading: statsLoading } = useGetDashboardStatsQuery({
    reportType: 'order',
    dateRange: 'This Month'
  });

  // Fetch recent orders
  const { data: ordersResponse, isLoading: ordersLoading } = useGetOrdersQuery({ limit: 10 });

  const statsData = statsResponse?.success ? statsResponse.data : null;
  const ordersData = ordersResponse?.success ? ordersResponse.data : [];

  if (statsLoading || ordersLoading) {
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

        {/* Main Content Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts and Tables */}
          <div className="lg:col-span-2 space-y-6">
            {/* Orders and Revenue by Channel Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <OrdersByChannelChart data={statsData} />
              <RevenueByChannelChart data={statsData} />
            </div>

            {/* Top Performing Items */}
            <TopPerformingItems data={statsData} />

            {/* Service Time and Server Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AverageServiceTimeChart data={statsData} />
              <FastestServerCard data={statsData} />
            </div>

            {/* Customer Feedback Table */}
            <FeedbackRatingsChart data={statsData} />
          </div>

          {/* Right Column - Insights and Actions */}
          <div className="space-y-6">
            {/* Customer Insights */}
            <CustomerInsightsCard data={statsData} />

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
