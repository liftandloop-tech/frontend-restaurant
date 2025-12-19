import React from "react";

const OrderNotes = () => {
  return (
    <div>
      <label
        htmlFor="change-order-notes"
        className="text-sm font-semibold text-gray-800"
      >
        Order Notes
      </label>
      <textarea
        id="change-order-notes"
        rows="3"
        placeholder="Notes for this change..."
        className="mt-2 w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      ></textarea>
    </div>
  );
};

export default OrderNotes;
