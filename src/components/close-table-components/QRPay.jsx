import React from "react";
import PropTypes from "prop-types";

const QRPay = ({ amount }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-base font-semibold text-gray-800 mb-3">Scan QR Code to Pay</h2>
      <div className="flex items-center justify-center">
        <div className="w-40 h-40 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
          QR
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600 flex items-center justify-between">
        <span>To be paid</span>
        <span className="font-semibold">₹{amount}</span>
      </div>
      <div className="mt-3">
        <button className="h-9 px-3 border border-gray-300 rounded-md text-sm">Payment OK</button>
      </div>
      <div className="mt-7 grid px-15 grid-cols-3 gap-3">
        <div className="h-16 rounded-lg flex items-center justify-center text-sm font-medium text-white bg-gradient-to-br from-blue-500 to-blue-700">PhonePe</div>
        <div className="h-16 rounded-lg flex items-center justify-center text-sm font-medium text-white bg-gradient-to-br from-blue-500 to-cyan-500">GPay</div>
        <div className="h-16 rounded-lg flex items-center justify-center text-sm font-medium text-white bg-gradient-to-br from-sky-500 to-indigo-500">Paytm</div>
      </div>
    </div>
  );
};

QRPay.propTypes = {
  amount: PropTypes.number.isRequired,
};

export default QRPay;


