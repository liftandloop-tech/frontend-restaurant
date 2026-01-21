import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { FaCalendar } from "react-icons/fa6";
import { BsDot } from "react-icons/bs";
import { getTables } from "../../../utils/tables";

const TableCard = ({ table, onNewOrder }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'green';
      case 'serving': return 'blue';
      case 'reserved': return 'orange';
      case 'cleaning': return 'yellow';
      default: return 'gray';
    }
  };

  const statusColor = getStatusColor(table.status);

  return (
    <div className={`w-[230px] border border-${statusColor}-500 bg-${statusColor}-50 rounded-lg p-5 flex flex-col justify-between shadow-sm min-h-[180px]`}>
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-1">
          <h2 className="text-xl font-bold text-gray-900">T{table.tableNumber.toString().padStart(2, '0')}</h2>
          <BsDot className={`text-${statusColor}-500 text-2xl`} />
        </div>
        <p className="text-gray-500 text-sm">{table.capacity} seats</p>
      </div>

      <p className={`text-${statusColor}-600 font-medium text-[14px] mt-3 capitalize`}>{table.status}</p>

      <div className="text-gray-600 text-[13px] mt-2 leading-relaxed">
        <p>{table.status === 'serving' ? 'Currently occupied' : 'No current order'}</p>
      </div>

      <div className="flex gap-1 mt-4">
        {table.status === 'available' && (
          <button
            onClick={() => onNewOrder(table)}
            className={`bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-[11px] font-medium transition flex-1`}
          >
            Take Order
          </button>
        )}
        <button className={`border border-${statusColor}-500 text-${statusColor}-500 hover:bg-${statusColor}-100 px-3 py-2 rounded-md text-[11px] font-medium transition flex-1`}>
          {table.status === 'reserved' ? 'View' : 'Available'}
        </button>
      </div>
    </div>
  );
};

const TableStatus = ({ onTakeOrder }) => {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchTables = async () => {
      try {
        setLoading(true);
        const response = await getTables();
        if (response?.success) {
          setTables(response.data);
        }
      } catch (err) {
        console.error("Error fetching tables:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTables();
  }, []);

  const filteredTables = filter === "all"
    ? tables
    : tables.filter(t => t.status === filter);

  return (
    <div className="bg-white rounded-xl flex flex-col justify-center h-fit border-1 px-5 py-7 border-gray-300 w-full">
      <div className="w-full flex flex-row justify-between items-center mb-5">
        <h2 className="text-[20px] font-medium">Table Status</h2>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => onTakeOrder()}
            className="border-none outline-none bg-[#2563EB] py-[4px] text-[15px] px-3 rounded-lg"
          >
            <div className="flex items-center gap-2 justify-center">
              <AiOutlinePlus size={14} color="white" />
              <h3 className="text-white">Take Order</h3>
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
      </div>

      <div className="flex gap-3">
        {["all", "available", "serving", "reserved"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`border outline-none py-[3px] px-3 rounded-lg text-[13px] capitalize transition ${filter === f ? "bg-[#2563EB] text-white border-[#2563EB]" : "bg-white text-gray-700 border-gray-300"
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex gap-4 flex-wrap justify-center mt-7">
        {loading ? (
          <div className="py-10 text-gray-500 italic">Updating table status...</div>
        ) : filteredTables.length === 0 ? (
          <div className="py-10 text-gray-500 italic">No tables found for this filter.</div>
        ) : (
          filteredTables.slice(0, 6).map(table => (
            <TableCard key={table._id || table.id} table={table} onNewOrder={onTakeOrder} />
          ))
        )}
      </div>

      <div className="flex justify-center mt-10 items-center">
        <button
          onClick={() => navigate("/tables")}
          className="border border-gray-300 bg-white text-[13px] py-[4px] px-5 rounded-lg hover:bg-gray-50 transition"
        >
          View All Tables
        </button>
      </div>
    </div>
  );
};

TableStatus.propTypes = {
  onTakeOrder: PropTypes.func.isRequired,
};

export default TableStatus;
