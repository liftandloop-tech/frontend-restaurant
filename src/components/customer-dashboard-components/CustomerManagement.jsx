import React, { useState, useMemo } from "react";
import FilterBar from "./FilterBar";
import CustomerTable from "./CustomerTable";
import FeedbackOverview from "./FeedbackOverview";
import CustomerDetails from "../../CustomerDetails";

/**
 * CustomerManagement component is the main section for customer management
 * Includes filters, customer table, and feedback overview panel
 */
const CustomerManagement = ({ customers, feedbackData, onAddCustomer, onEditCustomer, onDeleteCustomer }) => {
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(false);

  // Handle customer selection
  const handleCustomerSelect = (customerId) => {
    setSelectedCustomers((prev) =>
      prev.includes(customerId)
        ? prev.filter((id) => id !== customerId)
        : [...prev, customerId]
    );
  };

  // Handle select all customers
  const handleSelectAll = () => {
    if (selectedCustomers.length === customers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(customers.map((customer) => customer.id));
    }
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => {
      // Filter out any existing filter of the same type
      const newFilters = prev.filter(f => !f.toLowerCase().startsWith(`${filterType.toLowerCase()}:`));

      if (value === "") {
        return newFilters;
      }

      // Add the new filter value
      let displayValue = value;
      if (filterType === 'type') {
        if (value === 'vip') displayValue = 'VIP';
        else if (value === 'regular') displayValue = 'Regular';
        else if (value === 'revenue_card') displayValue = 'Revenue Card';
      }

      return [...newFilters, `${filterType}: ${displayValue.toLowerCase()}`];
    });
  };

  // Memoized filtered customers
  const filteredCustomers = useMemo(() => {
    let result = [...customers];

    // Search filter
    if (searchTerm) {
      result = result.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm)
      );
    }

    // Type filters from activeFilters state
    activeFilters.forEach(filter => {
      if (filter.startsWith("type: ")) {
        const typeValue = filter.replace("type: ", "").toLowerCase();
        if (typeValue === "vip") {
          result = result.filter(c => c.isVIP);
        } else if (typeValue === "revenue card") {
          result = result.filter(c => c.revenueCardEnabled);
        } else if (typeValue === "regular") {
          result = result.filter(c => !c.isVIP);
        }
      }
    });

    return result;
  }, [customers, searchTerm, activeFilters]);

  // Handle search changes
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    // Implementation for search logic would go here
  };

  // Handle clear all filters
  const handleClearFilters = () => {
    setActiveFilters([]);
  };

  // Handle customer click to show details
  const handleCustomerClick = (customer) => {
    console.log("Customer clicked:", customer);
    setSelectedCustomer(customer);
    setIsCustomerDetailsOpen(true);
    console.log("Popup should be open now");
  };

  // Handle closing customer details
  const handleCloseCustomerDetails = () => {
    setIsCustomerDetailsOpen(false);
    setSelectedCustomer(null);
  };

  // Calculate customer analytics for creative display
  const customerAnalytics = useMemo(() => {
    if (!customers || customers.length === 0) return null;

    const totalCustomers = customers.length;
    const activeCustomers = customers.filter(c => c.isActive).length;
    const vipCustomers = customers.filter(c => c.status === 'VIP').length;
    const regularCustomers = customers.filter(c => c.status === 'Regular').length;
    const walkInCustomers = customers.filter(c => c.status === 'Walk-in').length;
    const inactiveCustomers = customers.filter(c => c.status === 'Inactive').length;

    const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
    const avgRevenue = totalCustomers > 0 ? totalRevenue / totalCustomers : 0;

    const totalVisits = customers.reduce((sum, c) => sum + c.visits, 0);
    const avgVisits = totalCustomers > 0 ? totalVisits / totalCustomers : 0;

    const recentCustomers = customers.filter(c => {
      const createdAt = new Date(c.createdAt);
      const now = new Date();
      const daysDiff = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));
      return daysDiff <= 30;
    }).length;

    // Activity levels
    const highlyActive = customers.filter(c => c.visits >= 10).length;
    const moderatelyActive = customers.filter(c => c.visits >= 5 && c.visits < 10).length;
    const lowActive = customers.filter(c => c.visits >= 1 && c.visits < 5).length;
    const newCustomers = customers.filter(c => c.visits === 0).length;

    // Top customers by spending
    const topSpenders = [...customers]
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 3);

    // Recent activity (last 7 days)
    const recentActivity = customers.filter(c => {
      if (c.lastVisit === 'Never') return false;
      const lastVisitDate = new Date(c.lastVisit);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return lastVisitDate >= weekAgo;
    });

    return {
      totalCustomers,
      activeCustomers,
      vipCustomers,
      regularCustomers,
      walkInCustomers,
      inactiveCustomers,
      totalRevenue,
      avgRevenue,
      totalVisits,
      avgVisits,
      recentCustomers,
      activityLevels: {
        highlyActive,
        moderatelyActive,
        lowActive,
        newCustomers
      },
      topSpenders,
      recentActivity: recentActivity.length
    };
  }, [customers]);

  return (
    <div className="mb-8">
      {/* Section Header with Customer Summary */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Customer Management
            </h2>
            <p className="text-gray-600">
              Manage your customers and track their activity
            </p>
          </div>
          {customerAnalytics && (
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{customerAnalytics.totalCustomers}</div>
              <div className="text-sm text-gray-500">Total Customers</div>
            </div>
          )}
        </div>
      </div>

      {/* Creative Customer Analytics Cards */}
      {customerAnalytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Customers */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Customers</p>
                <p className="text-3xl font-bold">{customerAnalytics.totalCustomers}</p>
              </div>
              <div className="w-12 h-12 bg-blue-400 bg-opacity-30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Active Customers */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Active Customers</p>
                <p className="text-3xl font-bold">{customerAnalytics.activeCustomers}</p>
                <p className="text-green-100 text-xs mt-1">
                  {customerAnalytics.totalCustomers > 0
                    ? `${Math.round((customerAnalytics.activeCustomers / customerAnalytics.totalCustomers) * 100)}%`
                    : '0%'
                  } of total
                </p>
              </div>
              <div className="w-12 h-12 bg-green-400 bg-opacity-30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* VIP Customers */}
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">VIP Customers</p>
                <p className="text-3xl font-bold">{customerAnalytics.vipCustomers}</p>
                <p className="text-purple-100 text-xs mt-1">Premium members</p>
              </div>
              <div className="w-12 h-12 bg-purple-400 bg-opacity-30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold">₹{customerAnalytics.totalRevenue.toLocaleString()}</p>
                <p className="text-emerald-100 text-xs mt-1">
                  Avg: ₹{Math.round(customerAnalytics.avgRevenue).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-400 bg-opacity-30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customer Activity & Information Overview //new */}
      {customerAnalytics && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Customer Activity Levels */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              Customer Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Highly Active (10+)</span>
                </div>
                <span className="font-semibold text-gray-900">{customerAnalytics.activityLevels.highlyActive}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Moderately Active (5-9)</span>
                </div>
                <span className="font-semibold text-gray-900">{customerAnalytics.activityLevels.moderatelyActive}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Low Activity (1-4)</span>
                </div>
                <span className="font-semibold text-gray-900">{customerAnalytics.activityLevels.lowActive}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">New Customers (0)</span>
                </div>
                <span className="font-semibold text-gray-900">{customerAnalytics.activityLevels.newCustomers}</span>/
              </div>
            </div>
          </div>

          {/* Customer Types Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              Customer Types
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">VIP Customers</span>
                </div>
                <span className="font-semibold text-gray-900">{customerAnalytics.vipCustomers}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Regular Customers</span>
                </div>
                <span className="font-semibold text-gray-900">{customerAnalytics.regularCustomers}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Walk-in Customers</span>
                </div>
                <span className="font-semibold text-gray-900">{customerAnalytics.walkInCustomers}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Inactive Customers</span>
                </div>
                <span className="font-semibold text-gray-900">{customerAnalytics.inactiveCustomers}</span>
              </div>
            </div>
          </div>

          {/* Recent Activity & Growth */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{customerAnalytics.recentCustomers}</div>
                <div className="text-sm text-gray-600">Added this month</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">{customerAnalytics.recentActivity}</div>
                <div className="text-sm text-gray-600">Active this week</div>
              </div>
              <div className="pt-3 border-t border-gray-100">
                <div className="text-sm text-gray-600 mb-2">Growth Rate</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (customerAnalytics.recentCustomers / Math.max(customerAnalytics.totalCustomers, 1)) * 100)}%`
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {customerAnalytics.totalCustomers > 0
                      ? `${Math.round((customerAnalytics.recentCustomers / customerAnalytics.totalCustomers) * 100)}%`
                      : '0%'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Customers & Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
              Top Customers
            </h3>
            <div className="space-y-3 mb-6">
              {customerAnalytics.topSpenders.slice(0, 3).map((customer, index) => (
                <div key={customer.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${index === 0 ? 'bg-yellow-500 text-white' :
                      index === 1 ? 'bg-gray-400 text-white' :
                        'bg-orange-600 text-white'
                      }`}>
                      {index + 1}
                    </div>
                    <span className="text-sm text-gray-600 truncate max-w-24">{customer.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">₹{customer.totalSpent.toLocaleString()}</span>
                </div>
              ))}
            </div> 
          </div>
        </div>
      )}

      {/* Filter Bar */}
      <FilterBar
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        activeFilters={activeFilters}
        onClearFilters={handleClearFilters}
        onAddCustomer={onAddCustomer}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Table - Takes 2/3 of the width on large screens */}
        <div className="lg:col-span-2">
          <CustomerTable
            customers={filteredCustomers}
            onSelectCustomer={handleCustomerSelect}
            onSelectAll={handleSelectAll}
            selectedCustomers={selectedCustomers}
            onCustomerClick={handleCustomerClick}
            onEditCustomer={onEditCustomer}
            onDeleteCustomer={onDeleteCustomer}
          />
        </div>

        {/* Feedback Overview - Takes 1/3 of the width on large screens */}
        <div className="lg:col-span-1">
          <FeedbackOverview feedbackData={feedbackData} />
        </div>
      </div>

      {/* Customer Details Popup */}
      <CustomerDetails
        isOpen={isCustomerDetailsOpen}
        onClose={handleCloseCustomerDetails}
        customer={selectedCustomer}
      />
    </div>
  );
};

export default CustomerManagement;
