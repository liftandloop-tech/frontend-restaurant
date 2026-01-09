import React from "react";

/**
 * RevenueCharts component displays two charts side by side
 *
 * Features:
 * - Revenue by Payment Mode (horizontal bar chart)
 * - Bills by Type (pie chart representation)
 * - Responsive grid layout
 * - Clean chart styling with proper spacing
 */
const RevenueCharts = ({ data }) => {
  // Payment mode data from backend
  const chartData = data?.charts?.paymentMethods || [];

  const paymentData = chartData.map((item, index) => ({
    mode: item.name,
    amount: item.value,
    color: ["bg-blue-500", "bg-blue-600", "bg-blue-400", "bg-blue-300"][index % 4]
  })).sort((a, b) => b.amount - a.amount);

  const maxAmount = Math.max(...paymentData.map((item) => item.amount)) || 1;

  if (paymentData.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 text-center text-gray-500">
        No revenue data available for this period.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 mb-8">
      {/* Revenue by Payment Mode */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Revenue by Payment Mode
        </h3>

        <div className="space-y-4">
          {paymentData.map((item, index) => {
            const widthPercentage = (item.amount / maxAmount) * 100;

            return (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    {item.mode}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    ₹ {item.amount.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${item.color} transition-all duration-500 ease-out`}
                    style={{ width: `${widthPercentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RevenueCharts;
