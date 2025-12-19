import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ChevronDown, X } from "lucide-react";
import { getActiveWaiters } from "../../utils/staff";

const Header = ({ onClose, selectedWaiterId, onWaiterChange, tableNumber }) => {
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

  return (
    <header className="p-6 border-b border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Take Order {tableNumber ? `— Table ${tableNumber}` : ""}
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-green-600 font-semibold">Available</span>
            </div>
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
            value={selectedWaiterId || ""}
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
};

export default Header;
