import React from "react";
import PropTypes from "prop-types";

/**
 * FiltersBar renders the top control bar with date range, party size, status chips
 * and a primary button to create a new reservation.
 */
const FiltersBar = ({
  onNewReservation,
  statusFilter,
  setStatusFilter,
  dateRange,
  setDateRange,
  partySize,
  setPartySize
}) => {
  const statusOptions = ["All", "Upcoming", "Checked-in", "Completed", "Cancelled"];
  const partySizeOptions = ["All Sizes", "1-2", "3-4", "5-6", "7-8", "8+"];

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg p-3 flex flex-wrap gap-3 items-center justify-between mb-10">
      <div className="flex flex-wrap gap-3 items-center">
        <Dropdown
          label="Date Range"
          value={dateRange}
          options={["This Week (Mon–Sun)", "Today", "Tomorrow"]}
          onChange={setDateRange}
        />
        <Dropdown
          label="Party Size"
          value={partySize}
          options={partySizeOptions}
          onChange={setPartySize}
        />
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-gray-600">Status:</span>
          {statusOptions.map(option => (
            <Chip
              key={option}
              label={option}
              active={statusFilter === option.toLowerCase() || (option === "All" && statusFilter === "all")}
              onClick={() => setStatusFilter(option === "All" ? "all" : option.toLowerCase())}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onNewReservation}
        className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-blue-600 text-white text-[13px] hover:bg-blue-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        New Reservation
      </button>
    </div>
  );
};

FiltersBar.propTypes = {
  onNewReservation: PropTypes.func,
  statusFilter: PropTypes.string,
  setStatusFilter: PropTypes.func,
  dateRange: PropTypes.string,
  setDateRange: PropTypes.func,
  partySize: PropTypes.string,
  setPartySize: PropTypes.func,
};

const Dropdown = ({ label, value, options, onChange }) => {
  return (
    <div className="flex items-center gap-2 h-9 pl-3 pr-1 rounded-md border border-gray-200 bg-white">
      <span className="text-[12px] text-gray-600 truncate">{label}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-[12px] text-gray-800 focus:outline-none cursor-pointer pr-1"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

const Chip = ({ label, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`h-7 px-2 rounded-md text-[12px] border transition-colors ${active
        ? "bg-blue-50 text-blue-700 border-blue-200 font-medium"
        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
      }`}
  >
    {label}
  </button>
);

Chip.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

Chip.defaultProps = {
  active: false,
  onClick: () => { },
};

export default FiltersBar;
