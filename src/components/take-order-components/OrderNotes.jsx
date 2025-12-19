import React from "react";

const OrderNotes = ({ orderNotes, onOrderNotesChange }) => {
  return (
    <div>
      <label
        htmlFor="order-notes"
        className="text-sm font-semibold text-gray-800"
      >
        Order Notes
      </label>
      <textarea
        id="order-notes"
        rows="3"
        value={orderNotes || ""}
        onChange={(e) => onOrderNotesChange && onOrderNotesChange(e.target.value)}
        placeholder="Special requests for the entire order..."
        className="mt-2 w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      ></textarea>
    </div>
  );
};

export default OrderNotes;
