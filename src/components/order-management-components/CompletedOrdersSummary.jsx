import React from "react";
import { FiCheckCircle, FiDollarSign, FiTrendingUp } from "react-icons/fi";

const CompletedOrdersSummary = ({ completedOrders }) => {
  const totalCompleted = completedOrders.length;
  const totalSales = completedOrders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );
  const averageOrderValue =
    totalCompleted > 0 ? totalSales / totalCompleted : 0;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg mt-5 px-4 py-5 pb-7 mb-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Completed Orders Summary
      </h3>

      <div className="grid grid-cols-1 gap-4">
        {/* Total Completed */}
        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <FiCheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-900">
                Total Completed
              </p>
              <p className="text-xs text-green-700">Orders finished today</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-900">
              {totalCompleted}
            </p>
          </div>
        </div>

        {/* Sales Today */}
        <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiDollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-900">Sales Today</p>
              <p className="text-xs text-blue-700">Total revenue generated</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-900">
              {formatCurrency(totalSales)}
            </p>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FiTrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-purple-900">
                Average Order Value
              </p>
              <p className="text-xs text-purple-700">Per completed order</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-purple-900">
              {formatCurrency(averageOrderValue)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedOrdersSummary;
