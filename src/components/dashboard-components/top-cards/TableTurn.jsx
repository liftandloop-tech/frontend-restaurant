import React from "react";
import { IoDocumentText } from "react-icons/io5";
import { FaChartLine } from "react-icons/fa6";
import { FaLongArrowAltUp } from "react-icons/fa";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaLongArrowAltDown } from "react-icons/fa";

const TableTurn = ({ value = 0, trend = 0 }) => {

  return (
    <div>
      <div className="w-full bg-white rounded-lg flex flex-col px-3 justify-center border-1 border-gray-300 h-[130px]">
        <div className="flex flex-row justify-between">
          <h2 className="text-[13px] text-gray-500">Avg Dining Time (min)</h2>
          <MdOutlineAccessTimeFilled size={14} color="orange" />
        </div>
        <div>
          <h1 className="text-[24px] font-semibold mt-3">{value}</h1>
        </div>
        <div className="flex items-center -mt-1">
          {trend <= 0 ? (
            <FaLongArrowAltDown size={12} style={{ color: "#16A34A" }} />
          ) : (
            <FaLongArrowAltUp size={12} style={{ color: "#DC2626" }} />
          )}
          <h3 className={`text-[14px] font-medium ${trend <= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
            {trend}%
          </h3>
        </div>
      </div>
    </div>
  );
};

export default TableTurn;
