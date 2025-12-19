import React, { useState } from "react";
import { BsDot } from "react-icons/bs";
import ChangeOrder from "../../../ChangeOrder";

const Table2 = () => {
  const [showChangeOrder, setShowChangeOrder] = useState(false);
  return (
    <div className="w-[230px] border border-blue-500 bg-blue-50 rounded-lg p-5 flex flex-col justify-between shadow-sm">
      {/* Top Row */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-1">
          <h2 className="text-xl font-bold text-gray-900">T02</h2>
          <BsDot className="text-blue-500 text-2xl" />
        </div>
        <p className="text-gray-500 text-sm">2 seats</p>
      </div>

      {/* Status */}
      <p className="text-blue-600 font-medium text-[14px] mt-3">Serving</p>

      {/* Details */}
      <div className="text-gray-600 text-[13px] mt-2 leading-relaxed">
        <p>
          <span className="font-medium">Server:</span> John • 25 min
        </p>
        <p>2 guests • 1 KOT</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-1 mt-4">
        <button
          onClick={() => setShowChangeOrder(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-[12px] font-medium transition"
        >
          View Order
        </button>
        <button className="border border-blue-500 text-blue-500 hover:bg-blue-100 px-4 py-2 rounded-md text-[12px] font-medium transition">
          Transfer
        </button>
      </div>
      {showChangeOrder && (
        <ChangeOrder
          show={showChangeOrder}
          onClose={() => setShowChangeOrder(false)}
          initialItems={[]}
        />
      )}
    </div>
  );
};

export default Table2;
