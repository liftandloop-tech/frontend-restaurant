import React from "react";
import PropTypes from "prop-types";

/**
 * ReservationDetails: date, time, party size, table, staff.
 */
const ReservationDetails = ({ form, onChange, availableTables = [] }) => {
  // Build table options - use available tables from API, or fallback to default
  const tableOptions = availableTables.length > 0
    ? ["Select table", ...availableTables.map(t => t.label)]
    : ["Select table", "Table 1", "Table 2", "Table 3", "Table 4", "Table 5"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="grid grid-cols-2 gap-3">
        <LabeledInput
          type="date"
          label="Date *"
          placeholder="mm/dd/yyyy"
          value={form.date}
          onChange={(e) => onChange("date", e.target.value)}
          min={new Date().toISOString().split('T')[0]} // Prevent past dates
        />
        <LabeledInput
          type="time"
          label="Time *"
          placeholder="--:-- --"
          value={form.time}
          onChange={(e) => onChange("time", e.target.value)}
        />
      </div>

      <LabeledSelect
        label="Party Size *"
        value={form.partySize}
        onChange={(e) => onChange("partySize", e.target.value)}
        options={["1", "2", "3", "4", "5", "6", "7", "8+"]}
      />

      <LabeledSelect
        label="Table Assignment *"
        value={form.table}
        onChange={(e) => onChange("table", e.target.value)}
        options={tableOptions}
      />

      <LabeledSelect
        label="Assigned Staff"
        value={form.staff}
        onChange={(e) => onChange("staff", e.target.value)}
        options={["Auto-assign staff", "Alex", "Priya", "Miguel"]}
      />
    </div>
  );
};

ReservationDetails.propTypes = {
  form: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ReservationDetails;

const LabeledInput = ({ label, ...rest }) => (
  <label className="block text-[12px]">
    <span className="block mb-1 text-gray-700">{label}</span>
    <input
      className="w-full h-9 px-3 rounded-md border border-gray-200 bg-white text-[13px] placeholder:text-gray-400"
      {...rest}
    />
  </label>
);

const LabeledSelect = ({ label, options, ...rest }) => (
  <label className="block text-[12px]">
    <span className="block mb-1 text-gray-700">{label}</span>
    <select
      className="w-full h-9 px-2 rounded-md border border-gray-200 bg-white text-[13px]"
      {...rest}
    >
      {options.map((opt) => (
        <option key={opt} value={opt === "Select table" ? "" : opt}>
          {opt}
        </option>
      ))}
    </select>
  </label>
);

LabeledInput.propTypes = { label: PropTypes.string.isRequired };
LabeledSelect.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};
