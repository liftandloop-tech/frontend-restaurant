import React from "react";
import PropTypes from "prop-types";

/**
 * FiltersBar renders the top control bar with date range, party size, status chips
 * and a primary button to create a new reservation.
 */
const FiltersBar = ({ onNewReservation }) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg p-3 flex flex-wrap gap-3 items-center justify-between mb-10">
      <div className="flex flex-wrap gap-3 items-center">
        <Dropdown label="Date Range" value="This Week (Mon–Sun)" />
        <Dropdown label="Party Size" value="All Sizes" />
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-gray-600">Status:</span>
          <Chip label="All" active />
          <Chip label="Upcoming" />
          <Chip label="Checked-in" />
          <Chip label="Completed" />
          <Chip label="Cancelled" />
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
};

FiltersBar.defaultProps = {
  onNewReservation: () => {},
};

const Dropdown = ({ label, value }) => {
  return (
    <div className="flex items-center gap-2 h-9 pl-3 pr-2 rounded-md border border-gray-200 bg-white">
      <span className="text-[12px] text-gray-600">{label}:</span>
      <button
        type="button"
        className="flex items-center gap-1 text-[12px] text-gray-800"
      >
        <span>{value}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4 text-gray-500"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const Chip = ({ label, active }) => (
  <button
    type="button"
    className={`h-7 px-2 rounded-md text-[12px] border ${
      active
        ? "bg-blue-50 text-blue-700 border-blue-200"
        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
    }`}
  >
    {label}
  </button>
);

Chip.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

Chip.defaultProps = {
  active: false,
};

export default FiltersBar;


