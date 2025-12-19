import React from "react";
import { BsDot } from "react-icons/bs";

const Table6 = ({ onNewOrder }) => {
  return (
    <div className="w-[230px] border border-green-500 bg-green-50 rounded-lg p-5 flex flex-col justify-between shadow-sm">
      {/* Top Row */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-1">
          <h2 className="text-xl font-bold text-gray-900">T06</h2>
          <BsDot className="text-green-500 text-2xl" />
        </div>
        <p className="text-gray-500 text-sm">2 seats</p>
      </div>

      {/* Status */}
      <p className="text-green-600 font-medium text-[14px] mt-3">Available</p>

      {/* Details */}
      <div className="text-gray-600 text-[13px] mt-2 leading-relaxed">
        <p>No current order</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-1 mt-4">
        <button
          onClick={onNewOrder}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-[12px] font-medium transition"
        >
          New Order
        </button>
        <button className="border border-green-500 text-green-500 hover:bg-green-100 px-4 py-2 rounded-md text-[12px] font-medium transition">
          Reserve
        </button>
      </div>
    </div>
  );
};

export default Table6;
