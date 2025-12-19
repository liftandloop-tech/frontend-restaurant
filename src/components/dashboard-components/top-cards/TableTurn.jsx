import React from "react";
import { IoDocumentText } from "react-icons/io5";
import { FaChartLine } from "react-icons/fa6";
import { FaLongArrowAltUp } from "react-icons/fa";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaLongArrowAltDown } from "react-icons/fa";

const TableTurn = () => {
  return (
    <div>
      <div className="w-full bg-white rounded-lg flex flex-col px-3 justify-center border-1 border-gray-300 h-[130px]">
        <div className="flex flex-row justify-between">
          <h2 className="text-[13px] text-gray-500">Table Turn (min)</h2>
          <MdOutlineAccessTimeFilled size={14} color="orange" />
        </div>
        <div>
          <h1 className="text-[24px] font-semibold mt-3">52</h1>
        </div>
        <div className="flex items-center -mt-1">
          <FaLongArrowAltDown size={12} style={{ color: "#DC2626" }} />
          <h3 className="text-[14px] font-medium text-[#DC2626]">-5.3%</h3>
        </div>
      </div>
    </div>
  );
};

export default TableTurn;
