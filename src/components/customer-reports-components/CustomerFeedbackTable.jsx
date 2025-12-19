import React, { useState } from "react";

/**
 * CustomerFeedbackTable component displays customer data in a table format
 *
 * Features:
 * - Search functionality
 * - Customer data table with avatars, ratings, and actions
 * - Pagination controls
 * - Responsive design
 * - Hover effects and transitions
 */
const CustomerFeedbackTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sample customer data
  const customers = [
    {
      id: 1,
      name: "Aditi Verma",
      phone: "9823****21",
      visits: 12,
      rating: 4.8,
      totalSpend: "₹ 8,560",
      lastVisit: "04 Oct 2025",
      avatar: "AV",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      phone: "9876****43",
      visits: 8,
      rating: 4.5,
      totalSpend: "₹ 6,240",
      lastVisit: "03 Oct 2025",
      avatar: "RK",
    },
    {
      id: 3,
      name: "Priya Sharma",
      phone: "9123****56",
      visits: 7,
      rating: 4.7,
      totalSpend: "₹ 5,890",
      lastVisit: "02 Oct 2025",
      avatar: "PS",
    },
    {
      id: 4,
      name: "Amit Singh",
      phone: "9456****78",
      visits: 6,
      rating: 4.3,
      totalSpend: "₹ 4,320",
      lastVisit: "01 Oct 2025",
      avatar: "AS",
    },
    {
      id: 5,
      name: "Sneha Patel",
      phone: "9789****90",
      visits: 5,
      rating: 4.6,
      totalSpend: "₹ 3,980",
      lastVisit: "30 Sep 2025",
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

  // Function to render star rating
  const renderStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={i}
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <svg
          key="half"
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient id={`half-star-${rating}`}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#E5E7EB" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#half-star-${rating})`}
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      );
    }

    return stars;
  };

  // Filter customers based on search term
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  const handleViewProfile = (customerId) => {
    console.log(`Viewing profile for customer ${customerId}`);
    // Implement view profile functionality
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h3 className="text-lg font-bold text-gray-900">
          Customer Feedback & Activity
        </h3>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Customer
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Phone
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Visits
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Rating
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Total Spend
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Last Visit
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full ${getAvatarColor(
                        customer.name
                      )} flex items-center justify-center text-white text-xs font-medium`}
                    >
                      {customer.avatar}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {customer.name}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">
                  {customer.phone}
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">
                  {customer.visits}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1">
                    {renderStarRating(customer.rating)}
                    <span className="text-sm text-gray-600 ml-1">
                      {customer.rating}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm font-bold text-gray-900">
                  {customer.totalSpend}
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">
                  {customer.lastVisit}
                </td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => handleViewProfile(customer.id)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
                  >
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1}-
          {Math.min(endIndex, filteredCustomers.length)} of{" "}
          {filteredCustomers.length} customers
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Previous
          </button>

          <span className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-lg">
            {currentPage}
          </span>

          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerFeedbackTable;
