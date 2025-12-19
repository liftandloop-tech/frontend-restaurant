import React from "react";

/**
 * TopFrequentCustomers component displays the top 5 frequent customers
 *
 * Features:
 * - Customer profile pictures
 * - Customer names and details
 * - Visit count and spending information
 * - Responsive design
 */
const TopFrequentCustomers = () => {
  const customers = [
    {
      id: 1,
      name: "Aditi Verma",
      details: "₹ 8,560 • 12 visits",
      avatar: "AV",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      details: "₹ 6,240 • 8 visits",
      avatar: "RK",
    },
    {
      id: 3,
      name: "Priya Sharma",
      details: "₹ 5,890 • 7 visits",
      avatar: "PS",
    },
    {
      id: 4,
      name: "Amit Singh",
      details: "₹ 4,320 • 6 visits",
      avatar: "AS",
    },
    {
      id: 5,
      name: "Sneha Patel",
      details: "₹ 3,980 • 5 visits",
      avatar: "SP",
    },
  ];

  // Function to generate avatar background color
  const getAvatarColor = (name) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <h3 className="text-lg font-bold text-gray-900 mb-6">
        Top 5 Frequent Customers
      </h3>

      {/* Customer List */}
      <div className="space-y-4">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            {/* Avatar */}
            <div
              className={`w-10 h-10 rounded-full ${getAvatarColor(
                customer.name
              )} flex items-center justify-center text-white text-sm font-medium flex-shrink-0`}
            >
              {customer.avatar}
            </div>

            {/* Customer Info */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-gray-900 truncate">
                {customer.name}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {customer.details}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopFrequentCustomers;
