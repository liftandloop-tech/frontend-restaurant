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

  return (//new
    <div className="w-full flex items-center justify-between gap-2 mt-4">
      <div className="flex items-center gap-2">
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
      </div>

      <button
        onClick={onToggleServingInfo}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all border-2 ${showServingInfo
            ? "bg-slate-900 text-white border-slate-900"
            : "bg-white text-slate-700 border-slate-200 hover:border-slate-900"
          }`}
      >
        <div className={`w-2 h-2 rounded-full ${showServingInfo ? "bg-green-400 animate-pulse" : "bg-gray-400"}`} />
        {showServingInfo ? "Hide Serving Info Page" : "Show Serving Info Page"}
        <span className="ml-1 bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-[10px] uppercase">New</span>
      </button>
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
  showServingInfo: PropTypes.bool,
  onToggleServingInfo: PropTypes.func,
};

Filters.defaultProps = {
  statusFilter: "all",
  capacityFilter: "",
  locationFilter: "",
  showServingInfo: false,
};

export default Filters;
