import React, { useState } from "react";

// Add custom CSS for animations
const styles = `
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

/**
 * CustomerTable component displays customer data in a responsive table format
 * Includes checkboxes, customer info, visit stats, ratings, and action buttons
 */
const CustomerTable = ({
  customers = [],
  onSelectCustomer,
  onSelectAll,
  selectedCustomers,
  onCustomerClick,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(customers.length / itemsPerPage);

  // Handle individual customer selection
  const handleCustomerSelect = (customerId) => {
    onSelectCustomer(customerId);
  };

  // Handle select all checkbox
  const handleSelectAll = () => {
    onSelectAll();
  };

  // Handle page navigation
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get current page customers
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = customers.slice(startIndex, endIndex);

  // Render star rating
  const renderStars = (rating) => {
    if (rating === 0) return <span className="text-gray-400 text-xs">N/A</span>;

    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 text-yellow-400 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 text-yellow-400 fill-current"
            viewBox="0 0 24 24"
          >
            <defs>
              <linearGradient id={`half-star-${i}`}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#E5E7EB" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#half-star-${i})`}
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 text-gray-300 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      }
    }
    return stars;
  };

  // Get status badge styling with enhanced colors and animations
  const getStatusBadge = (status) => {
    const statusStyles = {
      VIP: "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300 shadow-sm",
      Regular: "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300 shadow-sm",
      "Walk-in": "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300 shadow-sm",
      Inactive: "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300 shadow-sm",
    };
    return statusStyles[status] || "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300 shadow-sm";
  };

  // Get activity indicator based on last visit
  const getActivityIndicator = (lastVisit, visits) => {
    if (visits === 0) return { color: "bg-gray-400", text: "New Customer" };

    const lastVisitDate = lastVisit === "Never" ? new Date(0) : new Date(lastVisit);
    const now = new Date();
    const daysDiff = Math.floor((now - lastVisitDate) / (1000 * 60 * 60 * 24));

    if (daysDiff <= 7) return { color: "bg-green-500", text: "Active" };
    if (daysDiff <= 30) return { color: "bg-yellow-500", text: "Recent" };
    if (daysDiff <= 90) return { color: "bg-orange-500", text: "Inactive" };
    return { color: "bg-red-500", text: "Very Inactive" };
  };

  // Empty state component
  if (customers.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-12 text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Customers Yet</h3>
          <p className="text-gray-600 mb-6">Start building your customer database by adding your first customer.</p>
          <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Your First Customer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-xl">
      {/* Table Header - Hidden on mobile */}
      <div className="hidden md:block px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center gap-4 text-sm font-semibold text-gray-700">
          <input
            type="checkbox"
            checked={
              selectedCustomers.length === customers.length &&
              customers.length > 0
            }
            onChange={handleSelectAll}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <div className="flex-1">Customer Details</div>
          <div className="hidden lg:block w-32">Contact Info</div>
          <div className="w-20 text-center">Visits</div>
          <div className="hidden lg:block w-24 text-center">Last Visit</div>
          <div className="w-24 text-center">Avg Spend</div>
          <div className="hidden md:block w-24 text-center">Rating</div>
          <div className="w-20 text-center">Actions</div>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-100">
        {currentCustomers.map((customer, index) => {
          const activityIndicator = getActivityIndicator(customer.lastVisit, customer.visits);
          return (
            <div
              key={customer.id}
              className="px-4 md:px-6 py-5 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-300 transform hover:scale-[1.01] hover:shadow-sm animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 md:gap-4 text-sm">
                <input
                  type="checkbox"
                  checked={selectedCustomers.includes(customer.id)}
                  onChange={() => handleCustomerSelect(customer.id)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 shrink-0"
                />

                {/* Customer Info with Activity Indicator */}
                <div
                  className="flex items-center gap-3 flex-1 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 p-3 rounded-xl transition-all duration-300 group relative"
                  onClick={() => {
                    onCustomerClick && onCustomerClick(customer);
                  }}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg transform group-hover:scale-110 transition-transform duration-200">
                      {customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    {/* Activity Indicator */}
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${activityIndicator.color} rounded-full border-2 border-white shadow-sm`} title={activityIndicator.text}>
                      <div className="w-full h-full rounded-full bg-white bg-opacity-20 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-gray-900 truncate group-hover:text-blue-700 transition-colors">
                      {customer.name}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getStatusBadge(
                          customer.status
                        )} transform hover:scale-105 transition-transform`}
                      >
                        {customer.status}
                      </span>
                      {customer.loyaltyPoints > 0 && (
                        <span className="inline-block px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-xs font-medium border border-purple-200">
                          ⭐ {customer.loyaltyPoints} pts
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact - Hidden on mobile */}
                <div className="hidden lg:block w-32">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="font-semibold text-gray-900 truncate text-sm">{customer.phone}</div>
                    <div className="text-xs text-gray-600 truncate">
                      {customer.email || "No email"}
                    </div>
                  </div>
                </div>

                {/* Visits */}
                <div className="w-16 md:w-20">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 text-center border border-blue-100">
                    <div className="text-lg font-bold text-blue-700">{customer.visits}</div>
                    <div className="text-xs text-blue-600">visits</div>
                  </div>
                </div>

                {/* Last Visit - Hidden on mobile */}
                <div className="hidden lg:block w-24">
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <div className="text-sm font-medium text-gray-900">{customer.lastVisit}</div>
                    <div className={`text-xs px-2 py-1 rounded-full mt-1 ${
                      activityIndicator.color === 'bg-green-500' ? 'bg-green-100 text-green-700' :
                      activityIndicator.color === 'bg-yellow-500' ? 'bg-yellow-100 text-yellow-700' :
                      activityIndicator.color === 'bg-orange-500' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {activityIndicator.text}
                    </div>
                  </div>
                </div>

                {/* Avg Spend */}
                <div className="w-20 md:w-24">
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-3 text-center border border-emerald-100">
                    <div className="text-sm font-bold text-emerald-700">{customer.avgSpend}</div>
                    <div className="text-xs text-emerald-600">avg spend</div>
                  </div>
                </div>

                {/* Rating - Hidden on mobile */}
                <div className="hidden md:block w-24">
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-3 border border-yellow-100">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {renderStars(customer.rating)}
                    </div>
                    {customer.rating > 0 && (
                      <div className="text-xs text-center text-gray-600 font-medium">
                        {customer.rating.toFixed(1)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="w-16 md:w-20 flex items-center justify-center">
                  <div className="flex gap-1 md:gap-2 bg-gray-50 rounded-lg p-2">
                    <button
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-md transition-all duration-200 transform hover:scale-110"
                      title="View Details"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                    <button
                      className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-100 rounded-md transition-all duration-200 transform hover:scale-110 hidden md:block"
                      title="Edit Customer"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-md transition-all duration-200 transform hover:scale-110 hidden md:block"
                      title="Delete Customer"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="px-4 md:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1}-{Math.min(endIndex, customers.length)} of{" "}
          {customers.length}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 text-sm rounded ${
                page === currentPage
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-4 h-4"
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
    </div>
  );
};

export default CustomerTable;
