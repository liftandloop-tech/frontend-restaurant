import React from "react";

const ReceiptOptions = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-base font-semibold text-gray-800 mb-3">
        Receipt Options
      </h2>
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" defaultChecked /> Print KOT
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" defaultChecked /> Print Customer Bill
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" /> WhatsApp Copy
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" /> Email Copy
        </label>
      </div>
    </div>
  );
};

export default ReceiptOptions;
