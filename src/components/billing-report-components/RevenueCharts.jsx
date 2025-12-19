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
const RevenueCharts = () => {
  // Payment mode data
  const paymentData = [
    { mode: "Cash", amount: 450000, color: "bg-blue-500" },
    { mode: "UPI", amount: 510000, color: "bg-blue-600" },
    { mode: "Card", amount: 225000, color: "bg-blue-400" },
    { mode: "Others", amount: 100000, color: "bg-blue-300" },
  ];

  // Bills by type data
  const billTypeData = [
    { type: "Dine-in", percentage: 52, color: "bg-blue-600" },
    { type: "Takeaway", percentage: 28, color: "bg-blue-400" },
    { type: "Online", percentage: 20, color: "bg-green-500" },
  ];

  // Calculate maximum amount for bar scaling
  const maxAmount = Math.max(...paymentData.map((item) => item.amount));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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

        {/* X-axis scale */}
        <div className="mt-4 flex justify-between text-xs text-gray-500">
          <span>0</span>
          <span>100k</span>
          <span>200k</span>
          <span>300k</span>
          <span>400k</span>
          <span>500k</span>
        </div>
      </div>

      {/* Bills by Type */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Bills by Type
        </h3>

        {/* Pie Chart Representation */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-48 h-48">
            {/* Pie chart segments */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {/* Dine-in segment (52%) */}
              <div
                className="absolute w-full h-full bg-blue-600"
                style={{
                  clipPath:
                    "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)",
                }}
              ></div>
              {/* Takeaway segment (28%) */}
              <div
                className="absolute w-full h-full bg-blue-400"
                style={{
                  clipPath: "polygon(50% 50%, 100% 0%, 100% 28%, 50% 50%)",
                }}
              ></div>
              {/* Online segment (20%) */}
              <div
                className="absolute w-full h-full bg-green-500"
                style={{
                  clipPath: "polygon(50% 50%, 100% 28%, 100% 100%, 50% 100%)",
                }}
              ></div>
            </div>

            {/* Center circle */}
            <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">1,284</div>
                <div className="text-xs text-gray-500">Total Bills</div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3">
          {billTypeData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 ${item.color} rounded-full mr-3`}
                ></div>
                <span className="text-sm font-medium text-gray-700">
                  {item.type}
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueCharts;
