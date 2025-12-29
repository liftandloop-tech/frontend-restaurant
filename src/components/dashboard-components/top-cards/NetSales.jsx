import React from "react";
import { FaChartLine } from "react-icons/fa6";
import { FaLongArrowAltUp } from "react-icons/fa";


import { FaLongArrowAltDown } from "react-icons/fa";

const NetSales = ({ value = 0, trend = 0 }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const isPositive = trend >= 0;

  return (
    <div className="w-full bg-white rounded-lg flex flex-col px-3 justify-center border-1 border-gray-300 h-[130px]">
      <div className="flex flex-row justify-between">
        <h2 className="text-[13px] text-gray-500">Net Sales (Today)</h2>
        <FaChartLine size={14} color="green" />
      </div>
      <div>
        <h1 className="text-[24px] font-semibold mt-3">{formatCurrency(value)}</h1>
      </div>
      <div className="flex items-center -mt-1">
        {isPositive ? (
          <FaLongArrowAltUp size={12} style={{ color: "#16A34A" }} />
        ) : (
          <FaLongArrowAltDown size={12} style={{ color: "#DC2626" }} />
        )}
        <h3 className={`text-[14px] font-medium ${isPositive ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
          {isPositive ? '+' : ''}{trend}%
        </h3>
      </div>
    </div>
  );
};

export default NetSales;
