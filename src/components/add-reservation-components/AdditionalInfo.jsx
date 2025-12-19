import React from "react";
import PropTypes from "prop-types";

/**
 * AdditionalInfo: notes and deposit fields.
 */
const AdditionalInfo = ({ form, onChange }) => {
  return (
    <div className="grid grid-cols-1 gap-3">
      <label className="block text-[12px]">
        <span className="block mb-1 text-gray-700">
          Special Requests / Notes
        </span>
        <textarea
          rows={4}
          className="w-full px-3 py-2 rounded-md border border-gray-200 bg-white text-[13px] placeholder:text-gray-400"
          placeholder="Any dietary restrictions, occasions, or other notes..."
          value={form.notes}
          onChange={(e) => onChange("notes", e.target.value)}
        />
      </label>

      <label className="block text-[12px] w-full md:w-[280px]">
        <span className="block mb-1 text-gray-700">
          Deposit / Advance Payment
        </span>
        <input
          type="number"
          className="w-full h-9 px-3 rounded-md border border-gray-200 bg-white text-[13px]"
          placeholder="$ 0.00"
          value={form.deposit}
          onChange={(e) => onChange("deposit", e.target.value)}
        />
      </label>
    </div>
  );
};

AdditionalInfo.propTypes = {
  form: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AdditionalInfo;
