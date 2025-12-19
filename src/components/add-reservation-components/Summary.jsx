import React from "react";
import PropTypes from "prop-types";

/**
 * Summary: read-only preview of entered details.
 */
const Summary = ({ form }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-2">
        <span className="w-5 h-5 grid place-items-center rounded-full bg-blue-600 text-white text-[11px]">
          4
        </span>
        <h3 className="text-[13px] font-medium">Reservation Summary</h3>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-[12px]">
        <div>
          <div className="text-gray-800 font-medium mb-2">Customer Details</div>
          <SummaryRow label="Name" value={form.name || "Will appear here"} />
          <SummaryRow label="Phone" value={form.phone || "Will appear here"} />
          <SummaryRow label="Email" value={form.email || "Will appear here"} />
          <div className="mt-3 text-gray-600">
            <div className="text-gray-800 font-medium mb-1">Special Notes</div>
            {form.notes ? form.notes : "No special notes"}
          </div>
        </div>
        <div>
          <div className="text-gray-800 font-medium mb-2">
            Reservation Details
          </div>
          <SummaryRow label="Date" value={form.date || "Will appear here"} />
          <SummaryRow label="Time" value={form.time || "Will appear here"} />
          <SummaryRow
            label="Party Size"
            value={form.partySize || "Will appear here"}
          />
          <SummaryRow label="Table" value={form.table || "Will appear here"} />
          <SummaryRow label="Staff" value={form.staff || "Will appear here"} />
        </div>
      </div>
    </div>
  );
};

Summary.propTypes = { form: PropTypes.object.isRequired };

export default Summary;

const SummaryRow = ({ label, value }) => (
  <div className="flex items-center justify-between py-1 border-b border-dashed border-gray-200">
    <span className="text-gray-600">{label}</span>
    <span className="text-gray-900">{value}</span>
  </div>
);

SummaryRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node,
};
