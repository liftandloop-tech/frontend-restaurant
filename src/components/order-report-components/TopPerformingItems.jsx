import React from "react";

/**
 * TopPerformingItems component displays a table of top performing menu items
 *
 * Features:
 * - Ranked items with medal icons
 * - Order count and revenue data
 * - Star ratings
 * - View full menu performance button
 * - Responsive table design
 */
const TopPerformingItems = () => {
  const topItems = [
    {
      rank: 1,
      name: "Paneer Butter Masala",
      orders: 246,
      revenue: 147600,
      rating: 4.8,
      medal: "🥇",
    },
    {
      rank: 2,
      name: "Veg Biryani",
      orders: 219,
      revenue: 109500,
      rating: 4.7,
      medal: "🥈",
    },
    {
      rank: 3,
      name: "Butter Naan",
      orders: 205,
      revenue: 51200,
      rating: 4.6,
      medal: "🥉",
    },
  ];

  const formatRevenue = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-sm ${
          index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      {/* Section Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Top Performing Items
      </h3>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                Rank
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                Item Name
              </th>
              <th className="text-right py-3 px-2 text-sm font-medium text-gray-500">
                Orders
              </th>
              <th className="text-right py-3 px-2 text-sm font-medium text-gray-500">
                Revenue (₹)
              </th>
              <th className="text-right py-3 px-2 text-sm font-medium text-gray-500">
                Avg Rating
              </th>
            </tr>
          </thead>
          <tbody>
            {topItems.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors duration-200"
              >
                {/* Rank */}
                <td className="py-4 px-2">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">{item.medal}</span>
                  </div>
                </td>

                {/* Item Name */}
                <td className="py-4 px-2">
                  <div className="font-medium text-gray-900">{item.name}</div>
                </td>

                {/* Orders */}
                <td className="py-4 px-2 text-right">
                  <span className="text-sm font-medium text-gray-900">
                    {item.orders.toLocaleString()}
                  </span>
                </td>

                {/* Revenue */}
                <td className="py-4 px-2 text-right">
                  <span className="text-sm font-medium text-gray-900">
                    {formatRevenue(item.revenue)}
                  </span>
                </td>

                {/* Rating */}
                <td className="py-4 px-2 text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <div className="flex">{renderStars(item.rating)}</div>
                    <span className="text-sm font-medium text-gray-900 ml-1">
                      {item.rating}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Full Menu Performance Button */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200 border border-blue-200 hover:border-blue-300 rounded-lg px-4 py-2">
          View Full Menu Performance
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TopPerformingItems;
