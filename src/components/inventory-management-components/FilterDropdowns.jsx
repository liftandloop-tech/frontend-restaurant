import React from "react";

/**
 * FilterDropdowns component for filtering inventory data
 * @param {object} filters - Current filter values
 * @param {function} onFilterChange - Function to handle filter changes
 */
const FilterDropdowns = ({ filters, onFilterChange }) => {
  // Define filter options
  const categoryOptions = [
    { label: "All Categories", value: "All Categories" },
    { label: "Vegetables", value: "vegetable" },
    { label: "Fruit", value: "fruit" },
    { label: "Meat", value: "meat" },
    { label: "Dairy", value: "dairy" },
    { label: "Beverage", value: "beverage" },
    { label: "Spice", value: "spice" },
    { label: "Grain", value: "grain" },
    { label: "Dryfood", value: "dryfood" },
    { label: "Other", value: "other" },
  ];

  const statusOptions = ["All Status", "In Stock", "Low Stock", "Out of Stock"];

  return (
    <div className="flex gap-4 mb-6">
      {/* Category Filter */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          All Categories
        </label>
        <select
          className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm text-gray-700 cursor-pointer hover:border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 min-w-[160px]"
          value={filters.category}
          onChange={(e) => onFilterChange("category", e.target.value)}
        >
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="absolute right-2 top-7 text-gray-500 pointer-events-none text-sm">
          ▼
        </span>
      </div>

      {/* Status Filter */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          All Status
        </label>
        <select
          className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm text-gray-700 cursor-pointer hover:border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 min-w-[160px]"
          value={filters.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="absolute right-2 top-7 text-gray-500 pointer-events-none text-sm">
          ▼
        </span>
      </div>
    </div>
  );
};

export default FilterDropdowns;
