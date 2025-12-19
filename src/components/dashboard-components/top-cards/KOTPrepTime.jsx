import React from 'react'
import { IoDocumentText } from "react-icons/io5";
import { FaChartLine } from "react-icons/fa6";
import { FaLongArrowAltUp } from "react-icons/fa";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaLongArrowAltDown } from "react-icons/fa";


const KOTPrepTime = () => {
  return (
    <div className="w-full bg-white rounded-lg flex flex-col px-3 justify-center border-1 border-gray-300 h-[130px]">
          <div className="flex flex-row justify-between">
            <h2 className="text-[13px] text-gray-500">KOT Prep Time (min)</h2>
            <FaChartLine size={14} color="green" />
          </div>
          <div>
            <h1 className="text-[24px] font-semibold mt-3">18</h1>
          </div>
          <div className="flex items-center -mt-1"> 
            <FaLongArrowAltUp size={12} style={{ color: "#16A34A" }} />
            <h3 className="text-[14px] font-medium text-[#16A34A]">+2.1%</h3>
          </div>
        </div>
  )
}

export default KOTPrepTime