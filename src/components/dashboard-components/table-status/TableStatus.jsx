import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FaGooglePlus, FaPlus } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { AiOutlinePlus } from "react-icons/ai";
import { FaCalendar } from "react-icons/fa6";
import Table2 from "../table-cards/Table2";
import Table1 from "../table-cards/Table1";
import Table3 from "../table-cards/Table3";
import Table4 from "../table-cards/Table4";
import Table5 from "../table-cards/Table5";
import Table6 from "../table-cards/Table6";

const TableStatus = ({ onTakeOrder }) => {
  const navigate = useNavigate();

  const handleLoadMore = () => {
    navigate("/tables");
  };

  return (
    <div className="bg-white rounded-xl flex flex-col justify-center h-fit border-1 px-5 py-7 border-gray-300 w-[100%]">
      <div className="w-full flex flex-row justify-between items-center mb-5">
        <h2 className="text-[20px] font-medium">Tables Status</h2>
        <div className="flex gap-2 justify-center">
          <button
            onClick={onTakeOrder}
            className="border-none outline-none bg-[#2563EB] py-[4px] text-[15px] px-3 rounded-lg"
          >
            <div className="flex items-center gap-2 justify-center">
              <AiOutlinePlus size={14} color="white" />
              <h3 className="text-white">New Order</h3>
            </div>
          </button>
          <button
            onClick={() => navigate("/reservations/new")}
            className="border-1 border-gray-300 outline-none bg-[white] text-[15px] py-[4px] px-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2 justify-center">
              <FaCalendar size={14} color="black" />
              <h3 className="text-black">Book Table</h3>
            </div>
          </button>
        </div>
      </div>{" "}
      {/* Header */}
      <div className="flex gap-3">
        <button className="border-none outline-none text-white text-[13px] bg-[#2563EB] py-[3px] px-3 rounded-lg">
          All
        </button>
        <button className="border-1 border-gray-300 outline-none bg-[white] text-[13px] py-[3px] px-3 rounded-lg">
          Available
        </button>
        <button className="border-1 border-gray-300 outline-none bg-[white] text-[13px] py-[3px] px-3 rounded-lg">
          Serving
        </button>
        <button className="border-1 border-gray-300 outline-none bg-[white] text-[13px] py-[3px] px-3 rounded-lg">
          Reserved
        </button>
        <button className="border-1 border-gray-300 outline-none bg-[white] text-[13px] py-[3px] px-3 rounded-lg">
          All Capacity{" "}
        </button>
      </div>{" "}
      {/* Filters */}
      <div className="flex gap-4 flex-wrap justify-center mt-7">
        <Table1 onNewOrder={onTakeOrder} />
        <Table2 />
        <Table3 />
        <Table4 onNewOrder={onTakeOrder} />
        <Table5 />
        <Table6 onNewOrder={onTakeOrder} />
      </div>{" "}
      {/* Tables */}
      <div className="flex justify-center mt-10 items-center">
        <button
          onClick={handleLoadMore}
          className="border-1 border-gray-300 outline-none bg-[white] text-[13px] py-[4px] px-5 rounded-lg"
        >
          Load More Tables
        </button>
      </div>{" "}
    </div>
  );
};

TableStatus.propTypes = {
  onTakeOrder: PropTypes.func.isRequired,
};

export default TableStatus;
