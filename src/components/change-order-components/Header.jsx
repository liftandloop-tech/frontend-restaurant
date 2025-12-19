import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ChevronDown, X } from "lucide-react";
import { getActiveWaiters } from "../../utils/staff";

const statusColors = {
  pending: "bg-yellow-500",
  confirmed: "bg-blue-500",
  preparing: "bg-orange-500",
  ready: "bg-green-500",
  served: "bg-purple-500",
  completed: "bg-gray-500",
  occupied: "bg-blue-500",
};

const prettifyStatus = (status) =>
  status
    ? status
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")
    : "Pending";

const Header = ({ onClose, table, order, selectedWaiterId, onWaiterChange }) => {
  const [waiters, setWaiters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadWaiters = async () => {
      try {
        setLoading(true);
        const response = await getActiveWaiters();
        if (response?.success && response?.data) {
          setWaiters(Array.isArray(response.data) ? response.data : []);
        }
      } catch (err) {
        console.error("Error loading waiters:", err);
      } finally {
        setLoading(false);
      }
    };
    loadWaiters();
  }, []);

  const tableLabel = table
    ? `Change Order — Table ${String(table.tableNumber).padStart(
        2,
        "0"
      )} (${table.seats} seats)`
    : "Change Order";

  const orderStatus = order?.status || table?.status || "pending";
  const statusColor = statusColors[orderStatus] || "bg-yellow-500";
  const waiterName = order?.waiterId?.fullName || order?.waiter?.name || "Unassigned";
  const currentWaiterId = selectedWaiterId || order?.waiterId?._id || order?.waiterId;

  return (
    <header className="p-6 border-b border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{tableLabel}</h1>
          <div className="flex items-center gap-4 mt-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full ${statusColor} opacity-75`}
                ></span>
                <span
                  className={`relative inline-flex rounded-full h-3 w-3 ${statusColor}`}
                ></span>
              </span>
              <span className="font-semibold text-gray-700">
                {prettifyStatus(orderStatus)}
              </span>
            </div>
            <span className="text-gray-500">Waiter: {waiterName}</span>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={28} />
        </button>
      </div>
      <div className="mt-4">
        <label htmlFor="staff" className="text-sm font-medium text-gray-700">
          Assign Staff:
        </label>
        <div className="relative mt-1">
          <select
            id="staff"
            value={currentWaiterId || ""}
            onChange={(e) => onWaiterChange && onWaiterChange(e.target.value)}
            className="appearance-none w-full max-w-xs bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            disabled={loading}
          >
            <option value="">Select Staff Member</option>
            {waiters.map((waiter) => (
              <option key={waiter._id || waiter.id} value={waiter._id || waiter.id}>
                {waiter.fullName || waiter.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  onClose: PropTypes.func.isRequired,
  table: PropTypes.object,
  order: PropTypes.object,
  selectedWaiterId: PropTypes.string,
  onWaiterChange: PropTypes.func,
};

Header.defaultProps = {
  table: null,
  order: null,
};

export default Header;
