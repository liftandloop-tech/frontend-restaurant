import React from "react";
import { BsDot } from "react-icons/bs";

const Table3 = () => {
  return (
    <div className="w-[230px] border border-amber-500 bg-amber-50 rounded-lg p-5 flex flex-col justify-between shadow-sm">
      {/* Top Row */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-1">
          <h2 className="text-xl font-bold text-gray-900">T03</h2>
          <BsDot className="text-amber-500 text-2xl" />
        </div>
        <p className="text-gray-500 text-sm">6 seats</p>
      </div>

      {/* Status */}
      <p className="text-amber-600 font-medium text-[14px] mt-3">Reserved</p>

      {/* Time Window */}
      <p className="text-gray-600 text-[15px] mt-2">1:30 PM - 3:00 PM</p>

      {/* Buttons */}
      <div className="flex gap-2 mt-4">
        <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md text-[12px] font-medium transition">
          Check In
        </button>
        <button className="border border-amber-500 text-amber-500 hover:bg-amber-100 px-4 py-2 rounded-md text-[12px] font-medium transition">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Table3;
