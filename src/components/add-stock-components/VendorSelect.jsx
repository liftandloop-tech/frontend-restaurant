import React from "react";

/**
 * VendorSelect Component
 *
 * Dropdown component for selecting vendors/suppliers
 * Matches the styling of other dropdown components in the project
 */
const VendorSelect = ({ value, onChange, required = false }) => {
  // Mock vendors - in a real app, these would come from a database
  const vendors = [
    "Fresh Foods Supply Co.",
    "Metro Wholesale",
    "Local Farm Direct",
    "Premium Ingredients Ltd.",
    "Bulk Buyers Inc.",
    "Organic Suppliers",
    "Restaurant Depot",
    "Sysco Corporation",
    "US Foods",
    "Gordon Food Service",
    "KeHE Distributors",
    "Reinhart FoodService",
  ];

  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-700">Vendor</label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required={required}
        >
          <option value="">Select vendor...</option>
          {vendors.map((vendor) => (
            <option
              key={vendor}
              value={vendor.toLowerCase().replace(/\s+/g, "_")}
            >
              {vendor}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default VendorSelect;
