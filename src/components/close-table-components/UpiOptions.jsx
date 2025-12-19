import React from "react";

const UpiOptions = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-base font-semibold text-gray-800 mb-3">
        Choose UPI Method
      </h2>
      <div className="flex flex-col items-start pl-2 gap-3 pt-3 text-sm">
        <label className="flex -ml-1 border-gray-200 border-1 w-[90%] rounded-lg py-3 pl-3 items-center gap-2">
          <input type="radio" name="upi" defaultChecked />
          <span className="font-normal text-[14px]">Scan QR Code</span>
        </label>
        <label className="flex -ml-1 border-gray-200 border-1 w-[90%] rounded-lg py-3 pl-3 items-center gap-2">
          <input type="radio" name="upi" />
          <span className="font-normal text-[14px]">Enter UPI ID</span>
        </label>
        <label className="flex -ml-1 border-gray-200 border-1 w-[90%] rounded-lg py-3 pl-3 items-center gap-2">
          <input type="radio" name="upi" />
          <span className="font-normal text-[14px]">Send Collect Request</span>
        </label>
      </div>
    </div>
  );
};

export default UpiOptions;
