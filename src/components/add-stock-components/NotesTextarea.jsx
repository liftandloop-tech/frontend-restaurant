import React from "react";

/**
 * NotesTextarea Component
 *
 * Textarea component for notes field with placeholder text
 * Matches the styling shown in the Add Stock modal image
 */
const NotesTextarea = ({ value, onChange, required = false }) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-700">Notes</label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder="Delivery details, invoice number, special instructions..."
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        required={required}
      />
    </div>
  );
};

export default NotesTextarea;
