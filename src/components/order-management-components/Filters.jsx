import React from 'react';
import { FiSearch, FiCalendar, FiFilter } from 'react-icons/fi';

const Filters = ({ filters, onFilterChange, totalOrders }) => {
  const statusOptions = [
    { value: 'all', label: 'All Orders', count: totalOrders },
    { value: 'pending', label: 'Pending', count: 0 },
    { value: 'preparing', label: 'Preparing', count: 0 },
    { value: 'ready', label: 'Ready', count: 0 },
    { value: 'served', label: 'Served', count: 0 },
    { value: 'completed', label: 'Completed', count: 0 },
    { value: 'cancelled', label: 'Cancelled', count: 0 }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const sortOptions = [
    { value: 'orderTime', label: 'Order Time' },
    { value: 'customerName', label: 'Customer Name' },
    { value: 'totalAmount', label: 'Total Amount' },
    { value: 'status', label: 'Status' }
  ];

  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search orders, customers, or table numbers..."
              value={filters.search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Date Range Filter */}
          <div className="flex items-center space-x-2">
            <FiCalendar className="h-5 w-5 text-gray-400" />
            <select
              value={filters.dateRange}
              onChange={(e) => onFilterChange({ dateRange: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              {dateRangeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <FiFilter className="h-5 w-5 text-gray-400" />
            <select
              value={filters.status}
              onChange={(e) => onFilterChange({ status: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label} ({option.count})
                </option>
              ))}
            </select>
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-2">
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  Sort by {option.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => onFilterChange({ 
                sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' 
              })}
              className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              {filters.sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="mt-4">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {statusOptions.map(option => (
            <button
              key={option.value}
              onClick={() => onFilterChange({ status: option.value })}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                filters.status === option.value
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {option.label}
              <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                filters.status === option.value
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {option.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Results Summary */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <div>
          Showing {totalOrders} orders
          {filters.search && (
            <span className="ml-2">
              for "<span className="font-medium">{filters.search}</span>"
            </span>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <span>Date Range: {dateRangeOptions.find(opt => opt.value === filters.dateRange)?.label}</span>
          <span>Sort: {sortOptions.find(opt => opt.value === filters.sortBy)?.label} ({filters.sortOrder})</span>
        </div>
      </div>
    </div>
  );
};

export default Filters;
