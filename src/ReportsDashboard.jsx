import React, { useState } from "react";
import {
  Header,
  KeyMetricsCards,
  ReportCategories,
  AnalyticsOverview,
  Footer,
} from "./components/reports-dashboard-components";
import ScheduleReportModal from "./components/reports-dashboard-components/ScheduleReportModal";
import { exportPDF, createScheduledReport } from "./utils/reports";
import { useGetDashboardStatsQuery } from "./features/reports/reportsApiSlice";

const ReportsDashboard = () => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [dateRange, setDateRange] = useState('This Month');
  const [branch, setBranch] = useState('All Branches');

  // Fetch real data from backend
  const { data: reportResponse, isLoading, error } = useGetDashboardStatsQuery({
    reportType: 'all',
    dateRange: dateRange,
    // branch: branch // API might not support branch yet, but good to add if needed.
  });

  const reportData = reportResponse?.success ? reportResponse.data : null;


  // Handle Export PDF
  const handleExportPDF = async () => {
    try {
      // Get current filter values
      const filters = {
        reportType: 'all',
        dateRange: dateRange,
        branch: branch
      };

      const response = await exportPDF(filters);

      if (response.success && response.data) {
        // Create a print-friendly version with backend data
        const reportData = response.data;
        const printWindow = window.open("", "_blank");

        if (printWindow) {
          printWindow.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>Reports Dashboard - ${new Date().toLocaleDateString()}</title>
                <style>
                  body { font-family: Arial, sans-serif; padding: 20px; }
                  h1 { color: #1f2937; }
                  .section { margin-bottom: 30px; }
                  table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                  th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                  th { background-color: #f3f4f6; }
                  .metric { margin: 10px 0; }
                </style>
              </head>
              <body>
                <h1>Reports Dashboard</h1>
                <p>Generated on: ${new Date(reportData.generatedAt).toLocaleString()}</p>
                <p>Period: ${new Date(reportData.period.from).toLocaleDateString()} - ${new Date(reportData.period.to).toLocaleDateString()}</p>
                <div class="section">
                  <h2>Key Metrics</h2>
                  <div class="metric"><strong>Total Revenue:</strong> ₹${reportData.metrics.totalRevenue.toLocaleString()}</div>
                  <div class="metric"><strong>Total Orders:</strong> ${reportData.metrics.totalOrders}</div>
                  <div class="metric"><strong>Completed Orders:</strong> ${reportData.metrics.completedOrders}</div>
                  <div class="metric"><strong>Total Customers:</strong> ${reportData.metrics.totalCustomers}</div>
                  <div class="metric"><strong>Average Order Value:</strong> ₹${reportData.metrics.averageOrderValue.toFixed(2)}</div>
                </div>
                <div class="section">
                  <h2>Recent Orders</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Order Number</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${reportData.orders.slice(0, 10).map(order => `
                        <tr>
                          <td>${order.orderNumber || 'N/A'}</td>
                          <td>${order.status}</td>
                          <td>₹${order.total.toFixed(2)}</td>
                          <td>${new Date(order.createdAt).toLocaleDateString()}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
                <p style="margin-top: 30px; color: #6b7280; font-size: 12px;">
                  This is a summary report. For detailed analytics, please visit the dashboard.
                </p>
              </body>
            </html>
          `);
          printWindow.document.close();
          setTimeout(() => {
            printWindow.print();
          }, 250);
        } else {
          // Fallback to regular print
          window.print();
        }
      }
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert(error.message || "Failed to export PDF. Please try again.");
    }
  };

  // Handle Schedule Report
  const handleScheduleReport = () => {
    setIsScheduleModalOpen(true);
  };

  // Handle Schedule Submit
  const handleScheduleSubmit = async (scheduleData) => {
    try {
      const response = await createScheduledReport(scheduleData);

      if (response.success) {
        setSuccessMessage(
          `Report scheduled successfully! Reports will be sent to ${scheduleData.email} ${scheduleData.frequency} at ${scheduleData.time}.`
        );
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      }
    } catch (error) {
      console.error("Error scheduling report:", error);
      alert(error.message || "Failed to schedule report. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg z-50 max-w-md">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-green-600 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium text-green-800">
                {successMessage}
              </p>
            </div>
            <button
              onClick={() => setSuccessMessage("")}
              className="text-green-600 hover:text-green-800"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 lg:px-8 py-8">
        {/* Header Section */}
        <Header
          onExportPDF={handleExportPDF}
          onScheduleReport={handleScheduleReport}
          dateRange={dateRange}
          setDateRange={setDateRange}
          branch={branch}
          setBranch={setBranch}
        />

        {/* Key Metrics Cards */}
        {isLoading ? (
          <div className="h-40 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <KeyMetricsCards data={reportData} />
        )}

        {/* Report Categories Grid */}
        <div className="mt-15">
          <ReportCategories />
        </div>

        {/* Analytics Overview Charts */}
        <div className="mt-10">
          <AnalyticsOverview data={reportData} />
        </div>

        {/* Footer Section */}
        <div className="mt-8">
          <Footer />
        </div>
      </div>

      {/* Schedule Report Modal */}
      <ScheduleReportModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={handleScheduleSubmit}
      />
    </div>
  );
};

export default ReportsDashboard;
