import React from "react";

/**
 * AnalyticsOverview component displays various charts and analytics
 * Includes Sales vs Expenses, Orders by Channel, Top Categories, and Staff Payroll charts
 */
const AnalyticsOverview = ({ data }) => { // Accept data prop
  const charts = data?.charts || {};
  const metrics = data?.metrics || {};

  // Prepare Orders by Channel Data
  const channelData = charts.ordersByChannel || [];
  const totalOrders = metrics.totalOrders || 1;
  const channelColors = ["#1e40af", "#06b6d4", "#10b981", "#f59e0b"]; // blue, cyan, green, amber
  const channelBgColors = ["bg-blue-600", "bg-cyan-500", "bg-green-500", "bg-amber-500"];

  // Prepare Top Categories Data
  const categoryData = charts.topCategories || [];
  const totalCategorySales = categoryData.reduce((sum, item) => sum + item.value, 0) || 1;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Analytics Overview
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Chart  */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 min-h-[400px] w-[1200px]">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Sales Trend
          </h3>
          <div className="h-80 flex items-end justify-between gap-4 px-4 overflow-x-auto">
            {charts.salesTrend && charts.salesTrend.length > 0 ? (
              charts.salesTrend.map((item, index) => {
                const maxValue = Math.max(...charts.salesTrend.map((i) => i.value), 1000);
                const height = (item.value / maxValue) * 100;
                return (
                  <div key={index} className="flex flex-col items-center gap-2 group flex-1 min-w-[60px]">
                    <div
                      className="relative w-full bg-blue-500 rounded-t-lg transition-all duration-500 ease-out hover:bg-blue-600"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                        ₹{item.value.toLocaleString()}
                      </div>
                    </div>
                    <span className="text-xs text-gray-600 truncate w-full text-center">
                      {item.name}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No sales data available for this period
              </div>
            )}
          </div>
        </div>  <br />

        {/* Top 5 Performing Categories */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 min-h-[400px] w-[1200px]">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top Performing Categories (by Revenue)
          </h3>
          <div className="space-y-4 h-80 overflow-y-auto">
            {categoryData.length > 0 ? categoryData.map((category, index) => {
              const percentage = (category.value / totalCategorySales) * 100;
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-24 text-sm text-gray-600 text-right truncate" title={category.name}>
                    {category.name}
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-20 text-sm font-medium text-gray-900 text-right">
                    ₹{(category.value / 1000).toFixed(1)}k
                  </div>
                </div>
              )
            }) : <div className="text-center text-gray-500 mt-10">No category data available</div>}
          </div>
        </div>

        {/* Staff Payroll vs Revenue - Placeholder or Hidden if no data */}
        {/* Hiding for now to ensure reliability as payroll data is not connected */}
      </div>
    </div>
  );
};

export default AnalyticsOverview;
