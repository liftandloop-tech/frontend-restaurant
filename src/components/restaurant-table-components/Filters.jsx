import React from "react";
import PropTypes from "prop-types";

const FilterPill = ({ active, onClick, children }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-8 px-3 rounded-md text-[12px] border transition-colors ${active
        ? "bg-blue-600 text-white border-blue-600"
        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
        }`}
    >
      {children}
    </button>
  );
};

FilterPill.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

const Select = ({ label, value, onChange, options = [] }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="h-8 px-2 rounded-md border border-gray-200 bg-white text-[12px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
    >
      <option value="">{label}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

Select.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
};

const Filters = ({
  statusFilter,
  onStatusFilterChange,
  capacityFilter,
  onCapacityFilterChange,
  locationFilter,
  onLocationFilterChange,
  showServingInfo,
  onToggleServingInfo
}) => {
  // Capacity options
  const capacityOptions = [
    { value: "2", label: "2 Seats" },
    { value: "4", label: "4 Seats" },
    { value: "6", label: "6 Seats" },
    { value: "8", label: "8+ Seats" },
  ];

  // Location/Zone options
  const locationOptions = [
    { value: "indoor", label: "Indoor" },
    { value: "outdoor", label: "Outdoor" },
    { value: "vip", label: "VIP" },
    { value: "bar", label: "Bar" },
  ];

  return (
    <div className="w-full flex items-center gap-2 mt-4">
      <FilterPill
        active={statusFilter === "all"}
        onClick={() => onStatusFilterChange("all")}
      >
        All
      </FilterPill>
      <FilterPill
        active={statusFilter === "available"}
        onClick={() => onStatusFilterChange("available")}
      >
        Available
      </FilterPill>
      <FilterPill
        active={statusFilter === "serving"}
        onClick={() => onStatusFilterChange("serving")}
      >
        Serving
      </FilterPill>
      <FilterPill
        active={statusFilter === "reserved"}
        onClick={() => onStatusFilterChange("reserved")}
      >
        Reserved
      </FilterPill>
      <div className="ml-2 flex items-center gap-2">
        <Select
          label="All Capacity"
          value={capacityFilter}
          onChange={(e) => onCapacityFilterChange(e.target.value)}
          options={capacityOptions}
        />
        <Select
          label="All Zones"
          value={locationFilter}
          onChange={(e) => onLocationFilterChange(e.target.value)}
          options={locationOptions}
        />
      </div>

      {/* Toggle Button for Serving Summary */}
      <div className="ml-auto flex items-center">
        <button
          onClick={onToggleServingInfo}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm border transition-all ${showServingInfo
            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
        >
          {showServingInfo ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <span>Serving Summaries</span>
        </button>
      </div>
    </div>
  );
};

Filters.propTypes = {
  statusFilter: PropTypes.string,
  onStatusFilterChange: PropTypes.func.isRequired,
  capacityFilter: PropTypes.string,
  onCapacityFilterChange: PropTypes.func.isRequired,
  locationFilter: PropTypes.string,
  onLocationFilterChange: PropTypes.func.isRequired,
};

Filters.defaultProps = {
  statusFilter: "all",
  capacityFilter: "",
  locationFilter: "",
};

export default Filters;
